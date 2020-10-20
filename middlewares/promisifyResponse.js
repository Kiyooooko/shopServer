module.exports = (handler, httpStatusCode = 200) => (req, res, next) =>
    Promise.resolve()
        .then(() => {
            return handler(req);
        })
        .then(data => {
            return res.status(httpStatusCode).json({ data });
        })
        .catch(err => {
            next(err);
        });

