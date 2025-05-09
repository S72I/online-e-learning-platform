// import { NextRequest } from "next/server";

// const jwt = require("jsonwebtoken");

// export const validWebToken = async (req: NextRequest, next: NextRequest) => {
//   let token;
//   let authHeader = req.headers.authorization || req.headers.Authorization;

//   if (authHeader && authHeader.startsWith("Bearer")) {
//     token = authHeader.split(" ")[1];

//     jwt.verify(token, process.env.ACCESS_TOKEN_SECERT, (err: any, decode: any) => {
//       if (err) {
//         res.status(401);
//         res.json({ err: "user is not Authorized" });
//       }
//       req.user = decode.user;

//       next();
//     });
//     if (!token) {
//       res.status(400);
//       res.json({ err: "Token is invalid try again" });
//     }
//   }
// };
