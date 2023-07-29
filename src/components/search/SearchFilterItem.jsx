import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearFilterRedux, filterSelectRedux } from '../../redux/product/ProductSlice'
// import colors from '../../assets/fake-data/product-color'
// import size from '../../assets/fake-data/product-size'
const SearchFilterItem = (props) => {
    const dispatch = useDispatch()
    const filterState = useSelector(state => state.product.filter)
    const colors = useSelector(state => state.product.colors)
    const size = useSelector(state => state.product.sizes)
    const getColor = (color) => {
        let rs = colors.find(item => item.color == color)
        return rs.display
    }
    const getColorItem = (color) => {
        return colors.find(item => item.color == color)
    }
    const getSize = (val) => {
        let rs = size.find(item => item.size == val)
        return rs.display
    }
    const getSizeItem = (val) => {
        return size.find(item => item.size == val)
    }
    return (
        <React.Fragment>
            <div className="search-query__item__container">
                <p>Name:</p>
                {filterState.name.length > 0 && (
                    <button className="search-query__item__display bg-main-c-white hover-white-main"
                    onClick={() => dispatch(filterSelectRedux({ type: "NAME", checked: false, item: null }))}>
                        
                        <span>{filterState.name}</span>
                        <i  className="bx bx-x"></i>
                    </button>
                )}
                <p>Color:</p>
                {
                    filterState.color.map((item, index) => {
                        // console.log(item)
                        return (
                            <button key={index} className={"search-query__item__display bg-main-c-white hover-white-main"}
                            onClick={() => dispatch(filterSelectRedux({ type: "NAME", checked: false, item: null }))}>
                                <span>{getColor(item)}</span>
                                <i onClick={() => dispatch(filterSelectRedux({ type: "COLOR", checked: false, item: getColorItem(item) }))} className="bx bx-x"></i>
                            </button>
                        )
                    })
                }
                <p>Size:</p>
                {
                    filterState.size.map((item, index) => {
                        // console.log(item)
                        return (
                            <button key={index} className="search-query__item__display bg-main-c-white hover-white-main"
                            onClick={() => dispatch(filterSelectRedux({ type: "NAME", checked: false, item: null }))}>
                                <span>{getSize(item)}</span>
                                <i onClick={() => dispatch(filterSelectRedux({ type: "SIZE", checked: false, item: getSizeItem(item) }))} className="bx bx-x"></i>
                            </button>
                        )
                    })
                }
                <button onClick={() => dispatch(clearFilterRedux())} className="search-query__item__display bg-crimson-c-white hover-red">
                    {/* <span>Xoa tat ca</span> */}
                    <i className="bx bx-trash"></i>
                </button>
            </div>
        </React.Fragment>

    )
}

export default SearchFilterItem
