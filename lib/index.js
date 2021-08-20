
var include = require('./include')(hexo);

hexo.extend.tag.register('Vinclude', include, {ends: false});
hexo.extend.tag.register('vinclude', include, {ends: false});
