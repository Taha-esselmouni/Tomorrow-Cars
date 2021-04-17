const Order = require('../models/order');
const Car = require('../models/Car');
const User = require('../models/User');
const config = require('config');
// const stripe = require('stripe')(config.get('StripeAPIKey'));

module.exports.get_orders = async (req,res) => {
    const userId = req.params.id;
    Order.find({userId}).sort({date:-1}).then(orders => res.json(orders));
}

module.exports.checkout = async (req,res) => {
    try{
        const userId = req.params.id;
        const {source} = req.body;
        let car = await car.findOne({userId});
        let user = await User.findOne({_id: userId});
        const email = user.email;
        if(car){
            const charge = await stripe.charges.create({
                amount: car.bill,
                currency: 'inr',
                source: source,
                receipt_email: email
            })
            if(!charge) throw Error('Payment failed');
            if(charge){
                const order = await Order.create({
                    userId,
                    items: car.items,
                    bill: car.bill
                });
                const data = await car.findByIdAndDelete({_id:car.id});
                return res.status(201).send(order);
            }
        }
        else{
            res.status(500).send("You do not have items in car");
        }
    }
    catch(err){
        console.log(err);
        res.status(500).send("Something went wrong");
    }
}