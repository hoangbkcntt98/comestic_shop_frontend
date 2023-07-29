import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

import { useDispatch } from 'react-redux'

import { set } from '../../redux/product-modal/productModalSlice'

import Button from '../button/Button'

import numberWithCommas from '../../utils/numberWithCommas'
import { Button as Btn, IconButton } from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';


const ProductCard = props => {

    const dispatch = useDispatch()

    return (
        <div className="product-card">

            <div className="product-card__image">
                <Link to={`/catalog/${props.slug}`}>
                    <img src={props.img01} alt="" />
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
                <h3 className="product-card__name">{props.name}</h3>
                <div className="product-card__price">
                    {numberWithCommas(props.price)}
                    <span className="product-card__price__old">
                        <del>{numberWithCommas(399000)}</del>
                    </span>
                </div>
            </Link>


        </div>
    )
}

ProductCard.propTypes = {
    img01: PropTypes.string.isRequired,
    img02: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    slug: PropTypes.string.isRequired,
}

export default ProductCard
