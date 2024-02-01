export const DATABASE_CONFIG = {
    host: process.env.MSSQL_HOST || 'localhost',
    port: parseInt(process.env.MSSQL_PORT, 10) || 1433,
    username: process.env.MSSQL_USERNAME || 'default_username',
    password: process.env.MSSQL_PASSWORD || 'default_password',
    database: process.env.MSSQL_DATABASE || 'default_database',
};

export const NODE_ENV = process.env.NODE_ENV || 'development';
