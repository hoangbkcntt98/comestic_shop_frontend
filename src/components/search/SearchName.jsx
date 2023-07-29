import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import size from '../../assets/fake-data/product-size'
import colors from '../../assets/fake-data/product-color'
import SearchFilterItem from './SearchFilterItem'
const SearchName = () => {
    const filterState = useSelector(state => state.product.filter)
  
    const [checkFilter,setCheck] = useState(false)
    useEffect(() => {
        //check
        // console.log(filterState)
        if(filterState.name.length>0||filterState.size.length>0||filterState.color.length>0){
            setCheck(true)
        }else{
            setCheck(false)
        }
    }, [filterState])
    return (
        <React.Fragment>
             
            <div className={checkFilter?"search-query":"search-query__hidden"}>
            <hr></hr>
                <h5 className="search-query__title">KẾT QUẢ TÌM KIẾM : </h5>
               <SearchFilterItem/>
                <hr></hr>
            </div>
        </React.Fragment >



    )
}

export default SearchName
