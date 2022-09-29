const router = require('express').Router();
const { isGuest, isAuth, isOwner } = require('../middleware/guards');
const { register, login, logout, getProfile, updateProfileInfo } = require('../services/users');
const mapErrors = require('../utils/mappers');



module.exports = router;