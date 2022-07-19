"use strict";
exports.id = "component---src-pages-about-js";
exports.ids = ["component---src-pages-about-js"];
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

/***/ "./src/pages/about.js":
/*!****************************!*\
  !*** ./src/pages/about.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/layout/dist/chakra-ui-layout.esm.js");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/button/dist/chakra-ui-button.esm.js");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/icon/dist/chakra-ui-icon.esm.js");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/tabs/dist/chakra-ui-tabs.esm.js");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/accordion/dist/chakra-ui-accordion.esm.js");
/* harmony import */ var _chakra_ui_icons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @chakra-ui/icons */ "./node_modules/@chakra-ui/icons/dist/chakra-ui-icons.esm.js");
/* harmony import */ var _components_seo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/seo */ "./src/components/seo.js");





const AboutPage = () => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_seo__WEBPACK_IMPORTED_MODULE_1__["default"], {
    title: "About"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Box, {
    marginTop: "2rem",
    marginBottom: "4rem"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Heading, {
    fontSize: "4xl"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    role: "img",
    "aria-label": "waving hand"
  }, "\uD83D\uDC4B"), ' ', "About Zacchary"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Text, null, "Hey there! I'm a IT Administrator based out of Brisbane, Australia. Currently, I'm working for a VFX Studio called", ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Link, {
    href: `https://rsp.com.au`,
    isExternal: true,
    title: `Rising Sun Pictures Website`,
    color: "#75bcff",
    _hover: {
      textDecor: 'none',
      color: '#30ce56'
    }
  }, "Rising Sun Pictures"), "."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Heading, {
    fontSize: "2xl"
  }, "What are you currently learning?"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Text, null, "Currently, I'm building tools to automate various processes at RSP as well as designing and deploying networking solutions."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Text, null, "When I'm not at work, or working on a personal project, I'm hanging out with mates, riding motorcycles, playing video games, nerding out over audio and teaching myself animation.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Box, {
    align: "center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Link, {
    href: `../static/../resume.pdf`,
    title: `Résumé`,
    _hover: {
      textDecor: 'none'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__.Button, {
    size: "md",
    marginBottom: "4.5rem"
  }, "Download my r\xE9sum\xE9", ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__.Icon, {
    marginLeft: "0.5rem",
    as: _chakra_ui_icons__WEBPACK_IMPORTED_MODULE_5__.DownloadIcon
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.Tabs, {
    size: "md",
    variant: "solid-rounded",
    colorScheme: "blue"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Center, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.TabList, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.SimpleGrid, {
    columns: 3,
    spacingX: "20px",
    spacingY: "20px",
    marginBottom: "2rem"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.Tab, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Box, {
    marginRight: "5px"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    role: "img",
    "aria-label": "toolbox"
  }, "\uD83E\uDDF0")), "Work"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.Tab, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Box, {
    marginRight: "5px"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    role: "img",
    "aria-label": "heart"
  }, "\u2764\uFE0F")), "Community"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.Tab, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Box, {
    marginRight: "5px"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    role: "img",
    "aria-label": "graduation"
  }, "\uD83C\uDF93")), "Education"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.Tab, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Box, {
    marginRight: "5px"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    role: "img",
    "aria-label": "brain"
  }, "\uD83E\uDDE0")), "Skills"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.Tab, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Box, {
    marginRight: "5px"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    role: "img",
    "aria-label": "mouth"
  }, "\uD83D\uDC44")), "Languages"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.Tab, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Box, {
    marginRight: "5px"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    role: "img",
    "aria-label": "rocket"
  }, "\uD83D\uDE80")), "Interests")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.TabPanels, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.TabPanel, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Heading, {
    marginBottom: "2rem",
    fontSize: "4xl"
  }, "Work"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.Accordion, {
    allowToggle: true
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.AccordionItem, {
    marginBottom: "1rem",
    border: "1px solid white",
    borderRadius: "20px",
    backgroundColor: "#212121"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.AccordionButton, {
    borderBottom: "1px solid white",
    borderRadius: "20px"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Box, {
    fontWeight: "800",
    flex: "1",
    align: "left",
    fontSize: "lg"
  }, "Rising Sun Pictures"), ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Box, {
    fontWeight: "800",
    flex: "1",
    align: "right",
    fontSize: "lg"
  }, "May 2022 \u2192 Present"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.AccordionIcon, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.AccordionPanel, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Flex, {
    marginBottom: "1rem"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Flex, null, "IT Administrator"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Spacer, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Link, {
    href: `https://rsp.com.au`,
    title: `Rising Sun Pictures`,
    color: "#75bcff",
    _hover: {
      textDecor: 'none',
      color: '#30ce56'
    }
  }, "https://rsp.com.au")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Box, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Text, null, "...")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.AccordionItem, {
    marginBottom: "1rem",
    border: "1px solid white",
    borderRadius: "20px",
    backgroundColor: "#212121"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.AccordionButton, {
    borderBottom: "1px solid white",
    borderRadius: "20px"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Box, {
    fontWeight: "800",
    flex: "1",
    align: "left",
    fontSize: "lg"
  }, "Pixel Zoo"), ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Box, {
    fontWeight: "800",
    flex: "1",
    align: "right",
    fontSize: "lg"
  }, "Jun 2021 \u2192 May 2022"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.AccordionIcon, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.AccordionPanel, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Flex, {
    marginBottom: "1rem"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Flex, null, "Systems Administrator"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Spacer, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Link, {
    href: `https://pixelzoo.com.au`,
    title: `Pixel Zoo`,
    color: "#75bcff",
    _hover: {
      textDecor: 'none',
      color: '#30ce56'
    }
  }, "https://pixelzoo.com.au")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Box, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Text, null, "Provided clear and concise support for ~200 employee's both internal and remote. Deployed various networking and hardware upgrades across the studio. Improved the efficiency of various software and tools. Built and deployed a ~500TB CephFS Cluster to upgrade studio's existing storage solution.")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.AccordionItem, {
    marginBottom: "1rem",
    border: "1px solid white",
    borderRadius: "20px",
    backgroundColor: "#212121"
  }, ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.AccordionButton, {
    borderBottom: "1px solid white",
    borderRadius: "20px"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Box, {
    fontWeight: "800",
    flex: "1",
    align: "left",
    fontSize: "lg"
  }, "Dev Demand Co."), ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Box, {
    fontWeight: "800",
    flex: "1",
    align: "right",
    fontSize: "lg"
  }, "May 2020 \u2192 May 2021"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.AccordionIcon, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.AccordionPanel, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Flex, {
    marginBottom: "1rem"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Flex, null, "Junior Cloud Architect"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Spacer, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Link, {
    href: `https://devdemand.co`,
    title: `Dev Demand`,
    color: "#75bcff",
    _hover: {
      textDecor: 'none',
      color: '#30ce56'
    }
  }, "https://devdemand.co")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Text, null, "Learned to troubleshoot server related issues. Worked in the administration of a small business to develop documentation and processes. Began looking into the inner workings of Kubernetes and participated in the development of client related projects."))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.AccordionItem, {
    marginBottom: "1rem",
    border: "1px solid white",
    borderRadius: "20px",
    backgroundColor: "#212121"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.AccordionButton, {
    borderBottom: "1px solid white",
    borderRadius: "20px"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Box, {
    fontWeight: "800",
    flex: "1",
    align: "left",
    fontSize: "lg"
  }, "Conetix Web Hosting"), ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Box, {
    fontWeight: "800",
    flex: "1",
    align: "right",
    fontSize: "lg"
  }, "Sep 2018 \u2192 May 2020"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.AccordionIcon, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.AccordionPanel, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Flex, {
    marginBottom: "1rem"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Flex, null, "Technical Support Staff"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Spacer, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Link, {
    href: `https://conetix.com.au`,
    title: `Conetix Web Hosting`,
    color: "#75bcff",
    _hover: {
      textDecor: 'none',
      color: '#30ce56'
    }
  }, "https://conetix.com.au")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Text, null, "Provided professional phone and email support across a wide range of various web related technologies including WordPress, Office 365, Plesk, Windows Server and Linux. Adept at the production of writing understandable technical processes and procedures."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Text, null, "Proficient at providing clear and consice support to customers over the phone quickly and efficiently. Participated in the maintenance of various Windows and Linux based servers."))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.AccordionItem, {
    marginBottom: "1rem",
    border: "1px solid white",
    borderRadius: "20px",
    backgroundColor: "#212121"
  }, ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.AccordionButton, {
    borderBottom: "1px solid white",
    borderRadius: "20px"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Box, {
    fontWeight: "800",
    flex: "1",
    align: "left",
    fontSize: "lg"
  }, "Camp Highroad"), ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Box, {
    fontWeight: "800",
    flex: "1",
    align: "right",
    fontSize: "lg"
  }, "May 2018 \u2192 Sep 2018", ' '), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.AccordionIcon, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.AccordionPanel, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Flex, {
    marginBottom: "1rem"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Flex, null, "Christian Camp Counsellor"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Spacer, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Link, {
    href: `https://camphighroad.org`,
    title: `Camp Highroad`,
    color: "#75bcff",
    _hover: {
      textDecor: 'none',
      color: '#30ce56'
    }
  }, "https://camphighroad.org")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Text, null, "Participated in leading campers through various team building and extra-curricular activities. Invested and developed meaningful relationships with campers, parents and other counsellors. Travelled from East Coast to West Coast USA and made great friends along the way."))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.AccordionItem, {
    marginBottom: "1rem",
    border: "1px solid white",
    borderRadius: "20px",
    backgroundColor: "#212121"
  }, ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.AccordionButton, {
    borderBottom: "1px solid white",
    borderRadius: "20px"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Box, {
    fontWeight: "800",
    flex: "1",
    align: "left",
    fontSize: "lg"
  }, "Hungry Jack's"), ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Box, {
    fontWeight: "800",
    flex: "1",
    align: "right",
    fontSize: "lg"
  }, "Nov 2016 \u2192 May 2018", ' '), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.AccordionIcon, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.AccordionPanel, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Flex, {
    marginBottom: "1rem"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Flex, null, "Crew Member"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Spacer, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Link, {
    href: `https://hungryjacks.com.au`,
    title: `Hungry Jack's`,
    color: "#75bcff",
    _hover: {
      textDecor: 'none',
      color: '#30ce56'
    }
  }, "https://hungryjacks.com.au")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Text, null, "Picked up strong time management skills and the ability to work in a stressful environment. Participated in the training of Crew Members in appropriate processes and procedures."))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.TabPanel, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Heading, {
    marginBottom: "2rem",
    fontSize: "4xl"
  }, "Community"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.Accordion, {
    allowToggle: true
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.AccordionItem, {
    marginBottom: "1rem",
    border: "1px solid white",
    borderRadius: "20px",
    backgroundColor: "#212121"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.AccordionButton, {
    borderBottom: "1px solid white",
    borderRadius: "20px"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Box, {
    fontWeight: "800",
    flex: "1",
    align: "left",
    fontSize: "lg"
  }, "GENTS Camp"), ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Box, {
    fontWeight: "800",
    flex: "1",
    align: "right",
    fontSize: "lg"
  }, "Sep 2017 \u2192 Present"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.AccordionIcon, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.AccordionPanel, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Flex, {
    marginBottom: "1rem"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Flex, null, "Camp Leader"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Spacer, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Link, {
    href: `https://gentscamp.com`,
    color: "#75bcff",
    _hover: {
      textDecor: 'none',
      color: '#30ce56'
    },
    title: `GENTS Camp`
  }, "https://gentscamp.com")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Text, null, "GENTS Camp is a Christian school holiday program for boys, with a range of camps for both primary and secondary students where they get to particpate in activites like tubing, cable skiing, wake boarding, tribal challenges and more. The camp is designed to show young guys what becoming a Christian man is really about."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Text, null, "The camp is a great chance to share the gospel with those that may not have heard it. I've been going to GENTS Camp as a leader since 2017 and love helping out!"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.AccordionItem, {
    marginBottom: "1rem",
    border: "1px solid white",
    borderRadius: "20px",
    backgroundColor: "#212121"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.AccordionButton, {
    borderBottom: "1px solid white",
    borderRadius: "20px"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Box, {
    fontWeight: "800",
    flex: "1",
    align: "left",
    fontSize: "lg"
  }, "Faith Bound"), ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Box, {
    fontWeight: "800",
    flex: "1",
    align: "right",
    fontSize: "lg"
  }, "Oct 2017 \u2192 Present"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.AccordionIcon, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.AccordionPanel, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Flex, {
    marginBottom: "1rem"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Flex, null, "Owner"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Spacer, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Link, {
    href: `https://faithbound.gg`,
    color: "#75bcff",
    _hover: {
      textDecor: 'none',
      color: '#30ce56'
    },
    title: `Faith Bound`
  }, "https://faithbound.gg")), "A few friends and I founded Faith Bound as a Christian Community Discord cantered around fellowship and sharing the truth of the Gospel. We are a community primarily based in Australia who seek to grow together as brothers and sisters in Christ while sharing the good news found in the Bible - God's abounding love for us displayed perfectly in the death of Jesus Christ.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.AccordionItem, {
    marginBottom: "1rem",
    border: "1px solid white",
    borderRadius: "20px",
    backgroundColor: "#212121"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.AccordionButton, {
    borderBottom: "1px solid white",
    borderRadius: "20px"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Box, {
    fontWeight: "800",
    flex: "1",
    align: "left",
    fontSize: "lg"
  }, "Chaplain Watch"), ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Box, {
    fontWeight: "800",
    flex: "1",
    align: "right",
    fontSize: "lg"
  }, "Nov 2020 \u2192 Jun 2021"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.AccordionIcon, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.AccordionPanel, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Flex, {
    marginBottom: "1rem"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Flex, null, "Night Watch"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Spacer, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Link, {
    href: `https://chaplainwatch.org.au/`,
    color: "#75bcff",
    _hover: {
      textDecor: 'none',
      color: '#30ce56'
    },
    title: `Chaplain Watch`
  }, "https://chaplainwatch.org.au/")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Text, null, "Chaplain Watch is a Christian community service charity, designed to intentionally intervene where people are in crisis, at risk, and in need. Once a month, I volunteer my time to apply First Aid and support public safety in Brisbane's night precinct."))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.AccordionItem, {
    marginBottom: "1rem",
    border: "1px solid white",
    borderRadius: "20px",
    backgroundColor: "#212121"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.AccordionButton, {
    borderBottom: "1px solid white",
    borderRadius: "20px"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Box, {
    fontWeight: "800",
    flex: "1",
    align: "left",
    fontSize: "lg"
  }, "Minden Baptist Church"), ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Box, {
    fontWeight: "800",
    flex: "1",
    align: "right",
    fontSize: "lg"
  }, "Feb 2020 \u2192 Oct 2020"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.AccordionIcon, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.AccordionPanel, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Flex, {
    marginBottom: "1rem"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Flex, null, "Sound Technician"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Spacer, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Link, {
    href: `https://mindenbaptist.org`,
    color: "#75bcff",
    _hover: {
      textDecor: 'none',
      color: '#30ce56'
    },
    title: `Minden Baptist Church`
  }, "https://mindenbaptist.org")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Text, null, "I volunteered my time as a Sound Technician at Minden Baptist Church to setting up, mixing, and packing down equipment before, during and after Church Services. Additionally, I operated cameras, livestreams and performed maintenance on these systems while I attended. I also revamped the churches website, although not perfect - is certainly much better than before!"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.AccordionItem, {
    marginBottom: "1rem",
    border: "1px solid white",
    borderRadius: "20px",
    backgroundColor: "#212121"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.AccordionButton, {
    borderBottom: "1px solid white",
    borderRadius: "20px"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Box, {
    fontWeight: "800",
    flex: "1",
    align: "left",
    fontSize: "lg"
  }, "Kingsridge Baptist Church"), ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Box, {
    fontWeight: "800",
    flex: "1",
    align: "right",
    fontSize: "lg"
  }, "Sep 2017 \u2192 May 2018"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.AccordionIcon, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.AccordionPanel, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Flex, {
    marginBottom: "1rem"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Flex, null, "Sound Technician / Youth Leader"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Spacer, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Link, {
    href: `https://kingsridgebaptist.org`,
    color: "#75bcff",
    _hover: {
      textDecor: 'none',
      color: '#30ce56'
    },
    title: `Kingsridge Baptist Church`
  }, "https://kingsridgebaptist.org")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Text, null, "At Kingsridge Baptist Church, I volunteered my time as a Youth Leader and Sound Technician. These responsibilities also included recording, live streaming and editing videos for the church."))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.TabPanel, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Heading, {
    marginBottom: "2rem",
    fontSize: "4xl"
  }, "Education"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.Accordion, {
    allowToggle: true
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.AccordionItem, {
    marginBottom: "1rem",
    border: "1px solid white",
    borderRadius: "20px",
    backgroundColor: "#212121"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.AccordionButton, {
    borderBottom: "1px solid white",
    borderRadius: "20px"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Box, {
    fontWeight: "800",
    flex: "1",
    align: "left",
    fontSize: "lg"
  }, "TAFE"), ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Box, {
    fontWeight: "800",
    flex: "1",
    align: "right",
    fontSize: "lg"
  }, "Jan 2019 \u2192 Jan 2020"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.AccordionIcon, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.AccordionPanel, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Flex, {
    marginBottom: "1rem"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Flex, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Text, null, "Information Technologies & Digital Media")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Spacer, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Text, null, "Certificate III")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Text, null, "General all rounder course on building computers, troubleshooting technology like printers, routers and networks completed while working at Conetix."))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.AccordionItem, {
    marginBottom: "1rem",
    border: "1px solid white",
    borderRadius: "20px",
    backgroundColor: "#212121"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.AccordionButton, {
    borderBottom: "1px solid white",
    borderRadius: "20px"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Box, {
    fontWeight: "800",
    flex: "1",
    align: "left",
    fontSize: "lg"
  }, "Plesk University"), ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Box, {
    fontWeight: "800",
    flex: "1",
    align: "right",
    fontSize: "lg"
  }, "Jan 2020 \u2192 Jun 2020"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.AccordionIcon, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.AccordionPanel, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Flex, {
    marginBottom: "1rem"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Flex, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Text, null, "Plesk Professional Certification")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Spacer, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Text, null, "Valid until 2021")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Text, null, "Level 1 Web Hosting and Support Certification working with the Plesk Control Panel."))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.TabPanel, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Heading, {
    marginBottom: "2rem",
    fontSize: "4xl"
  }, "Skills"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.Accordion, {
    allowToggle: true
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.AccordionItem, {
    marginBottom: "1rem",
    border: "1px solid white",
    borderRadius: "20px",
    backgroundColor: "#212121"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.AccordionButton, {
    borderBottom: "1px solid white",
    borderRadius: "20px"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Box, {
    fontWeight: "800",
    flex: "1",
    align: "left",
    fontSize: "lg"
  }, "Systems Administration"), ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Badge, {
    fontSize: "xs",
    colorScheme: "yellow"
  }, "Junior"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.AccordionIcon, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.AccordionPanel, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Flex, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Flex, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.UnorderedList, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListItem, null, "Debian/CentOS"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListItem, null, "Windows"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListItem, null, "Powershell"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListItem, null, "Docker"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListItem, null, "DNS/Domain Management"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListItem, null, "Proxmox"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListItem, null, "CephFS"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListItem, null, "Django", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Badge, {
    ml: "2",
    fontSize: "xs",
    colorScheme: "green"
  }, "Learning")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListItem, null, "Networking", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Badge, {
    ml: "2",
    fontSize: "xs",
    colorScheme: "green"
  }, "Learning")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListItem, null, "AD Management", ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Badge, {
    ml: "2",
    fontSize: "xs",
    colorScheme: "green"
  }, "Learning"))))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.AccordionItem, {
    marginBottom: "1rem",
    border: "1px solid white",
    borderRadius: "20px",
    backgroundColor: "#212121"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.AccordionButton, {
    borderBottom: "1px solid white",
    borderRadius: "20px"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Box, {
    fontWeight: "800",
    flex: "1",
    align: "left",
    fontSize: "lg"
  }, "Programming"), ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Badge, {
    fontSize: "xs",
    colorScheme: "yellow"
  }, "Junior"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.AccordionIcon, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.AccordionPanel, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Flex, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.UnorderedList, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListItem, null, "HTML"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListItem, null, "CSS"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListItem, null, "GatsbyJS"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListItem, null, "Chakra-UI"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListItem, null, "React", ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Badge, {
    ml: "2",
    fontSize: "xs",
    colorScheme: "green"
  }, "Learning")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListItem, null, "Python", ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Badge, {
    ml: "2",
    fontSize: "xs",
    colorScheme: "green"
  }, "Learning")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListItem, null, "Git CI/CD", ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Badge, {
    ml: "2",
    fontSize: "xs",
    colorScheme: "green"
  }, "Learning")))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.AccordionItem, {
    marginBottom: "1rem",
    border: "1px solid white",
    borderRadius: "20px",
    backgroundColor: "#212121"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.AccordionButton, {
    borderBottom: "1px solid white",
    borderRadius: "20px"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Box, {
    fontWeight: "800",
    flex: "1",
    align: "left",
    fontSize: "lg"
  }, "Technical Support"), ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Badge, {
    fontSize: "xs",
    colorScheme: "green"
  }, "Middle"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.AccordionIcon, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.AccordionPanel, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Flex, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.UnorderedList, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListItem, null, "ZenDesk"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListItem, null, "Freshdesk"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListItem, null, "3CX"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListItem, null, "GSuite"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListItem, null, "Office 365"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListItem, null, "Email Troubleshooting"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListItem, null, "Building and Repairing Computers/Laptops"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListItem, null, "Troubleshooting Logs"))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.AccordionItem, {
    marginBottom: "1rem",
    border: "1px solid white",
    borderRadius: "20px",
    backgroundColor: "#212121"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.AccordionButton, {
    borderBottom: "1px solid white",
    borderRadius: "20px"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Box, {
    fontWeight: "800",
    flex: "1",
    align: "left",
    fontSize: "lg"
  }, "Other"), ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.AccordionIcon, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.AccordionPanel, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Flex, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.UnorderedList, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListItem, null, "EQ (Audio Equalisation)"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListItem, null, "OBS (Open Broadcaster Software)"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListItem, null, "Stage Setup + Tear Down"))))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.TabPanel, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Heading, {
    marginBottom: "2rem",
    fontSize: "4xl"
  }, "Languages"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Flex, {
    marginBottom: "1rem"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Heading, {
    fontSize: "lg"
  }, "Language"), " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Spacer, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Heading, {
    fontSize: "lg"
  }, "Fluency")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Flex, {
    marginBottom: "-20px"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Text, null, "English"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Spacer, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Text, null, "Native")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Flex, {
    marginBottom: "-20px"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Text, null, "Russian "), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Spacer, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Text, null, "5%", ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Badge, {
    ml: "2",
    fontSize: "xs",
    colorScheme: "green"
  }, "Learning"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Flex, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Text, null, "\u666E\u901A\u8A71 (Mandarin) "), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Spacer, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Text, null, "0%", ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Badge, {
    ml: "2",
    fontSize: "xs",
    colorScheme: "yellow"
  }, "Not Started")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.TabPanel, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Heading, {
    marginBottom: "2rem",
    fontSize: "4xl"
  }, "Interests"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.SimpleGrid, {
    columns: 2,
    spacing: 10
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Box, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Heading, {
    marginBottom: "1rem",
    fontSize: "lg"
  }, "Photography"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.UnorderedList, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListItem, null, "Camera"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListItem, null, "Lighting"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListItem, null, "Exploration"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Box, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Heading, {
    marginBottom: "1rem",
    fontSize: "lg"
  }, "Audiophile"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.UnorderedList, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListItem, null, "Vinyl"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListItem, null, "Tube Amps"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListItem, null, "Headphones"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Box, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Heading, {
    marginBottom: "1rem",
    fontSize: "lg"
  }, "Self-Hosting"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.UnorderedList, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListItem, null, "Home Lab"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListItem, null, "Docker"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListItem, null, "Kubernetes"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Box, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Heading, {
    marginBottom: "1rem",
    fontSize: "lg"
  }, "Gaming"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.UnorderedList, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListItem, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Link, {
    href: "https://github.com/zpuckeridge/csgo-config",
    title: `CSGO Config`
  }, "CSGO ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_icons__WEBPACK_IMPORTED_MODULE_5__.ExternalLinkIcon, null))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListItem, null, "Minecraft"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListItem, null, "Overwatch"))))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Box, {
    marginTop: "2rem",
    marginBottom: "2rem"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Heading, {
    fontSize: "4xl"
  }, "Contact"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Flex, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Text, {
    direction: "row"
  }, "Feel free to shoot me an email over at:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Spacer, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Text, {
    fontWeight: "800"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Link, {
    align: "center",
    href: "mailto:hi@zacchary.me",
    color: "#75bcff",
    _hover: {
      textDecor: 'none',
      color: '#30ce56'
    }
  }, "hi@zacchary.me"), ' '))));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AboutPage);
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
//# sourceMappingURL=component---src-pages-about-js.js.map