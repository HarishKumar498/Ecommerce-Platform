const express = require("express");
const {registerUser, loginUser,logout, authMiddleware} = require('../controllers/authController')
const router = express.Router();

router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/logout',logout);
router.get('/check-auth',authMiddleware,(req,res) =>{
    const user = req.user;
    res.status(200).json({
        success: true,
        message: "Authenticated USer!",
        user
    })
})


module.exports = router;