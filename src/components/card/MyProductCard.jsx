import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

import { useDispatch } from 'react-redux'

import { set } from '../../redux/product-modal/productModalSlice'

import Button from '../button/Button'

import numberWithCommas from '../../utils/numberWithCommas'
import { Button as Btn, IconButton } from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import NormalButton from '../button/NormalButton'
const noImages = require('../../assets/images/no-images.png').default;

const MyProductCard = props => {

    const dispatch = useDispatch()

    return (
        <div className="product-card">

            <div className="product-card__image">
                <Link to={`/catalog/${props.slug}`}>
                    <img src={props.image?props.image:noImages} className = "product-card__image__fit"alt="" />
                </Link>
                {/* <img src={props.img02} alt="" /> */}
                <div className="product-card__overlay">
                    <div className="product-card__overlay__btns">
                        <Button
                            size="sm"
                            icon="bx bxs-cart-add"
                            animate={true}
                            onClick={() => dispatch(set(props.slug))}
                        >
                            Thêm vào giỏ 
                        </Button>
                        <Link to={`/catalog/${props.slug}`}>
                        <Button
                            size="sm"
                            icon="bx bx-search"
                            animate={true}
                            // onClick={() => dispatch(set(props.slug))}
                        >
                            Xem
                        </Button>
                        </Link>
                    </div>
                </div>
            </div>
            <Link to={`/catalog/${props.slug}`}>
                <div className="product-card__name">{props.name}</div>
                <div className="product-card__price">
                    {numberWithCommas(props.price)}
                    <span className="product-card__price__old">
                        <del>{numberWithCommas(399000)}</del>
                    </span>
                </div>
                <div className="product-card__overlay__mobile">
                    <div className="product-card__overlay__mobile__btns">
                        <NormalButton
                            size="sm"
                            icon="bx bxs-cart-add"
                            // animate={true}
                            onClick={() => dispatch(set(props.slug))}
                        >
                            Thêm vào giỏ 
                        </NormalButton>
                        <Link to={`/catalog/${props.slug}`}>
                        <NormalButton
                            size="sm"
                            icon="bx bx-search"
  
                            // animate={true}
                            // onClick={() => dispatch(set(props.slug))}
                        >
                            Xem
                        </NormalButton>
                        </Link>
                    </div>
                </div>
            </Link>


        </div>
    )
}

// MyProductCard.propTypes = {
//     img01: PropTypes.string.isRequired,
//     img02: PropTypes.string.isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     slug: PropTypes.string.isRequired,
// }

export default MyProductCard
