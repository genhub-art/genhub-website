/** @type {import('next').NextConfig} */

const webpack = require('webpack');

const nextConfig = {
  images: {
    domains: ['gateway.moralisipfs.com'],
  },
  reactStrictMode: true,
  webpack: (config, { dev }) => {
    config.plugins.push(
        new webpack.ProvidePlugin({
            '$': 'jquery',
            'jQuery': 'jquery',
            'window.jQuery': 'jquery'
        })
    )
    return config
  }
}

module.exports = nextConfig
