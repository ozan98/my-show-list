const errorHandler = (err, req, res, next) => {
    // Check what the status code if it isnt already
    const statusCode = res.statusCode ? res.statusCode : 500

    res.status(statusCode)

    // Send message as json
    // If in production, the error stack will be sent for debuggin
    res.json({
        message: err.message,
        stack: process.env.Node_ENV === 'production' ? null : err.stack
    })
}

module.exports = {
    errorHandler,
}