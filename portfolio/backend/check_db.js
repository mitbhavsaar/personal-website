const mongoose = require('mongoose');
const Contact = require('./models/Contact');
require('dotenv').config();

async function checkDb() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to DB");
        const contacts = await Contact.find().sort({ createdAt: -1 }).limit(1);
        console.log("Latest Contact:", contacts);
    } catch (err) {
        console.error(err);
    } finally {
        await mongoose.disconnect();
    }
}

checkDb();
