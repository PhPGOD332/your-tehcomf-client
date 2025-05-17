module.exports = {
  apps: [
    {
      name: 'your-tehcomf-client',
      script: 'node_modules/next/dist/bin/next',
      exec_mode: 'cluster',
      instances: 'max'
    }
  ]
}