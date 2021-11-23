const Donor = require("./models/donor");
const ErrorHandler = require("./utils/errorhandler");
const catchAsyncError = require("./middleware/catchAsyncError");

const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TELEGRAM_BOT_TOKEN;

const bot = new TelegramBot(token, {polling: true});

bot.on('message', catchAsyncError(async (message) => {
    console.log(message.text);
    console.log(message.from.id);
    console.log(message)

    if(message.text === '/start')
    {
        console.log('message Recieve')
        const sendText = "Welcome To BloodBuddies, \n\nThis is an non-profite initiative in order to help patients to find right donor at right. \n\nIf you want to find donor, just hit on the below link - \n/donor"
        bot.sendMessage(message.from.id, sendText).catch((error) => {
            console.log(error);
        })
    }
    else
    {
        const sendText = "Please hit on the below link - \n/start"
        bot.sendMessage(message.from.id, sendText).catch((error) => {
            console.log(error);
        })
    }

    const json_data = await Donor.find().limit(2);

    // const text = donors.name;

    var result = [];

    // for(var i in json_data)
    // {
    //     // result.push([i, json_data [i].status]);
    //     const name = json_data[i].name;
    //     const mobile = json_data[i].mobile;

    //     const message = `You can contact with below donor - \n Name :- ${name} \n Mobile :- ${mobile}`;
    //     console.log(message);

    //     bot.sendMessage(chatId, message).catch((error) => {
    //         console.log(error);
    //     })
    // }

    // // send a message to the chat acknowledging receipt of their message
    // bot.sendMessage(chatId, "test").catch((error) => {
    //     console.log(error);
    // })
}));