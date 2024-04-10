var debug = require('debug')('my-application')
var app = require('../app')

app.set('port', 3000)

var server = app.listen(process.env.PORT || app.get('port'), function() {
  console.log('Express server listening on ' + server.address().address)
})