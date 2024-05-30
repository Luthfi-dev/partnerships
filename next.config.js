module.exports = {
  reactStrictMode: true,
  assetPrefix:'/v2/',
  basePath:'/v2',
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  publicRuntimeConfig: {
    BASE_URL : process.env.BASE_URL,
    HOST_API : process.env.HOST_API,
    BASE_PATH : process.env.BASE_PATH,
    SECRET_KEY_ENCRYPTION : process.env.SECRET_KEY_ENCRYPTION,
    BASE_URL_OLD : process.env.BASE_URL_OLD,
    ASSETS_HOST : process.env.ASSETS_HOST,
    TOKEN_ASSETS_HOST : process.env.TOKEN_ASSETS_HOST,
    DPA_ENDPOINT_URL : process.env.DPA_ENDPOINT_URL,
    DPA_X_API_TOKEN : process.env.DPA_X_API_TOKEN,
    DPA_USER_ID : process.env.DPA_USER_ID,
    CLIENT_ID : process.env.CLIENT_ID,
    TENANT_ID : process.env.TENANT_ID,
    DIRECT_URI : process.env.DIRECT_URI,
    HOST_COOKIES: process.env.HOST_COOKIES
  },
}