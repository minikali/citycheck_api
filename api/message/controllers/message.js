const { parseMultipartData, sanitizeEntity } = require("strapi-utils");

module.exports = {
  async create(ctx) {
    let entity;
    // if (ctx.is('multipart')) {
    //   const { data, files } = parseMultipartData(ctx);
    //   entity = await strapi.services.message.create(data, { files });
    //   console.log("multipart entity", entity, data, files);
    //   // console.log("filename", files[0].name);
    // } else {
    //   entity = await strapi.services.message.create(ctx.request.body);
    //   console.log("entity", entity);
    // }
    const { data } = parseMultipartData(ctx);
    const { files } = ctx.request.body;
    console.log("type", JSON.stringify(files));
    entity = await strapi.services.message.create(data);
    console.log("multipart entity", entity, data, files);
    // console.log("filename", files[0].name);
    // Then, request plugin upload.
    if (Object.values(files).length > 0) {
      // Upload new files and attach them to this entity.
      // Here `job` have to be the model name
      console.log("files", files);
      console.log("Hello files to upload");
      const res = await strapi.plugins.upload.services.upload.uploadToEntity(
        {
          id: entity.id,
          model: 'message',
        },
        files
      );
      console.log("upload res", res);
    }

    // const entity = await strapi.services.message.addAndUpload(ctx);

    console.log("result", entity);

    // entry = sanitizeEntity(entity, { model: strapi.models.message });
    // send an email by using the email plugin
    console.log("Sending mail");
    const res = await strapi.plugins['email'].services.email.send({
      to: 'kalimer_31@hotmail.fr',
      from: 'admin@strapi.io',
      subject: 'Comment posted that contains a bad words',
      text: `
          test
        `,
    });
    console.log("Done.");
    return entry;
  },
};