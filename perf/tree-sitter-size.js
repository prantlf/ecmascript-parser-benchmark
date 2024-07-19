const { stat } = require('node:fs/promises')

const { platform, arch } = process

function formatSize(bytes) {
  const order = Math.floor(Math.log(bytes) / Math.log(1024))
  const number = (bytes / Math.pow(1024, order)).toFixed(2)
  const unit = ['B', 'KB', 'MB', 'GB', 'TB'][order]
  return `${number} ${unit}`;
};

async function printSize(name) {
  const lib = `${__dirname}/../node_modules/${name}/prebuilds/${platform}-${arch}/${name}.node`
  // console.log(lib)
  const { size } = await stat(lib)
  console.log(`${name}: ${formatSize(size)}`)
}

printSize('tree-sitter')
printSize('tree-sitter-javascript')
