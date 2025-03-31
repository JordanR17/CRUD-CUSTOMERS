const flashMiddleware = (req, res, next) => {
    res.locals.flashes = req.session.flashes ||{};
    req.session.flashes = {};

    res.flash = (type, message) => {
        req.session.flashes[type]= req.session.flashes[type] || [];
        req.session.flashes[type].push(message);
    }
    next();
}

export default flashMiddleware;