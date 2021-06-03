const { Schema } = require("mongoose");
const { Order, ProductCart } = require("../models/order")

exports.getOrderById = (req,res,next,id) => {
    Order.findById(id)
    .populate("products.product","name price")
    .exec((err,order) => {
        if(err){
            return res.status(400).json({
                error:"No Order Found in DB"
            })
        }
        req.order = order;
        next()
    })
}

// Create Order
exports.createOrder = (req,res) => {
    req.body.order.user = req.profile;
    const order = new Order(req.body.order)
    order.save((err,order) => {
        if(err){
            return res.status(400).json({
                error:"Failed to Save your Order in DB"
            });
        }
        res.json(order)
    });
}

exports.getAllOrders = (req,res) =>{
    Order.find()
        .populate("user","_id name")
        .exec((err,order) => {
            if(err){
                return res.status(400).json({
                    "error":"No Orders Found in DB"
                })
            }
            res.json(order)
        })
}

exports.getOrderStatus = (req,res) =>{
    res.json(Order.Schema.path("status").enumValues);
}

exports.updateStatus = (req,res) =>{
    Order.update[
        {_id: req.body.orderId},
        {$set: {status: req.body.status}},
        (err,order) => {
            if(err){
                return res.status(400).json({
                    error:"Cannot Update order status"
                })
            }
            res.json(order)
        }
    ]
}
