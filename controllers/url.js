import { nanoid } from "nanoid";

import URL from '../models/url.js'

async function handleGenerateNewShortUrl(req, res) {
    const shortId = nanoid(8);
    const body = req.body;
    if(!body.url){ return res.status(400).json({error : 'url required'})}
    await URL.create({
        shortId : shortId,
        redirectUrl: body.url,
        visitHistory : [],
        createdBy :req.user._id,
    })
    return res.redirect("/?id=" + shortId);
}



async function handleGetAnalytics(req,res) {
    const shortId = req.params.shortid;
    const result = await URL.findOne({ shortId : shortId})
    res.json({totalClicks : result.visitHistory.length , analytics : result.visitHistory})
}


async function handleDeleteUrl(req, res) {
    const shortId = req.params.shortid;
    if (req.user.role === "ADMIN") {
        await URL.findOneAndDelete({ shortId: shortId });
        return res.redirect("/admin/urls");
    }
    await URL.findOneAndDelete({ shortId: shortId, createdBy: req.user._id });
    return res.redirect("/");
}


export {
    handleGenerateNewShortUrl,
    handleGetAnalytics,
    handleDeleteUrl
}