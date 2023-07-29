import userEvent from '@testing-library/user-event';
import React, { useEffect, useState } from 'react'
import NavLinkItem from './NavLinkItem';
import { useSelector, useDispatch } from 'react-redux'
import initIndex from '../../assets/fake-data/index'
import { filterSelectRedux, setCategories } from '../../redux/product/ProductSlice';
import productServices from '../../services/productServices';
const NavLink = (props) => {
    const dispatch = useDispatch()
    const [index, setIndexs] = useState([])
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
    React.useEffect(() => {
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
            setIndexs(initIndex)
            dispatch(setCategories(initIndex))
        })

    }, [])
    const [data, setData] = useState()
    // React.useEffect(()=>{
    //     console.log('data',data);
    // },[data])
    const show = (item) => {
        let temp = clone(index);
        for (let val of temp) {
            if (val.root === item) {
                val.open = !val.open
                // filterFunc("INDEX", true, val.child.map(d=>d.categorySlug))
            }
        }
        setIndexs(temp)
    }

    const update = (type, item) => {
    
        // filterFunc("INDEX",true,[])
        console.log(item)
        const filterData = {
            type: type,
            checked: true,
            item: item.child&&item.child.length>0 ? item.child.map(data => data.categorySlug) : [item.categorySlug],
        }
        console.log(filterData)
        dispatch(filterSelectRedux(filterData))

    }
    const clone = (item) => {
        return JSON.parse(JSON.stringify(item));
    }
    return (
        <React.Fragment>
            <div className="nav-link__category">
                {index.map((item, index) => {
                    return (<NavLinkItem open={item.open} showDropdown={show} title={item} update={update}></NavLinkItem>)
                })}
            </div>
        </React.Fragment>

    )
}

export default NavLink
