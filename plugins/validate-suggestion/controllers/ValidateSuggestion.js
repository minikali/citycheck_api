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
    const { projectId, suggestion } = ctx.request.body;
    try {
      const project = await strapi.query("project").find({ id: projectId });
      let response = await strapi
        .query("project")
        .update(
          { id: projectId },
          {
            userSuggest: project[0].userSuggest.map(userSuggest => {
              return userSuggest.id === suggestion.id ? {
                ...userSuggest,
                justify: project[0].justify,
                phase: project[0].phase,
                valid: true
              } : userSuggest;
            })
          });
      ctx.send(response);
      response = await strapi
        .query("project")
        .update(
          { id: projectId },
          {
            justify: suggestion.justify,
            phase: suggestion.phase
          });
      ctx.send(response);
    } catch (e) {
      console.error(e);
    }
  },
  deleteSuggestion: async ctx => {
    const { projectId, suggestionId } = ctx.request.body;
    try {
      const project = await strapi.query("project").find({ id: projectId });
      const response = await strapi
        .query("project")
        .update({
          id: projectId
        }, {
          userSuggest: project[0].userSuggest.filter(suggestion => suggestion.id !== suggestionId)
        });
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
