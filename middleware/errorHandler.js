function errorHandler(err, _req, res, _next) {
    console.error(err);
   if (err.code === 'p2002') {
        return res.status(409).json({ message: 'Conflict: Duplicate entry detected.' });
    }
    return res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
}

export { errorHandler };