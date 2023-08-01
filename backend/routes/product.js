const express = require('express');
const router = express.Router();


const { getProducts,
        newProduct,
        getSingleProduct,
        updateProduct,
        deleteProduct} = require('../controllers/productController');

const { isAuthenticatedUser } = require('../middlewares/auth')


router.route('/products').get( getProducts);//proteger las rutas con isAuthenticatedUser

router.route('/admin/product/new').post(isAuthenticatedUser,newProduct);

router.route('/product/:id').get(getSingleProduct);

router.route('/admin/product/:id').put(isAuthenticatedUser,updateProduct).delete(isAuthenticatedUser,deleteProduct); //en el caso de que coincidan as rutas puedo aplicar los dos métodos

module.exports = router;