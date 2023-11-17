
import dotenv from 'dotenv';

dotenv.config();

export default {
 URI:process.env.URI,
 PORT : process.env.PORT,
 PRIVATE_KEY_JWT: process.env.PRIVATE_KEY_JWT,
 KEY_TOKEN: process.env.KEY_TOKEN
};