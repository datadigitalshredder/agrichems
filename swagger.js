const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Agricultural Solutions',
    description: 'Pesticides - Crop Protection Agents',
  },
  host: 'pesticides.onrender.com',
  schemes: ['https'],
  // Document details...
  // security: {
  //   oauth2: {
  //     type: "oauth2",
  //     flows: {
  //       implicit: {
  //         authorizationUrl: process.env.ISSUER_URL,
  //         scopes: {
  //           read: "Grants read access",
  //           write: "Grants write access"
  //         }
  //       }
  //     }
  //   }
  // },
  securityDefinitions: {
    google_oauth: { 
      type: "oauth2",
      flow: "implicit",
      authorizationUrl: "https://accounts.google.com/o/oauth2/v2/auth",
      tokenUrl: "https://www.googleapis.com/oauth2/v4/token",
      scopes: {
        "https://www.googleapis.com/auth/userinfo.profile": "All user operations requiring authentication.",
        // read: "Grants read access",
        // write: "Grants write access"
      }
    }
  },
  // More document details...
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);