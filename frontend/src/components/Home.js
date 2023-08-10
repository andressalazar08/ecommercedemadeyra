import React, { Fragment, useEffect, useState } from 'react';
import MetaData from './layout/MetaData';
import Product from './product/Product';

import Pagination from 'react-js-pagination';


import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../actions/productActions';
import { useAlert } from 'react-alert';

import Loader from './layout/Loader';

const Home = ({ match }) => {

  const [currentPage, setCurrentPage] = useState(1);

  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, products, error, productCount, resPerPage  } = useSelector(state=>state.products)

  const keyword = match.params.keyword


  useEffect(()=>{
    //qué quiero hacer cuando el componente se monta o actualiza
    if(error){

      return alert.error(error)
    }

    dispatch(getProducts(keyword, currentPage))

    //el array de dependencias es para administrar cuando el componente se actualiza
    //cuando la variable se modifica se vuelve a ejecutar el useEffect
  },[dispatch,alert, error, keyword, currentPage])


  function setCurrentPageNo(pageNumber){
    setCurrentPage(pageNumber)
  }

  return (
    <Fragment>
          {loading? <Loader />:(
            <Fragment>
                <MetaData  title={`Buy best products Online `} />
                <h1 id="products_heading">Latest Products</h1>
                <section id="products" className="container mt-5">
                  <div className="row">
                    {products && products.map(product =>(
                        <Product key={product._id} product={product} />
                    ))}
                  </div>
                </section>

                {resPerPage<=productCount && (
                  <div className='d-flex justify-content-center mt-5'>
                      <Pagination
                        activePage={currentPage}
                        itemsCountPerPage={resPerPage}
                        totalItemsCount={productCount}
                        onChange={setCurrentPageNo}
                        nextPageText={'Next'}
                        prevPageText={'Prev'}
                        firstPageText={'First'}
                        lastPageText={'Last'}
                        itemClass='page-item'
                        linkClass='page-link'
                      />
                </div>


                )}


            </Fragment>
          )}


    </Fragment>
  )
}

export default Home
