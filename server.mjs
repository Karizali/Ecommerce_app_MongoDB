import express from "express";
import path from "path";
import cors from "cors";
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt';



const app = express();
const port = process.env.PORT || 5000;
const mongoBDURI = process.env.mongoBDURI || "mongodb+srv://karizali:karizali@cluster0.x5dqfzd.mongodb.net/Ecommerce?retryWrites=true&w=majority";
app.use(cors());
app.use(express.json());

const __dirname = path.resolve();

// const products = [];

let productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: Number,
  description: String,
  createdOn: { type: Date, default: Date.now }
});
const productModel = mongoose.model('products', productSchema);





app.post("/signup", async (req, res) => {
  const body = req.body;

  if (
    !body.firstName ||
    !body.email ||
    !body.password ||
    !body.secondName) {

    res.status(404).send({
      message: "Incomplete data"
    });
    return;
  }

  const myPlaintextPassword = body.password;

  try {

    const saltRounds = await bcrypt.genSalt()
    console.log(saltRounds)
    let hash = await bcrypt.hash(myPlaintextPassword, saltRounds);
    console.log(hash);
    res.status(404).send({
      message: `Hash is :${hash}`
    });

  }catch(error){
    console.log(error)
    res.status(404).send({
      message: "Error in hash"
    });
  }


});

app.post("/login", (req, res) => {
  const body = req.body;
  if (!body.name || !body.description || !body.price) {
    res.status(404).send({
      message: "Incomplete data"
    });
    return;
  }

  try {
    productModel.create({
      name: body.name,
      price: body.price,
      description: body.description,
    })
    res.send({
      message: "product added successfully"
    });
  } catch (error) {
    res.status(500).send({
      message: "server error"
    })
  }


});





app.get("/products", async (req, res) => {

  try {
    let data = await productModel.find({});

    res.send({
      message: "got all products successfully",
      data: data
    })

  } catch (error) {
    res.status(500).send({
      message: "server error"
    })
  }


});


app.post("/product", (req, res) => {
  const body = req.body;
  if (!body.name || !body.description || !body.price) {
    res.status(404).send({
      message: "Incomplete data"
    });
    return;
  }

  try {
    productModel.create({
      name: body.name,
      price: body.price,
      description: body.description,
    })
    res.send({
      message: "product added successfully"
    });
  } catch (error) {
    res.status(500).send({
      message: "server error"
    })
  }


});


app.get("/product/:id", (req, res) => {
  const id = req.params.id;


  try {
    let data = productModel.findOne({ _id: id }).exec();

    if (data) {
      res.send({
        message: `get product by id: ${data._id} success`,
        data: data
      });
    } else {
      res.status(404).send({
        message: "product not found",
      })
    }
  } catch (error) {
    res.status(500).send({
      message: "server error"
    })
  }

});

app.delete("/product/:id", (req, res) => {
  const id = req.params.id;
  console.log(id)
  try {
    const deletedData = productModel.deleteOne({ _id: id }).exec();

    if (deletedData.deletedCount !== 0) {
      res.send({
        message: "Product has been deleted successfully",
      })
    } else {
      res.status(404);
      res.send({
        message: "No Product found with this id: " + id,
      });
    }

  } catch (error) {
    res.status(500).send({
      message: "server error"
    })
  }



});

app.put("/product/:id", async (req, res) => {
  const body = req.body;
  const id = req.params.id;
  console.log("sever ", id)
  console.log("sever ", body)
  let product;

  if (!body.name || !body.description || !body.price) {
    res.status(400).send(` required parameter missing. example request body:
        {
            "name": "value",
            "price": "value",
            "description": "value"
        }`)
    return;
  }

  try {
    let data = await productModel.findByIdAndUpdate(id,
      {
        name: body.name,
        price: body.price,
        description: body.description
      },
      { new: true }
    ).exec();

    console.log('updated: ', data);

    res.send({
      message: "product modified successfully"
    });

  } catch (error) {
    res.status(500).send({
      message: "server error"
    })
  }

});




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

/////////////////////////////////////////////////////////////////////////////////////////////////
mongoose.connect(mongoBDURI);

////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on('connected', function () {   //connected Check 
  console.log("Mongoose is connected");
});

mongoose.connection.on('disconnected', function () {   //disconnected Check
  console.log("Mongoose is disconnected");
  process.exit(1);
});

mongoose.connection.on('error', function (err) {//any error
  console.log('Mongoose connection error: ', err);
  process.exit(1);
});

process.on('SIGINT', function () {/////this function will run jst before app is closing
  console.log("app is terminating");
  mongoose.connection.close(function () {
    console.log('Mongoose default connection closed');
    process.exit(0);
  });
});
////////////////mongodb connected disconnected events///////////////////////////////////////////////
