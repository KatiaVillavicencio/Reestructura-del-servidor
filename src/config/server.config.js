import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import dontenv from "dotenv";


dontenv.config();

//const URI = "mongodb+srv://KatiaV:123@cluster0.y9v3q8o.mongodb.net/Ecommerce";

const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Base de datos conectada....");
    } catch (error) {
        console.log(error);
    }
};

export default connectToDB;


//Session//

export function configSession  () {
    return session({
        store: MongoStore.create({
            mongoUrl: process.env.URI,
            mongoOptions: {
                useNewUrlParser: true,
                useUnifiedTopology: true
            },
            ttl: 15
        }),
        secret: "ClaveSecreta",
        resave: false,
        saveUninitialized: false,
    });
}



