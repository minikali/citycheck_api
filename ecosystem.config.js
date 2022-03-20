module.exports = {
  apps: [
    {
      name: 'citycheck_api',
      script: 'yarn',
      args: 'start',
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
}
