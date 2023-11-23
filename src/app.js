import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import session from "express-session";
import MongoStore from "connect-mongo";
import cookieParser from 'cookie-parser';
import passport from 'passport';

import connectToDB, { configSession } from "./config/server.config.js"
import {__dirname, authorization, passportCall} from "./utils.js"
import initializePassword from './config/passport.config.js';

//routes
import routerP from './routers/products.router.js';
import routerC from './routers/carts.router.js';
import routerV from './routers/views.router.js';
import userRouter from './routers/user.router.js';

//socket.io
import socketProducts from "./listeners/socketProducts.js"
import socketChat from './listeners/socketChat.js';

//Jwt/
 
import {generateAndSetToken} from "./config/token.config.js"
import { Strategy as JwtStrategy } from 'passport-jwt';
import { ExtractJwt as ExtractJwt } from 'passport-jwt';

import UserManager from './dao/classes/userManagerMongo.js';
import CartManager from './dao/classes/cartManagerMongo.js';

const app = express();
const PORT = process.env.PORT || 8080

app.use(express.static(__dirname+"/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

//estructura de handlebars
app.engine("handlebars",handlebars.engine())
app.set('view engine', 'handlebars');
app.set("views",__dirname+"/views")

//connect 
connectToDB();

const httpServer=app.listen(PORT,()=>{
    console.log(`server escuchandoooo en ${PORT}`)
})
 const users = new UserManager
 const carts = new CartManager

//connect session login//
app.use (configSession);

//JWT//

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:process.env.PRIVATE_KEY_JWT
}

passport.use (
    new JwtStrategy 

(jwtOptions, (jwt_payload, done)=>{
    const user= user.findJWT((user) => user.email===jwt_payload.email)
    if (!user)
    {
        return done (null,false, {message: "Usuario no encontrado"})
}
return done(null,user)
})
)

//Middleware passport
initializePassword();
app.use (passport.initialize());
app.use (passport.session());

//rutas
app.use('/api/products', routerP)
app.use('/api/carts', routerC)
app.use('/', routerV);
app.use('/api/sessions',userRouter)

//socket server
const socketServer = new Server(httpServer)
socketProducts(socketServer)
socketChat(socketServer)

//Products view y login session//

//Ingreso Products  http:localhost:8080/products

app.get("/products", async (req, res) => {
    if (!req.session.emailUsuario) 
    {
        return res.redirect("/login")
    }
    let allProducts  = await product.getProducts()
    allProducts = allProducts.map(product => product.toJSON());
    res.render("viewProducts", {
        title: "Vista Productos",
        products : allProducts,
        email: req.session.emailUsuario,
        rol: req.session.rolUsuario,
        algo: req.session.algo,
    });
})
app.get("/carts/:cid", async (req, res) => {
    let id = req.params.cid
    let allCarts  = await carts.getCartWithProducts(id)
    res.render("viewCart", {
        title: "Vista Carro",
        carts : allCarts
    });
})

//POST//

//autenticacion
app.post("/login", async (req, res) => {
const {email, password}= req.body;
const emailTofind = email;
const user = await users.findEmail ({email: emailTofind});

if (!user || user.password !== password){
    return res.status(401).json ({message: " error al autentificar"})
}
//// import token from ./config/token.config.js

const token = generateAndSetToken (res,email,password);
res.json ({token,user:{email: user.email, rol: user.rol }});
  
});

app.post("/api/register",async(req,res)=>{
    const {first_name, last_name, email, age, password, rol}= req.body
    const emailTofind = email;
    const exists = await usersModel.findEmail ({email:emailTofind})
    if (exists) return res.status(400).send ({stattus:"error", error: "usuario ya existe"})
    const newUser= {
first_name,last_name, email, age, password, cart: carts.addCart(), rol};
usersModel.addUser (newUser)
const token = generateAndSetToken (res,email,password)
res.send ({token})

});


//GET//

/*//Ingreso Register http://localhost:8080/register
app.get("/register", async (req, res) => { 
    res.render("register", {
        title: "Vista Register",
    });
})
//Ingreso Profile http://localhost:8080/profile
app.get("/profile", async (req, res) => { 
    if (!req.session.emailUsuario) 
    {
        return res.redirect("/login")
    }
    res.render("profile", {
        title: "Vista Profile Admin",
        first_name: req.session.nomUsuario,
        last_name: req.session.apeUsuario,
        email: req.session.emailUsuario,
        rol: req.session.rolUsuario,

    });
})*/

app.get ('/', (req, res) => {
    res.sendFile ('html/index.html',{root: app.get ("views") });
});
app.get('/register', (req, res) => {
    res.sendFile ('html/register.html',{root: app.get ("views") });
});
app.get('/current', passportCall ('jwt'), authorization ('user'), (req, res) => {
    res.sendFile ('html/home.html',{root: app.get ("views") });
});