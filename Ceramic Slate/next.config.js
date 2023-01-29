/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
}

const removeImports = require('next-remove-imports')();
module.exports = removeImports({...nextConfig});
