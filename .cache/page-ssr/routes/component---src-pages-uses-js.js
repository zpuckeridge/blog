"use strict";
exports.id = "component---src-pages-uses-js";
exports.ids = ["component---src-pages-uses-js"];
exports.modules = {

/***/ "./src/components/seo.js":
/*!*******************************!*\
  !*** ./src/components/seo.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _public_page_data_sq_d_3000541721_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../public/page-data/sq/d/3000541721.json */ "./public/page-data/sq/d/3000541721.json");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-helmet */ "./node_modules/react-helmet/es/Helmet.js");





const Seo = ({
  description,
  lang,
  meta,
  title
}) => {
  var _site$siteMetadata;

  const {
    site
  } = _public_page_data_sq_d_3000541721_json__WEBPACK_IMPORTED_MODULE_0__.data;
  const metaDescription = description || site.siteMetadata.description;
  const defaultTitle = (_site$siteMetadata = site.siteMetadata) === null || _site$siteMetadata === void 0 ? void 0 : _site$siteMetadata.title;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react_helmet__WEBPACK_IMPORTED_MODULE_2__.Helmet, {
    htmlAttributes: {
      lang
    },
    title: title,
    titleTemplate: defaultTitle ? `%s | ${defaultTitle}` : null,
    meta: [{
      name: `description`,
      content: metaDescription
    }, {
      property: `og:title`,
      content: title
    }, {
      property: `og:description`,
      content: metaDescription
    }, {
      property: `og:type`,
      content: `website`
    }].concat(meta)
  });
};

Seo.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``
};
Seo.propTypes = {
  description: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().string),
  lang: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().string),
  meta: prop_types__WEBPACK_IMPORTED_MODULE_3___default().arrayOf((prop_types__WEBPACK_IMPORTED_MODULE_3___default().object)),
  title: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().string.isRequired)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Seo);

/***/ }),

/***/ "./src/pages/uses.js":
/*!***************************!*\
  !*** ./src/pages/uses.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/layout/dist/chakra-ui-layout.esm.js");
/* harmony import */ var _chakra_ui_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @chakra-ui/icons */ "./node_modules/@chakra-ui/icons/dist/chakra-ui-icons.esm.js");
/* harmony import */ var _components_seo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/seo */ "./src/components/seo.js");





const UsesPage = () => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_seo__WEBPACK_IMPORTED_MODULE_1__["default"], {
    title: "Uses"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Box, {
    marginBottom: "2rem"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.VStack, {
    spacing: 8
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.VStack, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Heading, {
    fontSize: "4xl"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    role: "img",
    "aria-label": "Tools"
  }, "\uD83D\uDEE0\uFE0F"), ' ', "Uses"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Text, {
    fontSize: "2xl",
    color: "white",
    textAlign: "center"
  }, "A list of the tools that I use on a regular basis.")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Heading, {
    fontSize: "2xl"
  }, "Hardware"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Text, null, "I am currently dual booting", ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Link, {
    color: "#75bcff",
    href: `https://pop.system76.com/`,
    title: `Pop!_OS`,
    _hover: {
      textDecor: 'none',
      color: '#30ce56'
    }
  }, "POP!_OS"), ' ', "and", ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Link, {
    color: "#75bcff",
    _hover: {
      textDecor: 'none',
      color: '#30ce56'
    },
    href: `https://www.microsoft.com/en-au/software-download/windows10`,
    title: `Windows 10`
  }, "Windows 11.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Text, null, "My rig has the following specifications:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.List, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListItem, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListIcon, {
    as: _chakra_ui_icons__WEBPACK_IMPORTED_MODULE_3__.ArrowForwardIcon
  }), "CPU: Ryzen 7 5800X"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListItem, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListIcon, {
    as: _chakra_ui_icons__WEBPACK_IMPORTED_MODULE_3__.ArrowForwardIcon
  }), "GPU: AMD RX 6600XT"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListItem, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListIcon, {
    as: _chakra_ui_icons__WEBPACK_IMPORTED_MODULE_3__.ArrowForwardIcon
  }), "RAM: Corsair 2 x 32GB DDR4-3200MHz"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListItem, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListIcon, {
    as: _chakra_ui_icons__WEBPACK_IMPORTED_MODULE_3__.ArrowForwardIcon
  }), "MBO: ASUS ROG STRIX X570-I"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListItem, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListIcon, {
    as: _chakra_ui_icons__WEBPACK_IMPORTED_MODULE_3__.ArrowForwardIcon
  }), "SSD: 2x 1TB Samsung 980 Pro")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Text, null, "For audio, I'm using the following:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.List, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListItem, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListIcon, {
    as: _chakra_ui_icons__WEBPACK_IMPORTED_MODULE_3__.ArrowForwardIcon
  }), "Amplification: Focusrite Scarlett Solo"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListItem, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListIcon, {
    as: _chakra_ui_icons__WEBPACK_IMPORTED_MODULE_3__.ArrowForwardIcon
  }), "Microphone: Audio-Technica AT2020 Cardioid Condenser"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListItem, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListIcon, {
    as: _chakra_ui_icons__WEBPACK_IMPORTED_MODULE_3__.ArrowForwardIcon
  }), "Headphones: Beyerdynamic DT 770 + Koss KPH30i + Audio-Technica ATH-AD700X")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Heading, {
    fontSize: "2xl",
    marginTop: "12.5px",
    marginBottom: "12.5px"
  }, "Gadgets"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.List, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListItem, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListIcon, {
    as: _chakra_ui_icons__WEBPACK_IMPORTED_MODULE_3__.ArrowForwardIcon
  }), "Phone - Google Pixel 6 (GrapheneOS)"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListItem, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListIcon, {
    as: _chakra_ui_icons__WEBPACK_IMPORTED_MODULE_3__.ArrowForwardIcon
  }), "Camera - Nikon D3200")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Heading, {
    fontSize: "2xl",
    marginTop: "12.5px",
    marginBottom: "12.5px"
  }, "Editor & Terminal"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Text, null, "Visual Studio Code is my primary editor."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.List, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListItem, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListIcon, {
    as: _chakra_ui_icons__WEBPACK_IMPORTED_MODULE_3__.ArrowForwardIcon
  }), "I use the", ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Link, {
    color: "#75bcff",
    href: `https://marketplace.visualstudio.com/items?itemName=GitHub.github-vscode-theme/`,
    title: `Visual Studio Code Marketplace`,
    _hover: {
      textDecor: 'none',
      color: '#30ce56'
    }
  }, "GitHub"), ' ', "Theme"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListItem, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListIcon, {
    as: _chakra_ui_icons__WEBPACK_IMPORTED_MODULE_3__.ArrowForwardIcon
  }), "Shell:", ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Link, {
    color: "#75bcff",
    href: `https://www.zsh.org/`,
    title: `ZSH`,
    _hover: {
      textDecor: 'none',
      color: '#30ce56'
    }
  }, "Zsh")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListItem, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListIcon, {
    as: _chakra_ui_icons__WEBPACK_IMPORTED_MODULE_3__.ArrowForwardIcon
  }), "Shell Theme: powerlevel10k")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Heading, {
    fontSize: "2xl",
    marginTop: "12.5px",
    marginBottom: "12.5px"
  }, "Tools"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.List, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListItem, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListIcon, {
    as: _chakra_ui_icons__WEBPACK_IMPORTED_MODULE_3__.ArrowForwardIcon
  }), "My primary Web Browsers are", ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Link, {
    color: "#75bcff",
    _hover: {
      textDecor: 'none',
      color: '#30ce56'
    },
    href: `https://librewolf-community.gitlab.io/`,
    title: `Librewolf`
  }, "LibreWolf"), ' ', "and", ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Link, {
    color: "#75bcff",
    href: `https://brave.com/`,
    title: `Brave`,
    _hover: {
      textDecor: 'none',
      color: '#30ce56'
    }
  }, "Brave"), ". These are both great privacy respecting choices that allow me to develop for both platforms."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListItem, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListIcon, {
    as: _chakra_ui_icons__WEBPACK_IMPORTED_MODULE_3__.ArrowForwardIcon
  }), "Password Manager:", ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Link, {
    href: `https://bitwarden.com/`,
    title: `Bitwarden`,
    color: "#75bcff"
  }, "Bitwarden")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListItem, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListIcon, {
    as: _chakra_ui_icons__WEBPACK_IMPORTED_MODULE_3__.ArrowForwardIcon
  }), "Tech Stack Detection:", ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Link, {
    href: `https://www.wappalyzer.com/`,
    title: `Wappalyzer`,
    _hover: {
      textDecor: 'none',
      color: '#30ce56'
    },
    color: "#75bcff"
  }, "Wappalyzer")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListItem, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListIcon, {
    as: _chakra_ui_icons__WEBPACK_IMPORTED_MODULE_3__.ArrowForwardIcon
  }), "Communication:", ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Link, {
    href: `https://slack.com/intl/en-au/`,
    title: `Slack`,
    _hover: {
      textDecor: 'none',
      color: '#30ce56'
    },
    color: "#75bcff"
  }, "Slack"), ' ', "and", ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Link, {
    href: `https://discord.com/brand-new`,
    title: `Discord`,
    _hover: {
      textDecor: 'none',
      color: '#30ce56'
    },
    color: "#75bcff"
  }, "Discord")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListItem, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListIcon, {
    as: _chakra_ui_icons__WEBPACK_IMPORTED_MODULE_3__.ArrowForwardIcon
  }), "Ad Blocking:", ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Link, {
    href: `https://pi-hole.net/`,
    title: `Pi-Hole`,
    _hover: {
      textDecor: 'none',
      color: '#30ce56'
    },
    color: "#75bcff"
  }, "AdGuard")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListItem, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListIcon, {
    as: _chakra_ui_icons__WEBPACK_IMPORTED_MODULE_3__.ArrowForwardIcon
  }), "Two Factor Authentication:", ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Link, {
    href: `https://getaegis.app/`,
    title: `Aegis Authenticator`,
    _hover: {
      textDecor: 'none',
      color: '#30ce56'
    },
    color: "#75bcff"
  }, "Aegis Authenticator"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Heading, {
    fontSize: "2xl",
    marginTop: "12.5px",
    marginBottom: "12.5px"
  }, "CLI Tools"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.List, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListItem, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListIcon, {
    as: _chakra_ui_icons__WEBPACK_IMPORTED_MODULE_3__.ArrowForwardIcon
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Link, {
    href: `https://ohmyz.sh/`,
    title: `Oh My Zsh`,
    _hover: {
      textDecor: 'none',
      color: '#30ce56'
    },
    color: "#75bcff"
  }, "Oh My Zsh"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Heading, {
    fontSize: "2xl",
    marginTop: "12.5px",
    marginBottom: "12.5px"
  }, "Self Hosted Tools"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.List, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListItem, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListIcon, {
    as: _chakra_ui_icons__WEBPACK_IMPORTED_MODULE_3__.ArrowForwardIcon
  }), "Virtualisation:", ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Link, {
    _hover: {
      textDecor: 'none',
      color: '#30ce56'
    },
    color: "#75bcff",
    href: `https://www.proxmox.com/en/`,
    title: `Proxmox`
  }, "Proxmox"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Heading, {
    fontSize: "2xl",
    marginTop: "12.5px",
    marginBottom: "12.5px"
  }, "DevOps Tech Stack (Currently Learning)"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.List, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListItem, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListIcon, {
    as: _chakra_ui_icons__WEBPACK_IMPORTED_MODULE_3__.ArrowForwardIcon
  }), "Programming Language:", ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Link, {
    href: `https://www.python.org/`,
    title: `Python`,
    _hover: {
      textDecor: 'none',
      color: '#30ce56'
    },
    color: "#75bcff"
  }, "Python"), ' ', "+", ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Link, {
    href: `https://www.javascript.com/`,
    title: `JavaScript`,
    _hover: {
      textDecor: 'none',
      color: '#30ce56'
    },
    color: "#75bcff"
  }, "JavaScript")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListItem, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListIcon, {
    as: _chakra_ui_icons__WEBPACK_IMPORTED_MODULE_3__.ArrowForwardIcon
  }), "Monitoring & Logging:", ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Link, {
    href: `https://prometheus.io/`,
    title: `Prometheus`,
    _hover: {
      textDecor: 'none',
      color: '#30ce56'
    },
    color: "#75bcff"
  }, "Prometheus"), ' ', "+", ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Link, {
    href: `https://www.elastic.co/kibana`,
    title: `Kibana`,
    _hover: {
      textDecor: 'none',
      color: '#30ce56'
    },
    color: "#75bcff"
  }, "Kibana")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListItem, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListIcon, {
    as: _chakra_ui_icons__WEBPACK_IMPORTED_MODULE_3__.ArrowForwardIcon
  }), "Containerisation:", ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Link, {
    href: `https://kubernetes.io/`,
    title: `Kubernetes`,
    _hover: {
      textDecor: 'none',
      color: '#30ce56'
    },
    color: "#75bcff"
  }, "Kubernetes"), ' ', "+", ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Link, {
    href: `https://www.docker.com/`,
    title: `Docker`,
    _hover: {
      textDecor: 'none',
      color: '#30ce56'
    },
    color: "#75bcff"
  }, "Docker")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListItem, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListIcon, {
    as: _chakra_ui_icons__WEBPACK_IMPORTED_MODULE_3__.ArrowForwardIcon
  }), "Virtualisation:", ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Link, {
    href: `https://www.vmware.com/`,
    title: `VMware`,
    _hover: {
      textDecor: 'none',
      color: '#30ce56'
    },
    color: "#75bcff"
  }, "VMware")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListItem, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListIcon, {
    as: _chakra_ui_icons__WEBPACK_IMPORTED_MODULE_3__.ArrowForwardIcon
  }), "Cloud Computation:", ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Link, {
    href: `https://cloud.linode.com/`,
    title: `Linode`,
    _hover: {
      textDecor: 'none',
      color: '#30ce56'
    },
    color: "#75bcff"
  }, "Linode"), ' ', "+", ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Link, {
    href: `https://aws.amazon.com/`,
    title: `AWS`,
    _hover: {
      textDecor: 'none',
      color: '#30ce56'
    },
    color: "#75bcff"
  }, "AWS"), ' ', "+", ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Link, {
    href: `https://cloud.google.com/`,
    title: `Google Cloud`,
    _hover: {
      textDecor: 'none',
      color: '#30ce56'
    },
    color: "#75bcff"
  }, "Google Cloud")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListItem, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListIcon, {
    as: _chakra_ui_icons__WEBPACK_IMPORTED_MODULE_3__.ArrowForwardIcon
  }), "Security:", ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Link, {
    href: `https://www.vaultproject.io/`,
    title: `Vault`,
    _hover: {
      textDecor: 'none',
      color: '#30ce56'
    },
    color: "#75bcff"
  }, "Vault")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListItem, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListIcon, {
    as: _chakra_ui_icons__WEBPACK_IMPORTED_MODULE_3__.ArrowForwardIcon
  }), "Provisioning:", ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Link, {
    href: `https://www.terraform.io/`,
    title: `Terraform`,
    _hover: {
      textDecor: 'none',
      color: '#30ce56'
    },
    color: "#75bcff"
  }, "Terraform"), ' ', "and", ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Link, {
    href: `https://www.ansible.com/`,
    title: `Ansible`,
    _hover: {
      textDecor: 'none',
      color: '#30ce56'
    },
    color: "#75bcff"
  }, "Ansible"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Heading, {
    fontSize: "2xl",
    marginTop: "12.5px",
    marginBottom: "12.5px"
  }, "Development Services"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.List, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListItem, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListIcon, {
    as: _chakra_ui_icons__WEBPACK_IMPORTED_MODULE_3__.ArrowForwardIcon
  }), "Code Repositories:", ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Link, {
    href: `https://github.com/`,
    title: `GitHub`,
    _hover: {
      textDecor: 'none',
      color: '#30ce56'
    },
    color: "#75bcff"
  }, "GitHub"), ' ', "&", ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Link, {
    href: `https://about.gitlab.com/`,
    title: `GitLab`,
    _hover: {
      textDecor: 'none',
      color: '#30ce56'
    },
    color: "#75bcff"
  }, "GitLab")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListItem, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListIcon, {
    as: _chakra_ui_icons__WEBPACK_IMPORTED_MODULE_3__.ArrowForwardIcon
  }), "Domain Name Provider:", ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Link, {
    href: `https://www.namecheap.com/`,
    title: `Namecheap`,
    _hover: {
      textDecor: 'none',
      color: '#30ce56'
    },
    color: "#75bcff"
  }, "Namecheap")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListItem, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListIcon, {
    as: _chakra_ui_icons__WEBPACK_IMPORTED_MODULE_3__.ArrowForwardIcon
  }), "Server Host:", ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Link, {
    href: `https://cloud.linode.com/`,
    title: `Linode`,
    _hover: {
      textDecor: 'none',
      color: '#30ce56'
    },
    color: "#75bcff"
  }, "Linode"))));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UsesPage);
const pageQuery = "3159585216";

/***/ }),

/***/ "./public/page-data/sq/d/3000541721.json":
/*!***********************************************!*\
  !*** ./public/page-data/sq/d/3000541721.json ***!
  \***********************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"data":{"site":{"siteMetadata":{"title":"Zacchary Puckeridge","description":"Hi! 👋 I\'m Zacchary. I\'m a self-taught Web Developer based out of Brisbane, Australia."}}}}');

/***/ })

};
;
//# sourceMappingURL=component---src-pages-uses-js.js.map