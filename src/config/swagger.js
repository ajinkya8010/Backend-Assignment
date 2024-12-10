import swaggerJsDoc from 'swagger-jsdoc';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerOptions = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "User Management API",
        version: "1.0.0",
        description: "API documentation for the User Management backend project (Assignment)",
      },
      servers: [
        {
          url: "http://localhost:3001/api",
          description: "Development Server",
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
    schemas: {
        User: {
        type: 'object',
        properties: {
            id: {
            type: 'string',
            example: '63f1e432bf1d4f06e5a8e123',
        },
        username: {
          type: 'string',
          example: 'johndoe',
        },
        email: {
          type: 'string',
          example: 'johndoe@example.com',
        },
            role:{
                    type: 'string',
                    example: 'user',
                },
            },
        },
    },

      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
    apis: [
       path.join(__dirname, '../routes/*.js') 
     ],
  };


  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  console.log("Swagger API paths:", path.join(__dirname, '../routes/*.js'));
  
  export default swaggerDocs;
  

