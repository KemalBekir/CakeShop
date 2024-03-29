module.exports = () => (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://cakeshop-ej4v.onrender.com');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, HEAD,PUT, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Authorization');
    next();
}
