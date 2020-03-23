const TITLE = 'Corona Map'
const DESCRIPTION = 'Faça uma autoavaliação e receba orientações de acordo com os seus sintomas #coronavirus #covid19'
const ICON = '/coronamap.png'
const SOCIAL = '/coronamap-social.jpg'

export default {
  mode: 'spa',
  env: process.env || {},
  /*
   ** Headers of the page
   */
  head: {
    title: TITLE,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: DESCRIPTION
      },
      { itemprop: 'image', content: ICON },

      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: TITLE },
      { property: 'og:image', content: SOCIAL },
      { property: 'og:description', content: DESCRIPTION },
      { property: 'og:locale', content: 'pt_BR' },

      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: TITLE },
      { name: 'twitter:description', content: DESCRIPTION },
      { name: 'twitter:image', content: SOCIAL }

    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { href: "https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap", rel: "stylesheet" }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#ADABC9' },
  /*
   ** Global CSS
   */
  css: ['normalize.css/normalize.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },
  server: {
    host: '0.0.0.0'
  }
}
