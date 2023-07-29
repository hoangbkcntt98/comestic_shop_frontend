import React, { useCallback, useState, useEffect, useRef } from 'react'

import Helmet from '../components/helmet/Helmet'
import CheckBox from '../components/checkbox/CheckBox'

import productData from '../assets/fake-data/products'
// import colors from '../assets/fake-data/product-color'
// import size from '../assets/fake-data/product-size'
import Button from '../components/button/Button'
import InfinityList from '../components/list/InfinityList'
import NavLink from '../components/nav-link/NavLink'
import { useSelector, useDispatch } from 'react-redux'
import { addLinks, clearFilterRedux, filterSelectRedux, setProducts, product, setLinks, setLoading, setTotalPage, setProduct, setColorsRedux, setSizesRedux } from '../redux/product/ProductSlice'
import SearchName from '../components/search/SearchName'
import Breadcrumb from '../components/bread-cumb/BreadCumb'
import productServices from '../services/productServices'
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import { RingLoader } from 'react-spinners'
import ProductList from '../components/list/ProductList'
import MyPagination from '../components/list/MyPagination'
import queryString from 'query-string';
import MyInfinityList from '../components/list/MyInfinityList'
const Catalog = (props) => {
    const filterState = useSelector((state) => state.product.filter)
    const productRedux = useSelector((state) => state.product.products)
    const [productList, setProductList] = useState(productRedux)
    const links = useSelector(state => state.product.links)
    const isLoading = useSelector(state => state.product.isLoading)
    const [colors,setColors] = useState([])
    const [size,setSize] = useState([])
    const state = useSelector((state) => state.product)
    const dispatch = useDispatch()
    // const productList = productData.getAllProducts()
    const [page, setPage] = React.useState(queryString.parse(props.location.search).page);
    useEffect(()=>{
        setProductList(productRedux)
    },[productRedux])
    React.useEffect(() => {
        dispatch(setLoading(true));
        if(state.colors&&state.colors.length>0){
            console.log(state.colors)
            setColors(state.colors)
        }else{
            productServices.getProductAttributes({type:"COLOR"}).then(res =>{
                // console.log(res)
                let temp = res.map(r => {
                    return {
                        display:r.display,
                        color:r.code
                    }
                })
                setColors(temp)
                dispatch(setColorsRedux(temp))
            })
        }
        if(state.sizes&&state.sizes.length>0){
            let sizeTemp = state.sizes.map(s => {
                return {
                    display:s.display,
                    size:s.code
                }
            })
            setSize(sizeTemp)
        }else{
            productServices.getProductAttributes({type:"SIZE"}).then(res => {
                let temp = res.map(r => {
                    return {
                        display:r.display,
                        size:r.code
                    }
                })
                setSize(temp)
                dispatch(setSizesRedux(temp))
            })
        }
        if(productRedux.length==0){
            productServices.getProducts().then((res) => {

                dispatch(setProducts(res.products))
                dispatch(setTotalPage(parseInt(res.total_pages/12)+1))
                dispatch(setLoading(false))
            })
        }else{
            // alert(productRedux.length)
            dispatch(setLoading(false));
        }
      
        // dispatch(setLoading(false))
        dispatch(setLinks([{
            display: "Sản phẩm",
            link: "/catalog"
        }]))
        window.scroll(0, 0)
    }, [])
    const filterSelect = (type, checked, item) => {
        const filterData = {
            type: type,
            checked: checked,
            item: item
        }
        dispatch(filterSelectRedux(filterData))
    }


    const updateProducts = useCallback(
        () => {
            let temp = productRedux
            if (filterState.name.length > 0) {
                temp = temp.filter(e => e.name.includes(filterState.name))
            }
            if (filterState.category.length > 0) {
                console.log(filterState)

                temp = temp.filter(e => {
                    // console.log(e.categories[0])
                    for(let cate of e.categories){
                        if(filterState.category.includes(cate)) return true
                    }
                    return false
                })
            }

            if (filterState.color.length > 0) {
                temp = temp.filter(e => {
                    const check = e.colors_type.find(color => filterState.color.includes(color))
                    return check !== undefined
                })
            }

            if (filterState.size.length > 0) {
                temp = temp.filter(e => {
                    const check = e.sizes_type.find(size => filterState.size.includes(size))
                    return check !== undefined
                })
            }
            // console.log(temp)
            setProductList(temp)

        },
        [filterState],
    )

    useEffect(() => {
        updateProducts()
    }, [updateProducts])

    const filterRef = useRef(null)
    const [open, setOpen] = useState(false)
    const showHideFilter = () => {
        filterRef.current.classList.toggle('active')
        setOpen(!open)
    }
    return (
        <Helmet title="Sản phẩm">
            <Breadcrumb />
            <div className="catalog">

                <div className={open ? "catalog__filter__close show" : "catalog__filter__close"} onClick={showHideFilter}>
                    <i className="bx bx-x"></i>
                </div>
                <div className="catalog__filter" ref={filterRef}>


                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__title catalog__filter__widget__title__category">
                            DANH MUC
                        </div>

                        <div className="catalog__filter__widget__content">
                            <NavLink />
                        </div>
                    </div>
                    <div className="catalog__filter__widget__title catalog__filter__widget__title__category">
                        BO LOC
                    </div>
                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__title">
                            màu sắc
                        </div>
                        <div className="catalog__filter__widget__content">
                            {
                                colors.map((item, index) => (
                                    <div key={index} className="catalog__filter__widget__content__item">
                                        <CheckBox
                                            label={item.display}
                                            onChange={(input) => filterSelect("COLOR", input.checked, item)}
                                            checked={filterState.color.includes(item.color)}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__title">
                            kích cỡ
                        </div>
                        <div className="catalog__filter__widget__content">
                            {
                                size.map((item, index) => (
                                    <div key={index} className="catalog__filter__widget__content__item">
                                        <CheckBox
                                            label={item.display}
                                            onChange={(input) => filterSelect("SIZE", input.checked, item)}
                                            checked={filterState.size.includes(item.size)}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__content">
                            <Button size="sm" onClick={() => {
                                dispatch(clearFilterRedux())
                            }}>xóa bộ lọc</Button>
                        </div>
                    </div>
                </div>
                <div className="catalog__filter__toggle">
                    <Button size="sm" onClick={() => showHideFilter()}>bộ lọc</Button>
                </div>
                <div className="catalog__content">
                    <SearchName
                    />
                    {isLoading == true &&
                        <div className="catalog__content__loading">
                            <RingLoader loading={true} size={50} />
                            <h3>Đang tải dữ liệu sản phẩm ....</h3>
                        </div>
                    }

                    {productList.length > 0 && isLoading == false &&
                        <MyInfinityList data ={productList} />
                        // <ProductList data={productList} />
                    }
                    {/* <MyPagination page={page ? Number(page) : 1} setPage={setPage} setProductList = {setProductList}
                    /> */}
                </div>
            </div>
        </Helmet>
    )
}

export default Catalog
