const router = require("express").Router();
const api = require("../services/cake");
const mapErrors = require("../utils/mappers");
const { isAuth, isOwner } = require("../middleware/guards");
const preload = require("../middleware/preload");

router.get('/', async (req, res) => {
    const data = await api.getAll();
    res.json(data);
});

router.get('/top5', async (req, res) => {
    const data = await api.getTopFive();
    res.json(data);
});

router.get('/search', async (req, res) => {
    const { text } = req.query;
    try {
        const result = await api.searchFunction(text);
        res.json(result);
    } catch (err) {
        const error = mapErrors(err);
        console.error(err.message);
        res.status(400).json({ message: error });
    }
});

router.get('/myCakes', isAuth(), async (req, res) => {
    const data = await api.getAllCakesByOwner(req.user._id);
    res.json(data);
});

router.post('/', isAuth(), async (req, res) => {
    const cake = {
        cakeName: req.body.cakeName,
        desc: req.body.desc,
        price: req.body.price,
        type: req.body.type,
        img: [...req.body.img],
        likes: req.body.likes,
        owner: req.user._id,
        onOffer: req.body.onOffer,
        discount: req.body.discount
    };

    try {
        const result = await api.create(cake);
        res.status(201).json(result);
    } catch (err) {
        const error = mapErrors(err);
        console.error(err.message);
        res.status(400).json({ message: error });
    }
});

router.get('/:id', preload(), (req, res) => {
    const cake = res.locals.cake;
    res.json(cake);
});

router.put('/:id', preload(), isOwner(), async (req, res) => {
    const id = req.params.id;
    const cake = {
        cakeName: req.body.cakeName,
        desc: req.body.desc,
        price: req.body.price,
        type: req.body.type,
        img: [...req.body.img],
        likes: req.body.likes,
        owner: req.user._id,
        onOffer: req.body.onOffer,
        discount: req.body.discount
    };

    try {
        const result = await api.update(id, cake);
        res.json(result);
    } catch (err) {
        const error = mapErrors(err);
        console.error(err.message);
        res.status(400).json({ message: error });
    }
});

router.delete('/:id', preload(), isOwner(), async (req, res) => {
    try {
        const cakeId = req.params.id;
        await api.deleteById(cakeId);
    } catch (err) {
        const error = mapErrors(err);
        console.error(err.message);
        res.status(400).json({ message: error });
    }
});

module.exports = router;