import React,{useState,useEffect} from 'react'
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector } from 'react-redux'
const CartBadge = () => {
    const cartItems = useSelector((state) => state.cartItems.value)
    const [totalProducts, setTotalProducts] = useState(0)
    useEffect(() => {
        setTotalProducts(cartItems.reduce((total, item) => total + Number(item.quantity), 0))
    }, [cartItems])
    return (
        <React.Fragment>
            <a href="/cart">
                <Badge badgeContent={totalProducts} color="primary"
                    sx={{
                        "& .MuiBadge-badge": {
                            color: "#white",
                            backgroundColor: "#ed71a3",
                            minWidth: 15,
                            height: 15
                        },
                        "& svg": {
                            fontSize: 20
                        }
                    }}>
                    <ShoppingCartIcon color="action" sx={{

                    }} />
                </Badge>
            </a>

        </React.Fragment>
    )
}

export default CartBadge
