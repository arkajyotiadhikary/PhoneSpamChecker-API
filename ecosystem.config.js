module.exports = {
      apps: [
            {
                  name: "my-express-app",
                  script: "./dist/index.js", // Point to the compiled JavaScript file
                  env: {
                        NODE_ENV: "development",
                        // Ensure DATABASE_URL is available
                        DATABASE_URL: process.env.DATABASE_URL,
                  },
                  env_production: {
                        NODE_ENV: "production",
                        // Ensure DATABASE_URL is available
                        DATABASE_URL: process.env.DATABASE_URL,
                  },
            },
      ],
};
