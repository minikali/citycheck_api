'use strict';

/**
 * ManagePhases.js controller
 *
 * @description: A set of functions called "actions" of the `manage-phases` plugin.
 */

const updatePhase = async (id, label, ctx) => {
  try {
    await strapi
      .query("phase")
      .update(
        { id: id },
        {
          phaseName: label
        });
    ctx.send({
      message: `Phase ${id} updated`
    });
  } catch (error) {
    console.log(error);
  }
};

const createPhase = async (phaseNumber, label, ctx) => {
  try {
    await strapi
      .query("phase")
      .create(
        {
          phaseNumber: phaseNumber,
          phaseName: label
        });
    ctx.send({
      message: `Phase ${id} created`
    });
  } catch (error) {
    console.log(erro);
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

    Object.values(phases).forEach(phase => {
      if (!phase.id)
        createPhase(phase.value, phase.label, ctx);
      else
        updatePhase(phase.id, phase.label, ctx);
    });
    ctx.send({
      message: 'Phases updated'
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
