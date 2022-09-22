const swagger = require('swagger-autogen');
const swaggerGenerator = swagger();

swaggerGenerator('./public/swagger.json', ['./server.js']);
