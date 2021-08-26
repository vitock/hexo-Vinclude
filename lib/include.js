'use strict';

const fs = require('fs');
const { basename, extname, join } = require('path');

// Lazy require highlight.js & prismjs
let highlight, prismHighlight;

/**
* Include code tag
*
* Syntax:
*   {% vinclude path/to/file javascript title %}
*/

function exists(path){
  return new Promise((r,j)=>{
    fs.access(path,(err)=>{
      if(err){
        r(false);
        return;
      }else{
        r(true);
      }

    })
  })

}

module.exports = ctx => function includeCodeTag(args) {
  let codeDir = ctx.config.code_dir;
  var path = args[0];

  // Add trailing slash to codeDir
  if (!codeDir.endsWith('/')) codeDir += '/';

  let lang = args[1]

  // If the language is not defined, use file extension instead
  lang = lang || extname(path).substring(1);

  const src = join(codeDir, path);
  console.log(src);

  // If the title is not defined, use file name instead
  const title = args[2] || basename(path);
  const caption =  args[3] == '0' ? undefined :  `<span>${title}</span><a href="/${ctx.config.static_dir}/${path}">view raw</a>` 
  console.log(path,title,caption);
 
  const hljsCfg = ctx.config.highlight || {};
  const prismjsCfg = ctx.config.prismjs || {};

  const hljsOptions = {
    lang,
    caption,
    gutter: hljsCfg.line_number,
    hljs: hljsCfg.hljs,
    tab: hljsCfg.tab_replace
  };

  const prismjsOptions = {
    lang,
    caption,
    lineNumber: prismjsCfg.line_number,
    tab: prismjsCfg.tab_replace,
    isPreprocess: prismjsCfg.preprocess
  };
  return exists(src).then(exist => {
    if (exist) {
      return fs.readFileSync(src).toString();
    }
    else {
      throw `>>>>>>>>>>>>>> ${path} not exist`
    }
    
  }).then(code => {
    if (!code) return;


    const lines = code.split('\n');
    code = lines.slice(0).join('\n').trim();
    if (prismjsCfg.enable) {
      if (!prismHighlight) prismHighlight = require('hexo-util').prismHighlight;

      return prismHighlight(code, prismjsOptions);
    } else if (hljsCfg.enable) {
      if (!highlight) highlight = require('hexo-util').highlight;


      var r = highlight(code, hljsOptions);
      console.log(path);
      return r ;
    }

    return `<pre><code>${code}</code></pre>`;
  });
};
