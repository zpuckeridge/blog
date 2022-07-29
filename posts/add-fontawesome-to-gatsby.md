---
title: "🎊 How to add Font Awesome to Gatsby"
slug: add-fontawesome-gatsby
date: "2021-05-29"
tags: Gatsby
description: A quick guide on adding Font Awesome Icons to your Gatsby site the right way.
---

A quick guide on adding Font Awesome Icons to your Gatsby site the right way.

### Getting Started

First, let's install the following Font Awesome dependencies:

```bash
yarn add @fortawesome/fontawesome-svg-core
yarn add @fortawesome/free-solid-svg-icons
yarn add @fortawesome/react-fontawesome
```

Or, if you are using Node Package Manager, run the following:

```bash
npm i --save @fortawesome/fontawesome-svg-core
npm i --save @fortawesome/free-solid-svg-icons
npm i --save @fortawesome/react-fontawesome
```

There are additional packages that can be installed. Checkout the [Font Awesome Documentation](https://fontawesome.com/how-to-use/on-the-web/using-with/react) for examples.

### Integration

Now that we have added our dependencies, we need to import them to the pages or components that we would like to see the icons on.

Please see the following code example on importing and calling the Font Awesome Icons.

```js
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoffee,
  faAddressBook,
  faAirFreshener,
  faAmbulance,
  faAtom,
  faBus,
  faCoins,
  faDice,
} from "@fortawesome/free-solid-svg-icons";

const IndexPage = () => (
  <main
    style={{
      maxWidth: "608px",
      margin: "0 auto",
    }}
  >
    <h1 style={{ textAlign: "center" }}>Gatsby Font Awesome example</h1>
    <div>
      <FontAwesomeIcon icon={faCoffee} size="1x" />
      <FontAwesomeIcon icon={faAddressBook} size="2x" />
      <FontAwesomeIcon icon={faAirFreshener} size="3x" />
      <FontAwesomeIcon icon={faAtom} size="4x" />
      <FontAwesomeIcon icon={faAmbulance} size="5x" />
      <FontAwesomeIcon icon={faBus} size="6x" />
      <FontAwesomeIcon icon={faCoins} size="7x" />
      <FontAwesomeIcon icon={faDice} size="8x" />
    </div>
  </main>
);

export default IndexPage;
```

We have successfully imported the FontAwesomeIcon component. Now, we can visit our site and check that our icons are working as expected, but there is an issue.

You may find that our icons are resizing themselves. This is because Font Awesome inserts its styles when the JavaScript, but because we aren't running JavaScript, it renders the icon without styles.

Thankfully, there is a Gatsby plugin that inserts the styles manually at the compile time using Gatsby Server Rendering APIs.

To use it, we need to install the plugin and call it in our `gatsby-config.js`:

```bash
yarn add gatsby-plugin-fontawesome-css
```

Or if you are using Node Package Manager:

```bash
npm i --save gatsby-plugin-fontawesome-css
```

Now let's add the plugin to our `gatsby-config.js`:

```js
module.exports = {
  plugins: [`gatsby-plugin-fontawesome-css`],
};
```

That's it! Restart your development server and should see that your icons are rendering correctly.

### Conclusion

Font Awesome can be a little confusing to setup at first, but with a little effort, anything is possible.

If you have any questions or think I could have taken a better approach, let me know! Feel free to reach out in the comments below or reach out to me via [email](mailto:zacchary@puckeridge.me).
