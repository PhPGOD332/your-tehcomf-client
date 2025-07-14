module.exports = {
  apps: [
    {
      name: 'your-tehcomf-client',
      script: 'node_modules/next/dist/bin/next',
      args: '-p 3000',
      exec_mode: 'fork',
      instances: '1'
    }
  ]
}