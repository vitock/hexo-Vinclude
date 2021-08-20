
var include = require('./include')(hexo);

hexo.extend.tag.register('Vinclude', include, {ends: false});
