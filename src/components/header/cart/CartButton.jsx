import React,{useState,useEffect} from 'react'
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector } from 'react-redux'
const CartButton = () => {
    const cartItems = useSelector((state) => state.cartItems.value)
    const [totalProducts, setTotalProducts] = useState(0)
    useEffect(() => {
        setTotalProducts(cartItems.reduce((total, item) => total + Number(item.quantity), 0))
    }, [cartItems])
    return (
        <React.Fragment>
            <div className="card-button">
                <a href="/cart">
                    <div className="card-button__icon"><ShoppingCartIcon /></div>
                    <div className="card-button__number">
                        <Badge
                            badgeContent={totalProducts}
                            showZero={true}
                            sx={{
                                "& .MuiBadge-badge": {
                                    color: "#ed71a3",
                                    backgroundColor: "white"
                                }
                            }}
                        >
                        </Badge>
                    </div>
                    <div className="card-button__text">Gio hang</div>
                </a>
            </div>
        </React.Fragment>
    )
}

export default CartButton
