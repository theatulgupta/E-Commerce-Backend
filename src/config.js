export const server = {
  port: process.env.PORT || 5000,
};

export const database = {
  connectionUri: process.env.DB_CONNECTION_URI,
  name: process.env.DB_NAME || 'default_database',
};
