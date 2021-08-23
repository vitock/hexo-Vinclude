
var include = require('./include')(hexo);

hexo.extend.tag.register('Vinclude', include, {ends: false,async:true});
hexo.extend.tag.register('vinclude', include, {ends: false,async:true});
