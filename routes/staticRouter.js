import express from 'express'
import URL from '../models/url.js'
import { restrictTo } from '../middleware/auth.js';
const router = express.Router();

router.get('/admin/urls' , restrictTo(["ADMIN"]) ,async(req,res) =>{
    const allurls = await URL.find({}).populate("createdBy")
    res.render("home" , {
        urls :allurls,
        user: req.user
    })
}) 


router.get('/',restrictTo(["NORMAL","ADMIN"]),async(req,res) =>{
    if (!req.user) return res.redirect("/login");

    const query = req.user.role === "ADMIN" ? {} : { createdBy: req.user._id };
    let allurls = await URL.find(query).populate("createdBy");

    if (req.user.role === "ADMIN") {
        allurls.sort((a, b) => {
            const nameA = (a.createdBy?.name || a.createdBy?.email || "").toLowerCase();
            const nameB = (b.createdBy?.name || b.createdBy?.email || "").toLowerCase();
            return nameA.localeCompare(nameB);
        });
    }

    res.render("home" , {
        urls :allurls,
        user: req.user,
        id: req.query.id // 🔥 Get ID from query after redirect
    })
})


router.get("/signup" , (req,res) => {
    res.render("signup")
})

router.get("/login" , (req,res) => {
    res.render("login")
})

export default router