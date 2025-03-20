const Router = require('express');
const router = new Router();
const controller = require('./authController');

router.post('/registration', controller.registration)
router.post('/log' , controller.login)
router.get('/users' , controller.getUsers)

module.exports = router