const { readFile } = require('node:fs/promises')
const { createSuite } = require('./suite')
const esprima = require('esprima')
const acorn = require('acorn')
const babel = require('@babel/parser')
const hermes = require('hermes-parser')
const meriyah = require('meriyah')
const seafox = require('seafox')
const cherow = require('cherow')
const kataw = require('kataw')
const escaya = require('@azariasb/escaya')
const { Tenko } = require ('tenko')
const isBun = typeof Bun !== 'undefined'
let TreeSitter
let jsLanguage
if (!isBun) {
  TreeSitter = require('tree-sitter')
  jsLanguage = require('tree-sitter-javascript')
}

const loc = process.argv[2] === '--locations'
let content

function byEsprima() {
  esprima.parseScript(content, { loc })
}

function byAcorn() {
  acorn.parse(content, { ecmaVersion: 2020, locations: loc })
}

function byBabel() {
  babel.parse(content, { ranges: loc })
}

function byHermes() {
  hermes.parse(content, { sourceType: 'script' })
}

function byMeriyah() {
  meriyah.parseScript(content, { loc })
}

function byKataw() {
  kataw.parseScript(content)
}

function bySeafox() {
  seafox.parseScript(content, { loc })
}

function byCherow() {
  cherow.parseScript(content, { loc })
}

function byEscaya() {
  escaya.parseScript(content, { loc })
}

function byTenko() {
  Tenko(content, { locationTracking: loc })
}

function byTreeSitter() {
  const treeSitter = new TreeSitter()
  treeSitter.setLanguage(jsLanguage)
  treeSitter.parse(content)
}

async function compare() {
  content = await readFile(`${__dirname}/../node_modules/jquery/dist/jquery.js`, 'utf8')
  let suite = createSuite(`Parsing jquery.js as a script ${loc ? 'with locations ': ''}by...`)
    .add('esprima', byEsprima)
    .add('acorn', byAcorn)
    .add('babel', byBabel)
    .add('hermes', byHermes)
    .add('meriyah', byMeriyah)
    .add('kataw', byKataw)
    .add('seafox', bySeafox)
    .add('cherow', byCherow)
    .add('escaya', byEscaya)
    .add('tenko', byTenko)
  if (!isBun) {
    suite = suite.add('tree-sitter', byTreeSitter)
  }
  suite.start()
}

compare().catch(error => {
  console.error(error)
  process.exitCode = 1
})
