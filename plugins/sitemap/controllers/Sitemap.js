'use strict';

/**
 * Sitemap.js controller
 *
 * @description: A set of functions called "actions" of the `sitemap` plugin.
 */

module.exports = {

  /**
   * Default action.
   *
   * @return {Object}
   */
  deletePlace: async ctx => {
    const { id } = ctx.request.body;

    try {
      await strapi
        .query("sitemap")
        .delete({ id });
      ctx.send({
        message: `Place ${id} deleted`
      });
    } catch (error) {
      console.log(error);
    }
  },
  submitPlace: async ctx => {
    const { place } = ctx.request.body;
    const { title, path, address } = place;
    try {
      await strapi
        .query("sitemap")
        .create(
          {
            title,
            path: path.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(" ", "-"),
            address
          });
      ctx.send({
        message: `Place ${title} saved`
      });
    } catch (error) {
      console.log(error);
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
