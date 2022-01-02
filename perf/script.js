const { readFile } = require('fs/promises')
const { createSuite } = require('./suite')
const esprima = require('esprima')
const acorn = require('acorn')
const babel = require('@babel/parser')
const meriyah = require('meriyah')
const seafox = require('seafox')
const kataw = require('kataw')
const escaya = require('@azariasb/escaya')
const { Tenko } = require ('tenko')

let content

function byEsprima() {
  esprima.parseScript(content)
}

function byAcorn() {
  acorn.parse(content, { ecmaVersion: 2020 })
}

function byBabel() {
  babel.parse(content)
}

function byMeriyah() {
  meriyah.parseScript(content)
}

function byKataw() {
  kataw.parseScript(content)
}

function bySeafox() {
  seafox.parseScript(content)
}

function byEscaya() {
  escaya.parseScript(content)
}

function byTenko() {
  Tenko(content)
}

async function compare() {
  content = await readFile(`${__dirname}/../node_modules/jquery/dist/jquery.js`, 'utf8')
  createSuite('Parsing jquery.js as a script by...')
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
