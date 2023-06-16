import dotenv from 'dotenv';

dotenv.config();

export default {
    port: process.env.PORT || 5000,
    dbURL: process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/PAI',
    JWTPRIVATEKEY: process.env.JWTPRIVATEKEY || 'testkey123',
    WCATOKEM: process.env.WCATOKEM || 'Bearer'
}