const { readFile } = require('node:fs/promises')
const { createSuite } = require('./suite')
const esprima = require('esprima')
const escodegen = require('escodegen')
const astring = require('astring')
const babel = require('@babel/parser')
const { default: babelGenerate } = require('@babel/generator')
// const kataw = require('kataw')
const { SourceMapGenerator } = require('source-map')

const sourceMap = process.argv[2] === '--source-map'
let content
let ast
let astBabel

function byEscodegen() {
  escodegen.generate(ast, sourceMap ? {
    sourceMap: 'jquery.js',
    sourceMapWithCode: true,
    sourceContent: content
  } : {})
}

function byAstring() {
  astring.generate(ast, sourceMap ? {
    sourceMap: new SourceMapGenerator({ file: 'jquery.js' })
  }: {})
}

function byBabel() {
  babelGenerate(astBabel, sourceMap ? { sourceMaps: true, sourceFileName: 'jquery.js' } : {}, content)
}

// function byKataw() {
//   const lines = []
//   if (sourceMap) {
//     const map = new SourceMapGenerator({ file: 'jquery.js' })
//     let line = 0
//     kataw.print(ast, (source, kind, msg, line, column) => {
//       lines.push(source)
//       sourceMapGenerator.addMapping({
//         generated: { line: ++line, column: 0 },
//         original: { line: line, column: column },
//         source: 'jquery.js',
//       })
//     })
//   } else {
//     kataw.print(ast, (source, kind, msg, line, column) => lines.push(source))
//   }
//   lines.join('\n')
// }

async function compare() {
  content = await readFile(`${__dirname}/../node_modules/jquery/dist/jquery.js`, 'utf8')
  ast = esprima.parseScript(content, { loc: sourceMap })
  astBabel = babel.parse(content, { ranges: sourceMap })
  createSuite(`Generating code ${sourceMap ? 'with source maps ': ''}for an AST from jquery.js by...`)
    .add('escodegen', byEscodegen)
    .add('astring', byAstring)
    .add('babel', byBabel)
    // .add('kataw', byKataw)
    .start()
}

compare().catch(error => {
  console.error(error)
  process.exitCode = 1
})
