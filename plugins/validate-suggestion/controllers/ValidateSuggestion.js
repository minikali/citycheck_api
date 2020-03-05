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
    const { id, phase, justify, userinfo, name } = suggestion;

    try {
      // Confirm suggestion in DB
      const newSugg = await strapi
        .query("project-suggestion")
        .update(
          { id },
          {
            phase,
            justify,
            valid: true
          });
      ctx.send(newSugg);
      const { project } = newSugg;
      // Push current projects justify and phase in project-histories
      const newHist = await strapi
        .query("project-history")
        .create({
          phase: project.phase,
          justify: project.justify,
          userinfo: project.userinfo,
          project: project.id,
          name
        });
      // Update current project justify and phase
      const updatedProj = await strapi
        .query("project")
        .update(
          { id: project.id },
          {
          phase,
          justify,
        });
        console.log("updatedProj", updatedProj)
        // TODO delete all confirmations
        const { project_confirmations } = updatedProj;
        project_confirmations.forEach(async el => {
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
