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
    const { projectId, suggestion, suggestionList } = ctx.request.body;
    try {
      let response = await strapi
        .query("project")
        .update(
          { id: projectId },
          {
            userSuggest: [
              ...suggestionList,
              {
                id: suggestion.id,
                valid: true
              }
            ]
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
  index: async (ctx) => {
    // Add your own logic here.

    // Send 200 `ok`
    ctx.send({
      message: 'ok'
    });
  },
  deleteSuggestion: async ctx => {
    const { project, suggestionId } = ctx.request.body;
    const userSuggestList = project.userSuggest.filter(suggestion => suggestion.id !== suggestionId);
    try {
      const response = await strapi
      .query("project")
      .update({
        id: project.id
      }, {
        userSuggest: [
          ...userSuggestList
        ]
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
