import React, { useEffect } from 'react'

import { Route, Switch } from 'react-router-dom'

import Home from '../pages/Home'
import Catalog from '../pages/Catalog'
import Cart from '../pages/Cart'
import Product from '../pages/Product'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import { useDispatch } from 'react-redux'
import productServices from '../services/productServices'
import { setCategories,setProducts, product, setLinks, setLoading, setTotalPage, setProduct, setColorsRedux, setSizesRedux } from '../redux/product/ProductSlice'
const Routes = () => {
    const dispatch = useDispatch()
    
    useEffect(()=>{
        const formatIndex = (index) =>{
            if(index.length==0) return index
            let other = index.find(item => item.display.toUpperCase().includes("KHÁC"))
            if(other ){
                console.log('other',other)
                index = index.filter(item => !item.display .toUpperCase().includes("KHÁC"))
                index.push(other)
                console.log('child formated',index)
            }
          
            return index
        }
        productServices.getProductAttributes({ type: "CATE" }).then(res => {
            let initIndex = [
                {
                    root: "Áo",
                    categorySlug: "a",
                    type: 1,
                    open: false,
                    child: []
                },
                {
                    root: "Quần",
                    categorySlug: "q",
                    open: false,
                    child: [],
                    type: 2
                },
                {
                    root: "Váy",
                    categorySlug: "a",
                    open: false,
                    child: [],
                    type: 3
                },
                
                {
                    root: "Set",
                    categorySlug: "S",
                    // type: 4,
                    open: false,
                    child: []
                },
                {
                    root: "Khác",
                    categorySlug: "OTHER",
                    open: false,
                    child: [],
                    
                },
            ]
            initIndex = initIndex.map(item => {
                let child = res.filter(c => c.sub_type == item.type).map(val => {
                    return {
                        display: val.display,
                        categorySlug: val.code
                    }
                })
                item.child = formatIndex(child)
                console.log('child',child)
                return item
            })
            // setIndexs(initIndex)
            dispatch(setCategories(initIndex))
        })
        productServices.getProductAttributes({type:"COLOR"}).then(res =>{
            // console.log(res)
            let temp = res.map(r => {
                return {
                    display:r.display,
                    color:r.code
                }
            })
            dispatch(setColorsRedux(temp))
        })
        productServices.getProductAttributes({type:"SIZE"}).then(res => {
            let temp = res.map(r => {
                return {
                    display:r.display,
                    size:r.code
                }
            })
            dispatch(setSizesRedux(temp))
        })
        productServices.getProducts().then((res) => {

            dispatch(setProducts(res.products))
            dispatch(setTotalPage(parseInt(res.total_pages/12)+1))
        })
    },[])
    return (
        <Switch>
            <Route path='/' exact component={Home}/>
            <Route path='/catalog/:slug' component={Product}/>
            <Route path='/catalog' component={Catalog}/>
            <Route path='/cart' component={Cart}/>
            <Route path='/login' exact component={Login}/>
            <Route path="/signup" exact component={Signup}/>
        </Switch>
    )
}

export default Routes
