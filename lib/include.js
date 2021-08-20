 'use strict';

 const fs = require('fs');

 module.exports = ctx => function(args, content) {
   
   var filePath = args[0];
   var fileContent = '';
   try {
    fileContent = fs.readFileSync(filePath).toString();
   } catch (error) {
   }
   
   if (fileContent) {
    fileContent = `\`\`\` ${args[1] || "" }\n${fileContent}\n\`\`\``;
    return  ctx.render.renderSync({ text: fileContent, engine: 'markdown' })
   }else{
     return '';
   }
 };
 