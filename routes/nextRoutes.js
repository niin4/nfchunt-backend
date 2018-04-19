const routes = module.exports = require('next-routes')()

routes
.add('game')
.add('tag', '/tag/:id', '/tag')