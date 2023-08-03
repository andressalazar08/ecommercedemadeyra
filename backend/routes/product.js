const express = require('express');
const router = express.Router();


const { getProducts,
        newProduct,
        getSingleProduct,
        updateProduct,
        deleteProduct,
        createProductReview,
        getProductReviews,
        deleteReview
    } = require('../controllers/productController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')


router.route('/products').get( getProducts);//proteger las rutas con isAuthenticatedUser
router.route('/admin/product/new').post(isAuthenticatedUser, authorizeRoles('admin'),newProduct);
router.route('/product/:id').get(getSingleProduct);
router.route('/admin/product/:id')
            .put(isAuthenticatedUser, authorizeRoles('admin'),updateProduct)
            .delete(isAuthenticatedUser, authorizeRoles('admin'),deleteProduct); //en el caso de que coincidan as rutas puedo aplicar los dos métodos
router.route('/review').put(isAuthenticatedUser, createProductReview );
router.route('/reviews').get(isAuthenticatedUser, getProductReviews );
router.route('/reviews').delete(isAuthenticatedUser, deleteReview );



module.exports = router;