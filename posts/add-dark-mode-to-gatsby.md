---
title: "🌕 How to add a Dark Mode Toggle to Gatsby"
slug: add-dark-mode-toggle-gatsby
date: "2021-05-20"
tags: Gatsby
description: This article is a short guide on setting up a Dark Mode/Light Mode Toggle with CSS and a Custom Component.
socialImage: images/dark-mode.jpg
---

Recently, I decided to implement a light theme into my, by default,
dark themed blog. I saw lots of unnecessarily complicated methods and
decided to do some researching to see if there was a more simpler,
direct way. I've documented my solution in the article below.

### Prerequisites::

The following article assumes that you some general knowledge in the
following areas:

- CSS
- React/Gatsby Components

### Install `gatsby-plugin-dark-mode`

This fantastic Gatsby plugin is going to do 90% of all the hard work
for us. To install it, run the following:

```bash
yarn add gatsby-plugin-dark-mode
```

or if you are using Node Package Manager

```bash
npm install gatsby-plugin-dark-mode
```

Now that the plugin has been installed, we need to add it to our
`gatsby-config.js` file along with all of our plugins.

```JS
plugins: [`gatsby-plugin-dark-mode`]
```

<blockquote id="blockquote-warning">
If your development server is running, be sure to restart it after installing the plugins.
</blockquote>

### Create a new `themeToggle.js` Component

It's time to create our a new component. This will be responsible for
handling our toggle button and calling the `gatsby-plugin-dark-mode`
plugin.

Simply add a new component called `themeToggle.js` to your Components
(typically `../src/components`) folder and use the example from the
plugins documentation:

```JS
import React from "react"
import { ThemeToggler } from "gatsby-plugin-dark-mode"

export default function ThemeToggle() {
  return (
    <ThemeToggler>
      {({ theme, toggleTheme }) => {
        if (theme == null) {
          return null
        }
        return (
        <div className="theme-switch-wrapper">
          <label className="theme-switch">
            <input
              type="checkbox"
              onChange={e => toggleTheme(e.target.checked ? "light" : "dark")}
              checked={theme === "light"}
            />
            <div className="slider round"></div>
          </label>
        </div>
        )
      }}
    </ThemeToggler>
  )
}
```

<blockquote id="blockquote-info">
There are some minor changes to the code above to integrate with our custom CSS in the next step. Be sure to copy as-is if you're following along!
</blockquote>

### Adding Custom CSS

In this section, we will be adding the required CSS to make our button
appear as a switch. I'll be using the code from
[Ananya Neogi's](https://dev.to/ananyaneogi/create-a-dark-light-mode-switch-with-css-variables-34l8)
post on how to create a simple CSS theme toggle.

```CSS
.theme-switch-wrapper {
  display: flex;
  align-items: center;

  em {
    margin-left: 10px;
    font-size: 1rem;
  }
}
.theme-switch {
  display: inline-block;
  height: 34px;
  position: relative;
  width: 60px;
}

.theme-switch input {
  display:none;
}

.slider {
  background-color: #ccc;
  bottom: 0;
  cursor: pointer;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  transition: .4s;
}

.slider:before {
  background-color: #fff;
  bottom: 4px;
  content: "";
  height: 26px;
  left: 4px;
  position: absolute;
  transition: .4s;
  width: 26px;
}

input:checked + .slider {
  background-color: #66bb6a;
}

input:checked + .slider:before {
  transform: translateX(26px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
```

Now that we have our toggle CSS, the HTML and classes we specified in
`themeToggle.js` will begin working correctly.

### Our toggle is working, but what now?

You may have noticed at this point that your theme is not updating.
Well, this is because there is one last step to complete! It's time to
ensure that we have two sets of global variables, one for our dark
theme and another for our light theme. Most good Gatsby Starters
already come with two sets of global variables, but in case yours only
comes with one, simply lift the variables that you are using in your
CSS and paste it under the following variable name like so:

```CSS
body.light {
  --color-primary: #47a6ff;
  --color-text: black;
  --color-text-light: #4f5969;
  --color-heading: black;
  --color-heading-black: black;
  --color-accent: black;
  --color-background: #ebf7fd;
  --color-accent-background: #d6e4f0;
}
```

<blockquote id="blockquote-warning">
Ensure that you are using `body.light` or `body.dark` as the variable name as this is what the `gatsby-plugin-dark-mode` is looking for in our CSS file.
</blockquote>

Once you are happy with the variations you have made, simply save the
file and have a play with your site to see the switch between light
and dark mode.

You can also add a simple transition from your dark/light theme by
adding the following CSS line to the relevant body/element tags:

```CSS
transition: background-color 0.4s;
```

### Conclusion

Setting up a theme toggle doesn't have to be a complicated process. I
hope that you were able to learn something from my article!

If you have any questions or think I could have taken a better
approach, let me know! Feel free to reach out in the comments below or
reach out to me via [email](mailto:zacchary@puckeridge.me).
