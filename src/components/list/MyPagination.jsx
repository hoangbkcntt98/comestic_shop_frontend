import React from 'react'
import Pagination from '@mui/material/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setProducts, setTotalPage } from '../../redux/product/ProductSlice';
import productServices from '../../services/productServices';
import { useHistory } from 'react-router';
const queryString = require('query-string');
const MyPagination = (props) => {
    const history = useHistory();
    // const [page, setPage] = React.useState(props.page);
    const dispatch = useDispatch();
    const totalPages = useSelector(state => state.product.total_pages)
    const isLoading = useSelector(state => state.product.isLoading)
  
    const handleChange = (event, value) => {
        props.setPage(value);
        window.scrollTo(0,0)
        localStorage.setItem('page',value)
    
        history.push('/catalog?page='+value)
    };
    return (
        <React.Fragment>
            <div className="product-list__pagination" >
                <Pagination  
                 sx={{
                    "& .MuiPaginationItem-root.Mui-selected": {
                       
                        backgroundColor: "#ed71a3",
                      
                    },
                    
                }}
                style = {{display:isLoading?'none':'block'}}
                className="product-list__pagination__item" 
                count={totalPages} 
                page={props.page} 
                onChange={handleChange} />
            </div>
        </React.Fragment>
    )
}

export default MyPagination
