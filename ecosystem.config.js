module.exports = {
  apps: [
    {
      name: 'ts-node-base',
      script: './dist/index.js',
      ignore_watch: ['node_modules'],
      autorestart: true, //Default, Auto reset when app crashes
      env_production: { NODE_ENV: 'local' },
    },
  ],
};
