const express = require('express');
const bodyParser = require('body-parser');

var router = express.Router();

router.use(bodyParser.json());

router.get("/",(req,res)=>{
    res.send("Hello from todo controller");
});
router.get("/afficher",(req,res)=>{
    let data = req.body;
    res.send(data);

});

router.post("/modifier",(req,res)=>{
    let data = req.body;
    res.send(data);

});
router.post("/ajouter",(req,res)=>{
    let data = req.body;
    res.send(data);

});
router.delete("/supprimer",(req,res)=>{
    let data = req.body;
    res.send(data);

});



module.exports = router ;