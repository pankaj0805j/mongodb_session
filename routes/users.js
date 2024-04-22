var express = require('express');
var router = express.Router();
const userController = require("../controller/user.controller")

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/add_user',userController.addUser)

router.put('/update_user',userController.updateUser)

router.get('/get_users',userController.userList)

router.get('/get_users_projects',userController.userProjects)

router.get('/transaction',userController.userTransaction)

module.exports = router;