import jwt from 'jsonwebtoken'

 export function generateAndSetToken (res,email,password) {
    const token = jwt.sign ({email,password,role: "user"},PRIVATE_KEY_JWT,{expiresIn:"24h"});
    res.cookie("token",token, { httpOnly: true, maxAge: 60 * 60 * 1000 });
    return token
 }

 

