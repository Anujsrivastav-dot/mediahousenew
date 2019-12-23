// const db = require("../dbConnection/dao");
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var counter = new Schema({
    vendorSeq: {
        type: Number

    },
    customerSeq: {
        type: Number

    },
    orderSeq: {
        type: Number

    }
}, {
    timestamps: true
});

var data = mongoose.model('counter', counter, 'counter');


async function inIt() {
    var success = await data.findOne({});
    if (!success) {
        var obj = {
            vendorSeq: 1000,
            customerSeq: 10000,
            orderSeq: 1
        };
        var count = new data(obj);
        saveSeqNumber = await count.save();
        if (saveSeqNumber) {
            console.log("seq number saved");
        } else {
            console.log("something went wrong !");
        }
    }
}

inIt();

module.exports = data;