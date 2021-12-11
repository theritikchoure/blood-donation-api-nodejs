const Joi = require('joi');
const Contact = require('../models/contactUs.model');

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email(),
  mobile: Joi.string().required().regex(/^[1-9][0-9]{9}$/),
  message: Joi.string().required(),
});

module.exports = {
    submitMessage, getAllMessages, getSingleMessage, deleteSingleMessage,
}

async function submitMessage(req) {
  message = await Joi.validate(req.body, contactSchema, { abortEarly: true });
  message = await new Contact(req.body).save();
  return message;
}

async function getAllMessages() {
    return await Contact.find();
}

async function getSingleMessage(req) {
    message = await Contact.findById(req.params.id);
    if(!message) return false
    return message
}

async function deleteSingleMessage(req) {
  isMessage = await Contact.findById(req.params.id);
  if(!isMessage) return false
  await isMessage.remove();
  return true;
}