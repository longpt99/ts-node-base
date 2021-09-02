module.exports = {
  apps: [
    {
      name: 'ts-node-base',
      script: './src/index.ts',
      watch: '.',
      ignore_watch: ['node_modules'],
      autorestart: true, //Default, Auto reset when app crashes
      env: {
        COMMON_ENV_VAR: 'true',
      },
      env_production: {
        NODE_ENV: 'production',
      },
      env_development: {
        NODE_ENV: 'development',
      },
      env_staging: {
        NODE_ENV: 'staging',
      },
    },
    {
      script: './service-worker/',
      watch: ['./service-worker'],
    },
  ],

  deploy: {
    production: {
      user: 'SSH_USERNAME',
      host: 'SSH_HOSTMACHINE',
      ref: 'origin/master',
      repo: 'GIT_REPOSITORY',
      path: 'DESTINATION_PATH',
      'post-deploy':
        'yarn install && pm2 startOrRestart ecosystem.config.js --env production',
    },
    development: {
      user: 'SSH_USERNAME',
      host: 'SSH_HOSTMACHINE',
      ref: 'origin/master',
      repo: 'GIT_REPOSITORY',
      path: 'DESTINATION_PATH',
      'post-deploy':
        'yarn install && pm2 startOrRestart ecosystem.config.js --env development',
    },
    staging: {
      user: 'SSH_USERNAME',
      host: 'SSH_HOSTMACHINE',
      ref: 'origin/master',
      repo: 'GIT_REPOSITORY',
      path: 'DESTINATION_PATH',
      'post-deploy':
        'yarn install && pm2 startOrRestart ecosystem.config.js --env staging',
    },
  },
};
