/**
 * 环境变量检查脚本
 * 用于验证必需的环境变量是否已正确配置
 */

require('dotenv').config();

const requiredEnvVars = [
  'DEEPSEEK_API_KEY'
];

let allPresent = true;

console.log('='.repeat(60));
console.log('环境变量检查');
console.log('='.repeat(60));

requiredEnvVars.forEach(varName => {
  const value = process.env[varName];
  const isPresent = !!value;
  const status = isPresent ? '✓' : '✗';
  const displayValue = isPresent 
    ? (value.length > 10 ? `${value.substring(0, 10)}...` : value) 
    : '未设置';
  
  console.log(`${status} ${varName}: ${displayValue}`);
  
  if (!isPresent) {
    allPresent = false;
  }
});

console.log('='.repeat(60));

if (allPresent) {
  console.log('✓ 所有必需的环境变量都已配置！');
  console.log('\n提示：聊天功能已准备就绪。');
  console.log('访问 http://localhost:3020 并点击右下角的聊天按钮开始使用。');
  process.exit(0);
} else {
  console.log('✗ 缺少必需的环境变量！');
  console.log('\n请在项目根目录的 .env 文件中添加：');
  console.log('DEEPSEEK_API_KEY=your_api_key_here');
  process.exit(1);
}

