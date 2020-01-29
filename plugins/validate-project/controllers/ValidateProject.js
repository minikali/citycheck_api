'use strict';

/**
 * ValidateProject.js controller
 *
 * @description: A set of functions called "actions" of the `validate-project` plugin.
 */

module.exports = {
  validateProject: async ctx => {
    const { id, title, address, phase, description } = ctx.request.body;
    const response = await strapi
      .query("project")
      .update(
        { id: id },
        {
          title: title,
          address: address,
          phase: phase,
          description: description,
          valid: true
        });
    ctx.send(response);
  },
  index: async (ctx) => {
    // Add your own logic here.

    // Send 200 `ok`
    ctx.send({
      message: 'ok'
    });
  }
};
