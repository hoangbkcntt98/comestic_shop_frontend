import React from 'react'

import Helmet from '../components/helmet/Helmet'
import Section, { SectionBody, SectionTitle } from '../components/section/Section'
import Grid from '../components/grid/Grid'
import ProductCard from '../components/card/ProductCard'
import ProductView from '../components/product/ProductView'

import productData from '../assets/fake-data/products'
import { useDispatch, useSelector } from 'react-redux'
import productServices from '../services/productServices'
import { addLinks, getProduct, setLinks, updateLinks } from '../redux/product/ProductSlice'
import MyProductCard from '../components/card/MyProductCard'
import MyProductview from '../components/product/MyProductview'
import Breadcrumb from '../components/bread-cumb/BreadCumb'
import Button from '../components/button/Button'
import { useHistory } from 'react-router'
const noImages = require('../assets/images/no-images.png').default
const Product = props => {

    // const product = productData.getProductBySlug(props.match.params.slug)
    const productRedux = useSelector(state => state.product.products)
    const [product, setProduct] = React.useState();
    const [relatedProducts, setRelatedProducts] = React.useState();
    // const relatedProducts = productData.getProducts(8)
    const dispatch = useDispatch();
    const history = useHistory()
    React.useEffect(() => {
        console.log(product)
    }, [product])
    React.useEffect(() => {
        let search = props.match.params.slug
        let relate = search.substring(0, 2)
        if (productRedux && productRedux.length > 0) {
            let temp = productRedux.filter(item => item.custom_id == props.match.params.slug)[0]
            temp = JSON.parse(JSON.stringify(temp))
            temp.colors = temp.colors 
            temp.sizes = temp.sizes 
            temp.image = temp.variations[0].images[0]
            setProduct(temp)
            productServices.getProduct(relate).then(res => {
                let relatedP = res.product.filter(item => item.custom_id != search)
                relatedP = relatedP.map(item => {
                    let temp = JSON.parse(JSON.stringify(item))
                    temp.image = temp.variations[0].images[0]
                    return temp
                })
                // setProduct(p[0])
                setRelatedProducts(relatedP)

            })
        } else {
            productServices.getProduct(search).then(res => {
                let temp = JSON.parse(JSON.stringify(res.product[0]))

                temp.image = temp.variations[0].images[0]
                setProduct(temp)
            }, [])
            productServices.getProduct(relate).then(res => {
                let p = res.product.filter(item => item.custom_id == search)
                let relatedP = res.product.filter(item => item.custom_id != search)
                console.log(p)
                relatedP = relatedP.map(item => {
                    let temp = JSON.parse(JSON.stringify(item))
                    temp.image = temp.variations[0].images[0]
                    return temp
                })
                setRelatedProducts(relatedP)

            })
        }

        dispatch(setLinks([{
            display: 'Sản Phẩm',
            link: localStorage.getItem('page') ? '/catalog?page=' + localStorage.getItem('page') : '/catalog'
        },
        {

            display: search,
            link: '#'

        }

        ]))

    }, [])

    return (
        <React.Fragment>
            {product &&
                <Helmet title={product.name}>
                    <Breadcrumb />

                    <Section>

                        <SectionBody>
                            <Button
                                size="sm"
                                icon="bx bx-arrow-back"
                                animate={true}
                                margin={'mb'}
                                onClick={() => {
                                    window.history.back()
                                }}
                            >
                                Trở về
                            </Button>
                            <MyProductview product={product} />
                            {/* <ProductView product={product}/> */}
                        </SectionBody>
                    </Section>
                    <Section>
                        <SectionTitle>
                            Khám phá thêm
                        </SectionTitle>
                        <SectionBody>
                            <Grid
                                col={4}
                                mdCol={2}
                                smCol={1}
                                gap={20}
                            >
                                {
                                    relatedProducts && relatedProducts.map((item, index) => (
                                        <MyProductCard
                                            key={index}
                                            image={item.image ? item.image : noImages}
                                            name={item.name}
                                            price={Number(item.variations[0].retail_price)}
                                            slug={item.custom_id}
                                        />
                                    ))
                                }
                            </Grid>
                        </SectionBody>
                    </Section>
                </Helmet>
            }
        </React.Fragment>


    )
}

export default Product
