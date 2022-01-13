import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'REST API for my App', // Title of the documentation
    version: '1.0.0', // Version of the app
    description: 'This is the REST API for my product 123123', // short description of the app
  },
  host: 'localhost:8080', // the host or url of the app
  basePath: '/api/v1', // the basepath of your endpoint
  components: {
    securitySchemes: {
      bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
    },
  },
  security: [{ bearerAuth: [] }],
};

export default swaggerJSDoc({
  swaggerDefinition,
  apis: ['./src/api-docs/*.yaml'],
});
