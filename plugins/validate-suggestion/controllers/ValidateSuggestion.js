'use strict';

/**
 * ValidateSuggestion.js controller
 *
 * @description: A set of functions called "actions" of the `validate-suggestion` plugin.
 */

module.exports = {

  /**
   * Default action.
   *
   * @return {Object}
   */
  validateSuggestion: async ctx => {
    const { suggestion } = ctx.request.body;
    const { id, phase, justify_fr, justify_en, french_project, english_project, user, name } = suggestion;
    console.log(suggestion);
    try {
    // Creating new project history entry from current project
    // So it can be displayed in the history of the project
    const projHist = await strapi
        .query("project-history")
        .create({
          phase: french_project.phase,
          justify_fr: french_project.justify,
          justify_en: english_project.justify,
          french_project: french_project.id,
          english_project: english_project.id,
          user: french_project.justify_author,
          name
        });
      console.log("projHist", projHist)
      // Updating justify and phase of the current project
      const updatedEn = await strapi
        .query("english-project")
        .update(
          { id: english_project.id },
          {
            phase,
            justify: justify_en,
            justify_author: user.id
          });
      const updatedFr = await strapi
        .query("french-project")
        .update(
          { id: french_project.id },
          {
            phase,
            justify: justify_fr,
            justify_author: user.id
          });
      // Delete the suggestion from the DB
      const delSugg = await strapi.query("project-suggestion").delete({ id });
      console.log("delSugg", delSugg);
      // Delete confirmation of this project
      updatedEn.project_confirmations.forEach(async el => {
        const enConf = await strapi.query("project-confirmation").delete({ id: el.id });
        console.log("enConf", enConf);
      });
      updatedFr.project_confirmations.forEach(async el => {
        const frConf = await strapi.query("project-confirmation").delete({ id: el.id });
        console.log("frConf", frConf);
      });
      ctx.send(true);
    } catch (e) {
      console.error(e);
      ctx.send(false);
    }
  },
  deleteSuggestion: async ctx => {
    const { id } = ctx.request.body;

    try {
      const response = await strapi
        .query("project-suggestion")
        .delete({ id });
      ctx.send(response);
    } catch (e) {
      console.error(e);
    }
  },
  index: async (ctx) => {
    // Add your own logic here.

    // Send 200 `ok`
    ctx.send({
      message: 'ok'
    });
  }
};
