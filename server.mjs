import express from "express";
import path from "path";
import cors from "cors";
import authApis from './apis/AuthAPI.mjs';
import productApis from './apis/Product.mjs'
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';


const app = express();
const SECRET = process.env.SECRET || "somesecret";
const port = process.env.PORT || 5000;


app.use(cookieParser());
app.use(express.json());

app.use(cors({
    origin: ['http://localhost:3000', "*"],
    credentials: true
}));






app.use('/api/v1', authApis)


app.use((req, res, next) => {

  if (!req?.cookies?.Token) {
    res.status(401).send({
      message: "include http-only credentials with every request"
    })
    return;
  }
  jwt.verify(req.cookies.Token, SECRET, function (error, decodedData) {
    if (!error) {
      const nowDate = new Date().getTime() / 1000;
      if (decodedData.exp < nowDate) {
        res.cookie('Token', '', {
          maxAge: 1,
          httpOnly: true
        })
        res.send({ message: "token expired" })
      } else {
        console.log("token approved");
        req.body.token = decodedData
        next();
      }
    } else {
      res.status(401).send("invalid token")
    }
  })

})


app.use('/api/v1', productApis)


const __dirname = path.resolve();

app.use('/', express.static(path.join(__dirname, './web/build')))
app.use('*', express.static(path.join(__dirname, './web/build')))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});



