const { readFile } = require('fs/promises')
const { createSuite } = require('./suite')
const esprima = require('esprima')
const acorn = require('acorn')
const babel = require('@babel/parser')
const meriyah = require('meriyah')
const seafox = require('seafox')
const cherow = require('cherow')
const kataw = require('kataw')
const escaya = require('@azariasb/escaya')
const { Tenko, GOAL_MODULE } = require ('tenko')

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

async function compare() {
  content = await readFile(`${__dirname}/../node_modules/marionette/modules/collection-view.js`, 'utf8')
  createSuite(`Parsing collection-view.js as a module ${loc ? 'with locations ': ''}by...`)
    .add('esprima', byEsprima)
    .add('acorn', byAcorn)
    .add('babel', byBabel)
    .add('meriyah', byMeriyah)
    .add('kataw', byKataw)
    .add('seafox', bySeafox)
    .add('cherow', byCherow)
    .add('escaya', byEscaya)
    .add('tenko', byTenko)
    .start()
}

compare().catch(error => {
  console.error(error)
  process.exitCode = 1
})
