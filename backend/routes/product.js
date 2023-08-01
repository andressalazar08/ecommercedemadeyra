const express = require('express');
const router = express.Router();


const { getProducts,
        newProduct,
        getSingleProduct,
        updateProduct,
        deleteProduct} = require('../controllers/productController');


router.route('/products').get(getProducts);

router.route('/admin/product/new').post(newProduct);

router.route('/product/:id').get(getSingleProduct);

router.route('/admin/product/:id').put(updateProduct).delete(deleteProduct); //en el caso de que coincidan as rutas puedo aplicar los dos métodos

module.exports = router;