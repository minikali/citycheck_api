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
    const { id, phase, justify_fr, justify_en, french_project, english_project, userinfo, name } = suggestion;

    try {
      // Confirm suggestion in DB
      const newSugg = await strapi
        .query("project-suggestion")
        .update(
          { id },
          {
            phase,
            justify_fr,
            justify_en,
            french_project: !french_project ? english_project.french_project : french_project.id,
            english_project: !english_project ? french_project.english_project : english_project.id,
            valid: true
          });
      console.log(newSugg);
      ctx.send(newSugg);
      const { project } = newSugg;
      // Push current projects justify and phase in project-histories
      const newHist = await strapi
        .query("project-history")
        .create({
          phase: french_project.phase,
          justify_fr: newSugg.justify_fr,
          justify_en: newSugg.justify_en,
          french_project: newSugg.french_project.id,
          english_project: newSugg.english_project.id,
          userinfo: french_project.userinfo,
          name
        });
      console.log("newHist", newHist);
      // Update current project justify and phase
      const updatedEn = await strapi
        .query("english-project")
        .update(
          { id: newSugg.english_project.id },
          {
            phase,
            justify: justify_en,
          });
      const updatedFr = await strapi
        .query("french-project")
        .update(
          { id: newSugg.french_project.id },
          {
            phase,
            justify: justify_fr,
          });
      console.log("updatedEn", updatedEn)
      console.log("updatedFr", updatedFr)
      // TODO delete all confirmations
      
      updatedEn.project_confirmations.forEach(async el => {
        const deletedConfirm = await strapi.query("project-confirmation").delete({ id: el.id });
        console.log("deletedConfirm", deletedConfirm);
      });
      updatedFr.project_confirmations.forEach(async el => {
        const deletedConfirm = await strapi.query("project-confirmation").delete({ id: el.id });
        console.log("deletedConfirm", deletedConfirm);
      });
    } catch (e) {
      console.error(e);
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
