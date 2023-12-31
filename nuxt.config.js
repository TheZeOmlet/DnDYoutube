export default {
  server: {
    host: '0',
    port: '3000' // optional
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'webshopPage',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
      '@/assets/css/main.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
      '@nuxtjs/fontawesome',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],

  axios: {
    baseURL: 'https://sds.dev.covariance.co/',
    proxy: true
  },

  proxy: {
    "/youtube/": {
      target: "https://www.googleapis.com/youtube/v3/",
      pathRewrite: { "^/youtube/": "" }
    }
  },

  publicRuntimeConfig: {
    key: process.env.VUE_APP_KEY,
    channel: process.env.VUE_APP_CHANNEL
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [
      'axios'
    ],
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
  }
}
