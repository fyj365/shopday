import React, { Fragment, useEffect, useState } from 'react'
import Pagination from 'react-js-pagination'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import MetaData from './layout/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../actions/ProductActions'
import  Product from './product/Product'
import Loader from './layout/Loader'
import { useAlert} from 'react-alert'

const { createSliderWithTooltip } = Slider
const Range = createSliderWithTooltip(Slider.Range)
const Home = ( {match }) => {

    const [currentPage, setCurrentPage] =  useState(1)
    const [price, setPrice] = useState([1, 10000])
    const [category, setCategory] = useState('');
    const [rating, setRating] = useState(0)
    const  categories = [
        "Electronics",
        "Food",
        "Drinks",
        "Old"
    ]
    const alert = useAlert();

    const dispatch = useDispatch();

    const { loading, products, error, productsCount, resPerPage, filteredProductCount } = useSelector(state => state.products)

    const keyword = match.params.keyword;

    useEffect(() => {
        if(error) {
           return alert.error(error)
        }
        dispatch(getProducts(keyword, currentPage, price, category, rating));

    }, [dispatch, alert, error, keyword, currentPage, price, category, rating])

    function setCurrentPageNo (pageNum) {
        setCurrentPage(pageNum)
    }

    return (
        <Fragment>
            {loading? <Loader />:(
            <Fragment>
                <MetaData title={'Buy best product online'}/>
                <h1 id="products_heading">Latest Products</h1>
                 <section id="products" className="container mt-5">
                    <div className="row">
                     {keyword ?(
                         <Fragment>
                             <div className="col-6 col-md-3 mt-5 mb-5">
                                <div className="px-5">
                                    <Range 
                                        marks={
                                            {1: `$1`,
                                            10000: `$10000`}
                                        }
                                        min={1}
                                        max={10000}
                                        defaultValue={[1,10000]}
                                        tipFormatter={value => `${value}`}
                                        tipProps={{
                                            placement: "top",
                                            visible: true
                                        }}
                                        value={price}
                                        onChange={price => setPrice(price)}
                                    />
                                    <hr className="my-5"/>
                                    <div className="mb-3">
                                        <h4>Categories</h4>
                                        <ul className="pl-0">
                                            {
                                                categories.map(category => (
                                                    <li style= {{cursor: 'pointer',
                                                                 listStyleType: 'none'}}
                                                                key={category}
                                                                onClick={() => setCategory(category)} 
                                                    >
                                                                {category}
                                                         
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>

                                    <hr className="my-3"/>
                                    <div className="mb-3">
                                        <h4>Rating</h4>
                                        <ul className="pl-0">
                                            {
                                                [5,4,3,2,1].map(star => (
                                                    <li style= {{cursor: 'pointer',
                                                                 listStyleType: 'none'}}
                                                                key={star}
                                                                onClick={() => setRating(star)} 
                                                    >
                                                                {star}
                                                         
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>

                                </div>
                             </div>
                             <div className="col-6 col-md-9">
                                    <div className="row">
                                        {
                                             products && products.map(product => (
                                             <Product key={product._id} product={product} col={4}/>
                                            )) 
                                        }
                                    </div>
                             </div>
                         </Fragment>
                     ) : (
                            products && products.map(product => (
                            <Product key={product._id} product={product} col={3}/>
                            )) 
                     )}
                    </div>
                 </section>
                 {(  resPerPage < filteredProductCount) ? (               
                       <div className="d-flex justify-content-center mt-5">
                        <Pagination 
                            totalItemsCount = {productsCount}
                            activePage={currentPage}
                            itemsCountPerPage={resPerPage}
                            onChange={setCurrentPageNo}
                            nextPageText = {'Next'}
                            prevPageText = {'Prev'}
                            firstPageText = {'First'}
                            lastPageText = {'Last' }
                            itemClass="page-item"
                            linkClass="page-link"
                        />
                 </div>) : ''}

            </Fragment>)}
        </Fragment>

    )
}
export default Home