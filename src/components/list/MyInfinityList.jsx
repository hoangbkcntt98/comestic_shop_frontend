import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import Grid from '../grid/Grid'
import ProductCard from '../card/ProductCard'
import MyProductCard from '../card/MyProductCard'
const noImages = require('../../assets/images/no-images.png').default
const MyInfinityList = props => {

    const perLoad = 12 // items each load

    const listRef = useRef(null)
    
    const [data, setData] = useState([])

    const [load, setLoad] = useState(true)

    const [index, setIndex] = useState(0)

    useEffect(() => {
        setData(props.data.slice(0, perLoad))
        setIndex(1)
    }, [props.data])

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (listRef && listRef.current) {
                if (window.scrollY + window.innerHeight >= listRef.current.clientHeight + listRef.current.offsetTop + 200) {
                    console.log("bottom reach")
                    setLoad(true)
                }
            }
            
        })
    }, [listRef])

    useEffect(() => {
        const getItems = () => {
            const pages = Math.floor(props.data.length / perLoad)
            const maxIndex = props.data.length % perLoad === 0 ? pages : pages + 1

            if (load && index <= maxIndex) {
                const start = perLoad * index
                const end = start + perLoad

                setData(data.concat(props.data.slice(start, end)))
                setIndex(index + 1)
            }
        }
        getItems()
        setLoad(false)
    }, [load, index, data, props.data])

    return (
        <div ref={listRef}>
            <Grid
                col={4}
                mdCol={2}
                smCol={1}
                gap={20}
            >
                {
                    data.map((item, index) => (
                        <MyProductCard
                        key={index}
                        image={item.variations[0].images[0]?item.variations[0].images[0]:noImages}
                        name={item.name}
                        price={Number(item.variations[0].retail_price)}
                        slug={item.custom_id}
                    />
                    ))
                }
            </Grid>
        </div>
    )
}

MyInfinityList.propTypes = {
    data: PropTypes.array.isRequired
}

export default MyInfinityList
