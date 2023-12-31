import React, { Fragment, useEffect, useState } from 'react';
import MetaData from './layout/MetaData';
import Product from './product/Product';

import Pagination from 'react-js-pagination';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';


import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../actions/productActions';
import { useAlert } from 'react-alert';

import Loader from './layout/Loader';


const { createSliderWithTooltip } = Slider;

const Range = createSliderWithTooltip(Slider.Range)



const Home = ({ match }) => {

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1,1000]); //minimun price and maximun price

  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, products, error, productCount, resPerPage  } = useSelector(state=>state.products)

  const keyword = match.params.keyword


  useEffect(()=>{
    //qué quiero hacer cuando el componente se monta o actualiza
    if(error){

      return alert.error(error)
    }

    dispatch(getProducts(keyword, currentPage, price))

    //el array de dependencias es para administrar cuando el componente se actualiza
    //cuando la variable se modifica se vuelve a ejecutar el useEffect
  },[dispatch,alert, error, keyword, currentPage, price])


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

                    {keyword?(
                      <Fragment>
                          <div className='col-6 col-md-3 mt-5 mb-5'>
                            <div className='px-5'>
                                <Range
                                  marks={{
                                    1:`$1`,
                                    1000:`$1000`
                                  }}
                                  min={1}
                                  max={1000}
                                  defaultValue={[1,1000]}
                                  tipFormatter={value => `$${value}`}
                                  tipProps={{
                                    placement: "top",
                                    visible: true
                                  }}
                                  value={price}
                                  onChange={price=> setPrice(price)}

                                />
                            </div>
                          </div>

                          <div className='col-6 col-md-9'>
                                  <div className='row'>
                                      {products.map(product =>(
                                          <Product key={product._id} product={product} col={4} />
                                      ))}
                                  </div>

                          </div>

                      </Fragment>
                    ):(products.map(product =>(
                        <Product key={product._id} product={product} col={3}/>
                    )))}


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
