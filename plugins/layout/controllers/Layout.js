'use strict';
/**
 * Layout.js controller
 *
 * @description: A set of functions called "actions" of the `layout` plugin.
 */

module.exports = {
  updateLayout: async (ctx) => {
    const body = ctx.request.body;
    body.map(async ({ component, label, value, media }) => {
      const current = await strapi
        .query("layout")
        .find(
          {
            component: component,
            label: label
          }
        );
      if (current.length === 0) {
        await strapi
          .query("layout")
          .create(
            {
              component: component,
              label: label,
              value: value,
              media: media
            }
          );
      } else {
        await strapi
          .query("layout")
          .update({ id: current[0].id },
            {
              component: component,
              label: label,
              value: value,
              media: media
            }
          );
      }
    });
    ctx.send({
      message: `component ${body[0].component} updated`
    });
  },
  index: async (ctx) => {
    // Add your own logic here.

    // Send 200 `ok`
    ctx.send({
      message: 'ok'
    });
  }
};
