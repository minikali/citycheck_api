'use strict';

/**
 * ValidateProject.js controller
 *
 * @description: A set of functions called "actions" of the `validate-project` plugin.
 */

module.exports = {
  validateProject: async ctx => {
    const { id, title, address, phase, description, lat, lng } = ctx.request.body;
    const response = await strapi
      .query("project")
      .update(
        { id: id },
        {
          title: title,
          address: address,
          phase: phase,
          description: description,
          lat: lat,
          lng: lng,
          valid: true
        });
    ctx.send(response);
  },
  deleteProject: async ctx => {
    const { id } = ctx.request.body;
    const response = await strapi
      .query("project")
      .delete({ id: id });
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
