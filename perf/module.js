const { readFile } = require('fs/promises')
const { createSuite } = require('./suite')
const esprima = require('esprima')
const acorn = require('acorn')
const babel = require('@babel/parser')
const meriyah = require('meriyah')
const seafox = require('seafox')
const kataw = require('kataw')
const escaya = require('@azariasb/escaya')
const { Tenko, GOAL_MODULE } = require ('tenko')

let content

function byEsprima() {
  esprima.parseModule(content)
}

function byAcorn() {
  acorn.parse(content, { ecmaVersion: 2020, sourceType: 'module' })
}

function byBabel() {
  babel.parse(content, { sourceType: 'module' })
}

function byMeriyah() {
  meriyah.parseModule(content)
}

function byKataw() {
  kataw.parseModule(content)
}

function bySeafox() {
  seafox.parseModule(content)
}

function byEscaya() {
  escaya.parseModule(content)
}

function byTenko() {
  Tenko(content, { goalMode: GOAL_MODULE })
}

async function compare() {
  content = await readFile(`${__dirname}/../node_modules/marionette/modules/collection-view.js`, 'utf8')
  createSuite('Parsing collection-view.js as a module by...')
    .add('esprima', byEsprima)
    .add('acorn', byAcorn)
    .add('babel', byBabel)
    .add('meriyah', byMeriyah)
    .add('kataw', byKataw)
    .add('seafox', bySeafox)
    .add('escaya', byEscaya)
    .add('tenko', byTenko)
    .start()
}

compare().catch(error => {
  console.error(error)
  process.exitCode = 1
})
