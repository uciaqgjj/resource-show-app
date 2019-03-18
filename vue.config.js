module.exports = {
  devServer: {
    proxy: {
      '/rest': {
        target: 'http://172.18.89.11:9009',
        changeOrigin: true
      }
    }
  }
}
