const { isAuth } = require('../middleware/guards');

const router = require('express').Router();

router.get('/:chatId', isAuth(), async (req,res) => {

});

router.post('/', isAuth(), async( req,res) => {

});

module.exports = router;