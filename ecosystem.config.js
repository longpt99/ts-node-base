module.exports = {
  apps: [
    {
      name: 'ts-node-base',
      script: './dist/index.js',
      ignore_watch: ['node_modules'],
      autorestart: true, //Default, Auto reset when app crashes
      env: { NODE_ENV: 'local' },
      env_production: { NODE_ENV: 'production' },
      env_staging: { NODE_ENV: 'staging' },
    },
  ],

  // deploy: {
  //   production: {
  //     user: 'SSH_USERNAME',
  //     host: 'SSH_HOSTMACHINE',
  //     ref: 'origin/master',
  //     repo: 'GIT_REPOSITORY',
  //     path: 'DESTINATION_PATH',
  //     'post-deploy':
  //       'yarn install && pm2 startOrRestart ecosystem.config.js --env production',
  //   },
  //   staging: {
  //     user: 'SSH_USERNAME',
  //     host: 'SSH_HOSTMACHINE',
  //     ref: 'origin/master',
  //     repo: 'GIT_REPOSITORY',
  //     path: 'DESTINATION_PATH',
  //     'post-deploy':
  //       'yarn install && pm2 startOrRestart ecosystem.config.js --env staging',
  //   },
  // },
};
