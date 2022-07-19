var plugins = [{
      name: 'gatsby-plugin-sitemap',
      plugin: require('/home/zpuckeridge/development/blog/node_modules/gatsby-plugin-sitemap/gatsby-ssr.js'),
      options: {"plugins":[],"output":"/sitemap","createLinkInHead":true,"entryLimit":45000,"query":"{ site { siteMetadata { siteUrl } } allSitePage { nodes { path } } }","excludes":[]},
    },{
      name: '@chakra-ui/gatsby-plugin',
      plugin: require('/home/zpuckeridge/development/blog/node_modules/@chakra-ui/gatsby-plugin/gatsby-ssr.js'),
      options: {"plugins":[],"resetCSS":true,"isUsingColorMode":false},
    },{
      name: 'gatsby-plugin-react-helmet',
      plugin: require('/home/zpuckeridge/development/blog/node_modules/gatsby-plugin-react-helmet/gatsby-ssr.js'),
      options: {"plugins":[]},
    },{
      name: 'gatsby-plugin-image',
      plugin: require('/home/zpuckeridge/development/blog/node_modules/gatsby-plugin-image/gatsby-ssr.js'),
      options: {"plugins":[]},
    },{
      name: 'gatsby-remark-autolink-headers',
      plugin: require('/home/zpuckeridge/development/blog/node_modules/gatsby-remark-autolink-headers/gatsby-ssr.js'),
      options: {"plugins":[],"className":"auto-link-headers","offsetY":0},
    },{
      name: 'gatsby-plugin-manifest',
      plugin: require('/home/zpuckeridge/development/blog/node_modules/gatsby-plugin-manifest/gatsby-ssr.js'),
      options: {"plugins":[],"name":"gatsby-starter-default","short_name":"starter","start_url":"/","background_color":"#663399","theme_color":"#663399","display":"minimal-ui","icon":"src/images/profile-pic.jpg","legacy":true,"theme_color_in_head":true,"cache_busting_mode":"query","crossOrigin":"anonymous","include_favicon":true,"cacheDigest":"0cbe0fe19889af3c3d5489f427820884"},
    },{
      name: 'gatsby-plugin-offline',
      plugin: require('/home/zpuckeridge/development/blog/node_modules/gatsby-plugin-offline/gatsby-ssr.js'),
      options: {"plugins":[]},
    },{
      name: 'default-site-plugin',
      plugin: require('/home/zpuckeridge/development/blog/gatsby-ssr.js'),
      options: {"plugins":[]},
    },{
      name: 'partytown',
      plugin: require('/home/zpuckeridge/development/blog/node_modules/gatsby/dist/internal-plugins/partytown/gatsby-ssr.js'),
      options: {"plugins":[]},
    }]
/* global plugins */
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = require(`./api-ssr-docs`)

function augmentErrorWithPlugin(plugin, err) {
  if (plugin.name !== `default-site-plugin`) {
    // default-site-plugin is user code and will print proper stack trace,
    // so no point in annotating error message pointing out which plugin is root of the problem
    err.message += ` (from plugin: ${plugin.name})`
  }

  throw err
}

export function apiRunner(api, args, defaultReturn, argTransform) {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  const results = []
  plugins.forEach(plugin => {
    const apiFn = plugin.plugin[api]
    if (!apiFn) {
      return
    }

    try {
      const result = apiFn(args, plugin.options)

      if (result && argTransform) {
        args = argTransform({ args, result })
      }

      // This if case keeps behaviour as before, we should allow undefined here as the api is defined
      // TODO V4
      if (typeof result !== `undefined`) {
        results.push(result)
      }
    } catch (e) {
      augmentErrorWithPlugin(plugin, e)
    }
  })

  return results.length ? results : [defaultReturn]
}

export async function apiRunnerAsync(api, args, defaultReturn, argTransform) {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  const results = []
  for (const plugin of plugins) {
    const apiFn = plugin.plugin[api]
    if (!apiFn) {
      continue
    }

    try {
      const result = await apiFn(args, plugin.options)

      if (result && argTransform) {
        args = argTransform({ args, result })
      }

      // This if case keeps behaviour as before, we should allow undefined here as the api is defined
      // TODO V4
      if (typeof result !== `undefined`) {
        results.push(result)
      }
    } catch (e) {
      augmentErrorWithPlugin(plugin, e)
    }
  }

  return results.length ? results : [defaultReturn]
}
