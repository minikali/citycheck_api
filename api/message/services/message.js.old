'use strict';
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/services.html#core-services)
 * to customize this service
 */

module.exports = {
  async addAndUpload(ctx) {
    // Get form data
    // let values = ctx.request.body;

    // // Silent recursive parser.
    // const parser = value => {
    //   try {
    //     value = JSON.parse(value);
    //   } catch (e) {
    //     // Silent.
    //   }

    //   return Array.isArray(value) ? value.map(obj => parser(obj)) : value;
    // };

    // // Get files
    // const files = values.files;

    // // Get entry data
    // values = Object.keys(values.data).reduce((acc, current) => {
    //   acc[current] = parser(values.data[current]);

    //   return acc;
    // }, {});

    // console.log("data", values.data);
    // console.log("files", files);
    // console.log("files", files[0].name);

    // // Create the entry without files
    // const entity = await strapi.services.message.create(values);
    // console.log("entity", entity);

    let entity;
    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.comment.create(data, { files });
    } else {
      entity = await strapi.services.comment.create(ctx.request.body);
    }
    return sanitizeEntity(entity, { model: strapi.models.comment });

    // // Then, request plugin upload.
    // if (Object.keys(files).length > 0) {
    //   // Upload new files and attach them to this entity.
    //   // Here `job` have to be the model name
    //   await strapi.plugins.upload.services.upload.uploadToEntity(
    //     {
    //       id: entity.id || entity._id,
    //       model: 'message',
    //     },
    //     files
    //   );
    // }

    // return strapi.api.message.services.message.findOne({
    //   id: entity.id || entity._id,
    // });
  }
};
