const assert = require('assert')

describe('webpack.base.js test case', () => {
  const baseConfig = require('../../lib/webpack.base')
  
  it('entry',() => {
    assert.equal(baseConfig.entry.search, '/Users/john/Documents/execises/webpack_test/test/smoke/template/src/search/index.js')

    assert.equal(baseConfig.entry.vedio, '/Users/john/Documents/execises/webpack_test/test/smoke/template/src/vedio/index.js')
  })
}) 