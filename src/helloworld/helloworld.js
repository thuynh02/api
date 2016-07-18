var koa = require('koa');
var app = koa();
const port = 80;

app.use(function *(){
  this.body = 'Hello World';
});

app.listen(port);

console.log('Ready to say hello on port %s', port);