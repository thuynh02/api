# SweetSkills API
 - Koa for authorized interactions with database
 - Secret key and database configuration stored as environment variables on server
 - Auth0 generates a JWT(Java Web Token) and returns it to the client's browser
   * The JWT is attached to each request sent from browser to server
   * The JWT is associated with our secret key stored on the server
   * Secret key is used to authenticate requests as originating from a logged in user
