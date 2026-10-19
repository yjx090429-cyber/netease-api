// 网易云音乐 API 服务入口
// 启动 @neteasecloudmusicapienhanced/api 并监听 0.0.0.0
const path = require('path');
const fs = require('fs');
const tmpPath = require('os').tmpdir();

async function start() {
  // 生成 anonymous_token
  if (!fs.existsSync(path.resolve(tmpPath, 'anonymous_token'))) {
    fs.writeFileSync(path.resolve(tmpPath, 'anonymous_token'), '', 'utf-8');
  }
  const generateConfig = require('@neteasecloudmusicapienhanced/api/generateConfig');
  await generateConfig();
  
  const port = process.env.PORT || 3000;
  const host = process.env.HOST || '0.0.0.0';
  
  require('@neteasecloudmusicapienhanced/api/server').serveNcmApi({
    checkVersion: true,
    port: port,
    host: host,
  });
  
  console.log(`网易云 API 已启动: http://${host}:${port}`);
}

start().catch(err => {
  console.error('启动失败:', err);
  process.exit(1);
});
