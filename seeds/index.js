const mongoose = require("mongoose");
const Campground = require("../models/campground");
const { places, descriptors } = require("./seedHelpers");
const cities = require("./cities");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //USER ID
            author: "61d0eeSe5eb1c2013e5afcaca",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description:
                "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vitae excepturi, iure delectus autem voluptatem facere maxime eum inventore eligendi optio aliquid exercitationem illum alias? Laboriosam perspiciatis magnam modi ea quaerat?",
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ],
            },
            image: [
                {
                    url: "https://res.cloudinary.com/dyr50c85v/image/upload/v1641561799/YelpCamp/px2lv9butjgzyu4omtpk.jpg",
                    filename: "YelpCamp/px2lv9butjgzyu4omtpk",
                },
                {
                    url: "https://res.cloudinary.com/dyr50c85v/image/upload/v1641561799/YelpCamp/uxlttmaprkxqkhcelgzj.jpg",
                    filename: "YelpCamp/uxlttmaprkxqkhcelgzj",
                },
            ],
        });
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
});
