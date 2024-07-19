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
const { Tenko, GOAL_MODULE } = require ('tenko')
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
  esprima.parseModule(content, { loc })
}

function byAcorn() {
  acorn.parse(content, {
    ecmaVersion: 2020,
    sourceType: 'module',
    locations: loc
  })
}

function byBabel() {
  babel.parse(content, { sourceType: 'module', ranges: loc })
}

function byHermes() {
  hermes.parse(content, { sourceType: 'module' })
}

function byMeriyah() {
  meriyah.parseModule(content, { loc })
}

function byKataw() {
  kataw.parseModule(content)
}

function bySeafox() {
  seafox.parseModule(content, { loc })
}

function byCherow() {
  cherow.parseModule(content, { loc })
}

function byEscaya() {
  escaya.parseModule(content, { loc })
}

function byTenko() {
  Tenko(content, { goalMode: GOAL_MODULE, locationTracking: loc })
}

function byTreeSitter() {
  const treeSitter = new TreeSitter()
  treeSitter.setLanguage(jsLanguage)
  treeSitter.parse(content)
}

async function compare() {
  content = await readFile(`${__dirname}/../node_modules/marionette/modules/collection-view.js`, 'utf8')
  let suite = createSuite(`Parsing collection-view.js as a module ${loc ? 'with locations ': ''}by...`)
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
