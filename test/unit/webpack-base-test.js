const assert = require('assert')

describe('webpack.base.js test case', () => {
  const baseConfig = require('../../lib/webpack.base')
  
  it('entry',() => {
    assert.equal(baseConfig.entry.search.indexOf('/test/smoke/template/src/search/index.js') > -1, true)

    assert.equal(baseConfig.entry.vedio.indexOf('/test/smoke/template/src/vedio/index.js') > -1, true)
  })
}) 