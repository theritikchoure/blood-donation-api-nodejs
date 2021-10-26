const express = require('express');
const router = express.Router();
const apiUserList = require('../controllers/apiUserController/apiUserList'); // import all apiUser controller
const apiUserRegister = require('../controllers/apiUserController/apiUserRegister'); // import register apiUser controller
const apiUserLogin = require('../controllers/apiUserController/apiUserLogin'); // import register apiUser controller
const apiUserDelete = require('../controllers/apiUserController/apiUserDelete'); // import search donor controller

router.get('/', apiUserList);

router.post('/register', apiUserRegister);

router.post('/login', apiUserLogin);

router.delete('/delete/:id', apiUserDelete)

module.exports = router