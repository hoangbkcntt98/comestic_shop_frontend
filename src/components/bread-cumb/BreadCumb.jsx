
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import GrainIcon from '@mui/icons-material/Grain';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { addLinks } from '../../redux/product/ProductSlice';
import React,{useEffect} from 'react'


export default function Breadcrumb(props) {
    
    const history = useHistory();
    const toRoute = (item)=>{
        // dispatch(addLinks(item))
        history.push(item.link);
    }
    let links = useSelector(state=>state.product.links)
    // useEffect(()=>{
    //     console.log(links)
    // },[links])
    let dispatch = useDispatch()
    // const { links } = props
    return (
        <div role="presentation"  class="bread-cumb">
            <Breadcrumbs aria-label="breadcrumb" separator="›">
                <Link
                    underline="hover"
                    sx={{ display: 'flex', alignItems: 'center' ,fontSize:15}}
                    color="inherit"
                    href="/"
                >
                    <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                    Home
                </Link>
                {
                    links.map((item, key) => {
                        let color = "inherit"
                        if(key == links.length-1) color = "text.primary"
                        return (
                            <Link
                                underline="hover"
                                sx={{ display: 'flex', alignItems: 'center' ,fontSize:17,cursor:'pointer'}}
                                color={color}
                                onClick = {() => toRoute(item)}
                            >
                                {item.display}
                            </Link>
                        )
                    }

                    )
                }
                
            </Breadcrumbs>
        </div>
    );
}
