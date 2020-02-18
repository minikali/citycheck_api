const { parseMultipartData, sanitizeEntity } = require("strapi-utils");

module.exports = {
  async create(ctx) {
    const body = ctx.request.body;
    const entry = await strapi.services.message.create(ctx.request.body);

    // send email now if does not have file to upload
    if (!body.has_file) {
      await strapi.plugins['email'].services.email.send({
        to: 'contact@citycheck.fr',
        from: body.email,
        subject: `Message de ${body.name} depuis citycheck.fr`,
        text: `${body.message}`
      });
    }

    return entry;
  },
};