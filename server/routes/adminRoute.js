let express = require('express');
let router = express.Router();
let auth = require('../middleware/auth')



let web = require("../services/web.service");


//router.post('/userList', auth.authenticateAdmin, user.userList);



module.exports = router;