'use strict';

/**
 * ManagePhases.js controller
 *
 * @description: A set of functions called "actions" of the `manage-phases` plugin.
 */

const updatePhase = async (id, label, ctx) => {
  try {
    const res = await strapi
      .query("phase")
      .update(
        { id },
        {
          label
        });
    ctx.send(res);
  } catch (error) {
    console.error(error);
    ctx.send(error);
  }
};

const createPhase = async (value, label, ctx) => {
  try {
    const res = await strapi
      .query("phase")
      .create(
        {
          value,
          label
        });
    ctx.send(res);
  } catch (error) {
    console.error(error);
    ctx.send(error);
  }
};

module.exports = {

  /**
   * Default action.
   *
   * @return {Object}
   */
  submitPhases: async ctx => {
    const phases = ctx.request.body;
    phases.forEach(({ id, label, value }) => {
      if (!id)
        createPhase(value, label, ctx);
      else
        updatePhase(id, label, ctx);
    });
    ctx.send({
      message: 'ok'
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
