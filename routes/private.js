const router = require('express').Router();
const ctrl = require("../controllers");

//users
router.get("/user/:id",ctrl.users.user);
router.get("/users",ctrl.users.userAll);
router.delete("/user/:id",ctrl.users.delete);
router.post('/user/create', ctrl.users.createUser);
// divisas
router.get('/divisas', ctrl.divisas.get);
router.post('/divisas', ctrl.divisas.post);
router.put('/divisas/:id', ctrl.divisas.put);
router.delete('/divisas/:id', ctrl.divisas.delete);

module.exports = router;