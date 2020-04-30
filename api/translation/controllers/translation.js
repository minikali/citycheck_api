'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async getTranslation(ctx) {
    const { lng } = ctx.params;
    let entities;

    if (ctx.query._q) {
      entities = await strapi.services.translation.search(ctx.query);
    } else {
      entities = await strapi.services.translation.find(ctx.query);
    }
    const translations = {};
    entities.forEach(entity => {
      translations[entity.key] = entity[lng];
    });
    return translations;
  }
};
