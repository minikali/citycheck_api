
module.exports = {
  apps : [{
    name: "citycheck_api",
    script: "npm",
    args: "run start",
    env: {
      NODE_ENV: "production"
    },
    env_production: {
      NODE_ENV: "production"
    }
  }],
};
