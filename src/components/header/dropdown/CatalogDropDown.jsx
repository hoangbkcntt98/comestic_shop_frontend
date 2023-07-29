/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import Grid from '../../grid/Grid'
import { useSelector,useDispatch} from 'react-redux'
import { filterSelectRedux,updateLinks } from '../../../redux/product/ProductSlice'
import NavLinkItem from '../../nav-link/NavLinkItem'

const CatalogDropDown = () => {
    const dispatch = useDispatch()
    const links = useSelector(state => state.product.links)
    const categories = useSelector(state => state.product.categories)
    const update = (type, item) => {

        // filterFunc("INDEX",true,[])
        console.log(item)
        const filterData = {
            type: type,
            checked: true,
            item: item.child && item.child.length > 0 ? item.child.map(data => data.categorySlug) : [item.categorySlug],
        }
        console.log(filterData)
        dispatch(filterSelectRedux(filterData))

    }
    return (
        <div className="item-dropdown item-dropdown__catalog">
            {/* <div style={{ display: 'block', height: 5 ,width:'100%',backgroundColor:'#ed71a3'}}></div> */}
            <Grid
                col={4}
                mdCol={2}
                smCol={1}
                gap={20}
            >
                    {categories.map(item => {
                        return (<NavLinkItem open={true} showDropdown={() =>{}} title={item} offDrop = {true} update={update}></NavLinkItem>)
                    })}
            </Grid>
        </div >
    )
}

export default CatalogDropDown
