const express = require('express');
const app = express();
const querystring = require('querystring');
const bodyParser = require('body-parser');
let mongoose = require('mongoose');

const scopes = 'read_products';
const forwardingAddress = "http://6170a748.ngrok.io"; // R    eplace this with your HTTPS Forwarding address
mongoose.connect('mongodb://localhost/shopify');
let  cors = require('cors');

let Schema = mongoose.Schema;

// create a schema
var orderSchema = new Schema({
    id: String,
    contact_email: String,
    line_items: [
        {
            id: Number,
            variant_id: String,
            title: String,
            quantity: Number,
            price: String,
            sku: String,
            variant_title: String,
            vendor: String,
            fulfillment_service: String,
            product_id: Number,
            requires_shipping: Boolean,
            taxable: Boolean,
            gift_card: Boolean,
            name: String,
            variant_inventory_management: String,
            product_exists: Boolean,
            fulfillable_quantity: Number,
            grams: Number,
            total_discount: String,
        }
    ],
    customer: {
        id: Number,
        email: String,
        first_name: String,
        last_name: String,
        orders_count: Number,
        state: String,
        total_spent: String,
    }
})


let Order = mongoose.model('Order', orderSchema);
app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));



app.post('/order', (req, res) => {

    let order = new Order(req.body);
    order.save((err, doc) => {
        if (err) {
            console.log(err.message);
        }
        console.log(req.body);
        res.json({message: 'ok'}).status(200);
    });

});

app.get('/orders', (req, res) => {

    Order.find({}, function (err, docs) {
        if (err) {

            res.json(err).status(200);
        }
        else {
            res.json(docs).status(200);
        }

        // object of all the users
        //console.log(users);
    });

});



app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});

