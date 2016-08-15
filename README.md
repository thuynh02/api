# SweetSkills API
 - Koa for serving files and data
   * Koa uses a .env file located at the root directory to store the secret key (backup in honey-badger-data bucket)
 - Auth0 generates a JWT(Java Web Tokens) and returns it to the client's browser
   * The JWT is attahed to each request sent from browser to server
   * The JWT is associated with our secret key stored on the server
   * Secret key is used to authenticate requests as originating from a logged in user
