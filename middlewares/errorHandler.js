module.exports = (error, req, res, next) => {
	if (error instanceof multer.MulterError && error.code === 'LIMIT_FILE_SIZE') {
		return res.status(413).json({
			status: 'fail',
			message: 'Payload content length greater than maximum allowed: 1000000',
		});
	} else if (error) {
		return res.status(500).json({
			status: 'fail',
			message: error.message || 'An unknown error occurred',
		});
	}
	next();
};
