import 'dotenv/config'
const { stagingDbUrl, localDbUrl, DBNAME } = process.env;

let configs;
configs = {
    "LOCAL": {
        "dbUrl": `${localDbUrl}${DBNAME}`,

    },
    "STAGING": {
        "dbUrl": `${stagingDbUrl}${DBNAME}`,

    },
    "PRODUCTION": {
        "dbUrl": `${stagingDbUrl}${DBNAME}`,

    },
};

let env = process.env.NODE_ENV || "LOCAL";
configs = configs[env];
console.log(configs)

let { dbUrl } = configs;
export { dbUrl };
