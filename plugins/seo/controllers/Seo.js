'use strict';

/**
 * Seo.js controller
 *
 * @description: A set of functions called "actions" of the `seo` plugin.
 */

const updateSeo = async (ctx, element) => {
  try {
    await strapi
      .query("seo")
      .update(
        { id: element.id },
        {
          title: element.title,
          description: element.description
        });
    ctx.send({
      message: `Seo title: ${element.title} saved`
    });
  } catch (error) {
    console.error(error);
  }
};

const createSeo = async (ctx, element) => {
  try {
    await strapi
      .query("seo")
      .create(
        {
          title: element.title,
          description: element.description,
          label: element.label
        });
    ctx.send({
      message: `Seo title: ${element.title} saved`
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {

  /**
   * Default action.
   *
   * @return {Object}
   */
  saveSeo: async ctx => {
    const { seo } = ctx.request.body;
    
    seo.forEach(element => {
      if (!element.id)
        createSeo(ctx, element);
      else
        updateSeo(ctx, element);
    });
    ctx.send({
      message: 'Seo settings updated'
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
