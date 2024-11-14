const express = require('express');
const { createProduct, getProducts, getAllProducts } = require('../Controller/controller');
const router = express.Router();


router.post('/createprod', createProduct);

router.get('/getproducts', getProducts);
router.get('/getAllProducts', getAllProducts);

module.exports = router;