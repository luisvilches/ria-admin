const router = require('express').Router();
const body = require('connect-multiparty')();
const fs = require('fs');
const path = require('path');
const ctrl = require('../controllers');

router.get("/", function(req,res){res.json({message:"API Rest for Ria!!"})});
router.post('/login', body, ctrl.auth.auth);
router.get('/divisas', ctrl.divisas.get);
router.post('/create/super/user/admin', body, ctrl.users.createSuperUser);

module.exports = router;