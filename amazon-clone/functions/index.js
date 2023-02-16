const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("sk_test_51MXK7MSBcfII8Leuu4k3chkwhx7976nCij5Yf9cFmRTNqNwWz1NcaOCs3FbozaP4vS84vIgbvOPjQaIOAIgZ6Yea009kuDdioG");


//APP CONFIG
const app = express();
// middlewares
app.use(cors({origin: true}))
app.use(express.json());

// api routes
app.get("/",function(req,res){
    res.send("hello world");
})
app.post("/payments/create",async(req,res)=>{
    const total= req.query.total;

    console.log("payment received for this amount >> ",total);
    const paymentIntent = await stripe.paymentIntents.create({
        amount : total,
        currency : "usd",
    })
    
    res.status(201).send({
        clientsecret : paymentIntent.client_secret
    })
})

//listen
exports.api = functions.https.onRequest(app)


