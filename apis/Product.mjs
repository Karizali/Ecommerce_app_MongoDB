import express from "express";
import { productModel } from '../dbRepo/Models.mjs';
import mongoose from "mongoose";



const router = express.Router()

router.get("/products", async (req, res) => {
    const userId = req.body.token._id;
    try {
        let data = await productModel.find({ owner: userId });

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


router.post("/product", (req, res) => {
    const body = req.body;
    // console.log("_id "+body.token._id)
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
            owner: body.token._id
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


router.get("/product/:id", (req, res) => {
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

router.delete("/product/:id", (req, res) => {
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

router.put("/product/:id", async (req, res) => {
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

export default router;