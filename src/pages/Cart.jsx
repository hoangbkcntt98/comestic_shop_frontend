import React, { useEffect, useState } from 'react'

import { useSelector ,useDispatch} from 'react-redux'
import { Link } from 'react-router-dom'

import Helmet from '../components/helmet/Helmet'
import CartItem from '../components/cart/CartItem'
import Button from '../components/button/Button'

import productData from '../assets/fake-data/products'
import BreadCumb from '../components/bread-cumb/BreadCumb'
import numberWithCommas from '../utils/numberWithCommas'
import Breadcrumb from '../components/bread-cumb/BreadCumb'
import { setLinks } from '../redux/product/ProductSlice'

const Cart = () => {

    const cartItems = useSelector((state) => state.cartItems.value)
    const dispatch = useDispatch()

    const [cartProducts, setCartProducts] = useState((cartItems))

    const [totalProducts, setTotalProducts] = useState(0)

    const [totalPrice, setTotalPrice] = useState(0)
    
    useEffect(() => {
        // localStorage.removeItem('cartItems')
        console.log(cartItems)
        setCartProducts(cartItems)
        setTotalPrice(cartItems.reduce((total, item) => total + (Number(item.quantity) * Number(item.price)), 0))
        setTotalProducts(cartItems.reduce((total, item) => total + Number(item.quantity), 0))
        dispatch(setLinks([{
            display:"Gio hang",
            link:'/cart'
        }]))
    }, [cartItems])

    return (
        <React.Fragment>

            <Helmet title="Giỏ hàng">
                <Breadcrumb />
                <div className="cart">
                    <div className="cart__info">
                        <div className="cart__info__txt">
                            <p>
                                Bạn đang có {totalProducts} sản phẩm trong giỏ hàng
                            </p>
                            <div className="cart__info__txt__price">
                                <span>Thành tiền:</span> <span>{numberWithCommas(Number(totalPrice))}</span>
                            </div>
                        </div>
                        <div className="cart__info__btn">
                            <Button size="block">
                                Đặt hàng
                            </Button>
                            <Link to="/catalog">
                                <Button size="block">
                                    Tiếp tục mua hàng
                                </Button>
                            </Link>

                        </div>
                    </div>
                    <div className="cart__list">
                        {
                            cartProducts.map((item, index) => (
                                <CartItem item={item} key={index} />
                            ))
                        }
                    </div>
                </div>
            </Helmet>
        </React.Fragment>
    )
}

export default Cart
