const { estimatePkgSizes } = require('package-cost')

function formatSize(size) {
  const kb = size / 1024
  return `${kb.toFixed(2)} KB`
}

;(async () => {
  const pkgs = await estimatePkgSizes(process.argv.slice(2));
  console.log('package                         bundled    minified    gzipped    brotlied')
  for (const pkg of pkgs) {
    const name = `${pkg.name}@${pkg.version}`
    const size = formatSize(pkg.bundleSize)
    const miniSize = formatSize(pkg.miniSize)
    const gzipSize = formatSize(pkg.gzipSize)
    const brotliSize = formatSize(pkg.brotliSize)
    console.log(`${name.padEnd(30)} ${size.padStart(10)} ${miniSize.padStart(10)} ${gzipSize.padStart(10)} ${brotliSize.padStart(10)}`)
  }
})()
