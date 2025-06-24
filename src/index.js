
import { Router } from "@fastly/expressly";
import Handlebars from "handlebars";
const codes = require("./codes.json");

const router = new Router();

router.use((req, res) => {
  res.headers.set("x-powered-by", "expressly");
});

var source = `<html lang="en">
  <head>

    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="https://glitch.com/favicon.ico" />
    <meta
      name="description"
      content="An app for learning about status codes!"
    />
    <meta
      name="og:description"
      content="An app for learning about status codes!"
    />
    <meta property="og:title" content="HTTP Keanu ({{{status}}} {{{name}}})" />
    <meta property="og:image" content="{{{img}}}" />

    <title>HTTP Keanu ({{{status}}} {{{name}}})</title>

    <style>
/******************************************************************************
START Glitch hello-app default styles

The styles in this section do some minimal CSS resets, set default fonts and 
colors, and handle the layout for our footer and "Remix on Glitch" button. If
you're new to CSS they may seem a little complicated, but you can scroll down
to this section's matching END comment to see page-specific styles.
******************************************************************************/

/* 
  The style rules specify elements by type and by attributes such as class and ID
  Each section indicates an element or elements, then lists the style properties to apply
  See if you can cross-reference the rules in this file with the elements in index.html
*/

/* Our default values set as CSS variables */
:root {
  --color-bg: aqua;
  --color-text-main: #000000;
  --color-primary: #ffff00;
  --color-header: fuchsia;
  --color-title: navy;
  --wrapper-height: 87vh;
  --image-max-width: 300px;
  --image-margin: 3rem;
  /* Fonts for different elements */
  --font-family: sans-serif;
  --font-family-header: sans-serif;
  --font-family-list: monospace;
}

/* Basic page style resets */
* {
  box-sizing: border-box;
}
[hidden] {
  display: none !important;
}

/* Our remix on glitch button */
.btn--remix {
  font-family: Menlo, Consolas, Monaco, "Lucida Console", monospace;
  padding: 0.75rem 1rem;
  font-size: 1.1rem;
  line-height: 1rem;
  font-weight: 500;
  height: 2.75rem;
  align-items: center;
  cursor: pointer;
  background: #ffffff;
  border: 1px solid #000000;
  box-sizing: border-box;
  border-radius: 4px;
  text-decoration: none;
  color: #000;
  white-space: nowrap;
  margin-left: auto;
}
.btn--remix img {
  margin-right: 0.5rem;
}
.btn--remix:hover {
  background-color: #d0fff1;
}

/* Navigation grid */
.footer {
  display: flex;
  justify-content: space-between;
  padding: 1rem 1rem 0.75rem 0;
  width: 100%;
  flex-wrap: wrap;
}

.footer a:not(.btn--remix):link,
a:not(.btn--remix):visited {
  font-style: normal;
  font-weight: normal;
  font-size: 1.1rem;
  color: #000;
  text-decoration: none;
  border-style: none;
}
.footer a:hover {
  background: var(--color-primary);
}

/******************************************************************************
END Glitch hello-app default styles
******************************************************************************/

body {
  font-family: var(--font-family);
  background-color: var(--color-bg);
  margin:0.1rem;
}

/* Page structure */
.wrapper {
  min-height: var(--wrapper-height);
  display: grid;
}
.content {
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
}

/* Very light scaling for our illustration */
h1 {
  color: var(--color-title);
  margin: 0;
  padding-left: 0.5rem;
  padding-top: 0.5rem;
}

/* Button - Add it from the README instructions */
button,
input {
  font-family: inherit;
  font-size: 100%;
  background: #ffffff;
  border: 1px solid #000000;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  transition: 500ms;
}

/* Subheading */
h2 {
  color: var(--color-header);
}
h2,
h3 {
  padding: 0;
  margin-top:0.5rem;
  margin-bottom:0.5rem;
}

/* Interactive image */
.illustration:active {
  transform: translateY(5px);
}

.code, #joker {
  border: 3px solid white;
  margin: 0.5rem;
  margin-right: 1rem;
  padding: 0.5rem;
  background: #ffffff;
  display:inline;
}
.codes {
  display: flex;
  flex-wrap: wrap;
  margin: auto;
}
.code .imghold {
  width: 20rem;
  height: 15rem;
}

.code img {
  height:100%;
  width:100%;
  object-fit:cover;
}
p.intro {
  background:yellow;
  padding:0.5rem 1rem 0.5rem 1rem;
}
p.random {
  padding:0.5rem 1rem 0.5rem 1rem;
  margin-top:0;
  text-align:right;
}
p.random a:link, p.random a:hover, p.random a:visited {
  background:white;
  padding:0.3rem;
}
.highlight {
  border: 3px solid lime;
  margin: 0.2rem;
  padding: 0.5rem;

  background: #ffffff;
  display:inline;
}
.highlight img, #joker img {
  width:90vw;
  max-width:40rem;
}
h1 a:link, h1 a:hover, h1 a:visited {
  text-decoration:none;
  color: var(--color-title);
}
#bonus {
  margin-left:1rem;
}
div [id^="code1"] {
  border-color:blue;
}
div [id^="code2"] {
  border-color:lime;
}
div [id^="code3"] {
  border-color:yellow;
}
div [id^="code4"] {
  border-color:orange;
}
div [id^="code5"] {
  border-color:red;
}
  </style>

  </head>
  <body>
    <div class="wrapper">
      <div class="content" role="main">
        <h1><a href="/">HTTP Keanu</a></h1>

        <p class="intro">
          A fun way to learn about status codes, inspired by
          <a href="https://http.cat">http.cat</a>!
        </p>
        <p class="random">
          🎲
          <a href="?code=-1">Choose a random code</a>
        </p>

        <div class="codes">
          {{#if selected}}
            <div class="highlight selected" id="code{{{code}}}">

              <h2>{{code}}</h2>
              <h3>{{name}}</h3>
              <div class="imghold">
                <img src="{{pic}}" alt="{{alt}}" />
              </div>

              <div class="extra">
                <p>{{info}}</p>
                {{#if joker}}
                  <a
                    href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/"
                  >HTTP status codes on MDN</a>
                {{else}}
                  <a
                    href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/{{{code}}}"
                  >{{code}} on MDN</a>
                {{/if}}
              </div>
            </div>
          {{else}}
            {{#each list}}
              <div class="code" id="code{{{code}}}">

                <h2>{{code}}</h2>
                <h3>{{name}}</h3>
                <div class="imghold">
                  <a href="?code={{{code}}}"><img
                      src="{{pic}}"
                      alt="{{alt}}" 
                    /></a>
                </div>
              </div>
            {{/each}}
          {{/if}}
        </div>
        <p id="bonus">
          Bonus: try selecting an invalid code, like
          <a href="?code=1000">1000</a>
        </p>
      </div>
      <footer class="footer">
        <a
          class="btn--remix"
          target="_top"
          href="https://github.com/SueSmith/keanu-codes"
        >
          🚧 Fork on GitHub
        </a>
      </footer>
    </div>

  </body>
</html>`;
let template = Handlebars.compile(source);

router.get("/", async (req, res) => {
  let params = {};

  if (req.query.get('code') == undefined) {
    params = codes;
    params.img =
      "https://keanustatus.edgecompute.app/thankeanu.jpg";
    params.status = "";
  } else {
    params.selected = true;
    let found;
    if (req.query.get('code') < 0) {
      found = codes.list[Math.floor(Math.random() * codes.list.length)];
      res.headers.set("Surrogate-Control", "max-age=0");
    } else
      found = codes.list.find((element) => element.code == req.query.get('code'));
    if (found) {
      params.code = found.code;
      params.name = found.name;
      params.pic = found.pic;
      params.info = found.info;
      params.alt = found.alt;
      params.img = found.pic;
      params.status = found.code;
    } else {
      params.joker = true;
      params.code = 0;
      params.name = "WELP";
      params.pic =
        "https://keanustatus.edgecompute.app/keanu.jpg";
      params.info = "Whoops! This one isn't on the list.";
      params.alt = "Keanu holding his hands up";
      params.img = params.pic;
      params.status = 0;
    }
  }
  let data = params;
  let result = template(data);

  return res.html(result);
});

router.listen();
