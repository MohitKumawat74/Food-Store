const router = require('express').Router()
const FoodC = require('../controllers/FoodControllers')
const RegC = require('../controllers/RegControllers')
const multer = require('multer')

const Storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null, "./public/upload");
    },
filename: function(req,file,cb){
    cb(null, Date.now()+ file.originalname)
},
})
 let upload = multer({
    storage: Storage
 })


router.post('/register', RegC.regpage)
router.post('/login', RegC.loginpage)

// food
router.post("/admininsert", upload.single("image"), FoodC.admininsertpage)
router.get('/showdata', FoodC.showdatapage)
router.delete('/delete/:id', FoodC.deletepage)
router.get("/edit/:id", FoodC.getProductById);
router.put('/edit/:id',upload.single("image"), FoodC.editpage)
router.get('/landing', FoodC.landingpage)
router.post("/message", RegC.message);



module.exports = router;