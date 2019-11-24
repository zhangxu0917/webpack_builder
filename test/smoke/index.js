const path = require('path')
const webpack = require('webpack')
const rimraf = require('rimraf')
const Mocha = require('mocha')

const mocha = new Mocha({
  timeout: 10000
})

// 通过process.chdir方法，将当前脚本的执行环境切换到测试目录
process.chdir(path.join(__dirname, 'template')) 

// 调用rimraf删除 ./dist目录，删除成功，主动调用webpack，进行打包编译；
rimraf('./dist', () => {
  const prodConfig = require('../../lib/webpack.prod')
  webpack(prodConfig, (err, stats) => {
    if (err) {
      console.log(err)
      process.exit(2)
    }
    console.log(stats.toString({
      colors: true,
      modules: false,
      children: false
    }))

    console.log('webpack build success, begin run test')
    mocha.addFile(path.join(__dirname, './html-test.js'))
    mocha.addFile(path.join(__dirname, './css-js-test.js'))

    mocha.run()
  })
})