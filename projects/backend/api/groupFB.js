const group = require('../models/group.model');
// const nganh= require("../models/Nganhnghe.model");


exports.getAll = async (req, res) => {
    try {
        console.log("test");
        const g = await group.find();
        console.log(g);
        res.json(g);
    } catch (error) {
        res.json(error);
    }
}

