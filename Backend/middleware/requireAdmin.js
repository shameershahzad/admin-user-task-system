const requireAdmin = (req, res, next) => {
    if (req.role !== "Admin") {
        return res.status(403).json({ message: "Admin access required" });
    }
    next();
}

module.exports = requireAdmin;
