

 const fs = require('fs');

 module.exports = ctx => function(args, content) {
   
   var filePath = args[0];
   var fileContent = '';
   try {
    fileContent = fs.readFileSync(filePath).toString();
   } catch (error) {
     console.log('\033[1;31;49m %s \033[0m？',`${filePath} does not exesist`)
     throw error;
   }
   
   if (fileContent) {
    fileContent = `\n\`\`\` ${args[1] || "" }\n${fileContent}\n\`\`\``;
    return  ctx.render.renderSync({ text: fileContent, engine: 'markdown' })
   }else{
     return '';
   }
 };
 