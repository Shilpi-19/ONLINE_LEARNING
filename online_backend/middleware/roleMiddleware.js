// Middleware to restrict access based on user roles
exports.checkRole = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: 'Access denied: You do not have the required role.',
            });
        }
        next();
    };
};
