'use strict';

/**
 * ValidateProject.js controller
 *
 * @description: A set of functions called "actions" of the `validate-project` plugin.
 */

module.exports = {
  validateProject: async ctx => {
    const { id, title, address, phase, description, lat, lng, lang, t } = ctx.request.body;
    console.log(lang);
    const query = lang === "fr" ? "french-project" : "english-project";
    // Create first the translated entry to retrieve its id
    const newEntry = await strapi
      .query(`${lang === "fr" ? "english-project" : "french-project"}`)
      .create({
        ...t,
        lat,
        lng,
        valid: true
      });
    // Update the current project with its new translated entry id
    let entry = {
      title: title,
      address: address,
      phase: phase,
      description: description,
      lat: lat,
      lng: lng,
      valid: true,
    }
    if (lang === "fr")
      entry = { ...entry, english_project: newEntry.id }
    else
      entry = { ...entry, french_project: newEntry.id }
    const updatedEntry = await strapi
      .query(query)
      .update(
        { id: id },
        entry
      );
    ctx.send(updatedEntry);
  },
  deleteProject: async ctx => {
    const { id, lang } = ctx.request.body;
    const query = lang === "fr" ? "french-project" : "english-project";
    // Deletes the first entry and retrieve its translated project ID
    const firstEntry = await strapi
      .query(query)
      .delete({ id: id });
    console.log(firstEntry);
    // Deletes the second entry depending on the language of the first entry, if any
    let secondEntry = null;
    if (lang === "fr" && firstEntry.english_project) {
      secondEntry = await strapi
        .query(query)
        .delete({ id: firstEntry.english_project.id });
    }
    else if (lang === "en" && firstEntry.french_project) {
      secondEntry = await strapi
        .query(query)
        .delete({ id: firstEntry.french_project.id });
    }
    console.log(secondEntry);
    ctx.send(firstEntry);
  },
  index: async (ctx) => {
    // Add your own logic here.

    // Send 200 `ok`
    ctx.send({
      message: 'ok'
    });
  }
};
