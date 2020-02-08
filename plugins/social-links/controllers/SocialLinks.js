'use strict';

/**
 * SocialLinks.js controller
 *
 * @description: A set of functions called "actions" of the `social-links` plugin.
 */


const updateSocial = async (id, url, ctx) => {
  try {
    await strapi
      .query("social")
      .update(
        { id: id },
        {
          url: url
        });
    ctx.send({
      message: `Social ${id} updated`
    });
  } catch (error) {
    console.log(error);
  }
};

const createSocial = async (label, url, ctx) => {
  try {
    await strapi
      .query("social")
      .create(
        {
          label: label,
          url: url
        });
    ctx.send({
      message: `Social ${label} created`
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
  submitSocial: async ctx => {
    const socials = ctx.request.body;

    socials.forEach(social => {
      if (!social.id)
        createSocial(social.label, social.url, ctx);
      else
        updateSocial(social.id, social.url, ctx);
    });
    ctx.send({
      message: 'Social share link updated'
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
