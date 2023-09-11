import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import Helmet from '../components/helmet/Helmet'
import Section, { SectionTitle, SectionBody } from '../components/section/Section'
import PolicyCard from '../components/card/PolicyCard'
import Grid from '../components/grid/Grid'
import ProductCard from '../components/card/ProductCard'

import policy from '../assets/fake-data/policy'
import productData from '../assets/fake-data/products'
import HeroSlider from '../components/slider/HeroSlider'
import heroSliderData from '../assets/fake-data/hero-slider'
import banner from '../assets/images/banner.png'
import ad1 from '../assets/images/banner1.jpg'
import Slider from '../components/slider/Slider'
import { useDispatch, useSelector } from 'react-redux'
import { isEmpty } from '../utils/utils'
import productServices from '../services/productServices'
import { setProducts, setTotalPage } from '../redux/product/ProductSlice'
import MyProductCard from '../components/card/MyProductCard'
import userServices from '../services/userServices'
import Cookies from 'js-cookie';
const noImages = require('../assets/images/no-images.png').default;
const skirtImage = require('../assets/images/skirt.png').default;

const Home = () => {
    const state = useSelector((state) => state.product)
    const dispatch = useDispatch();
    const [user,setUser] = useState();
    const [intro, setIntro] = useState({
        pan: [],
        set: [],
        skirt: [],
        bestSeller: [],
        promotion: []
    })
    const { pan, set, skirt, bestSeller, promotion } = intro

    React.useEffect(() => {
        const authToken = Cookies.get('authToken');
        
    }, []);
    
    React.useEffect(() => {
        setIntro({
            ...state,
            bestSeller: state.products.slice(-10),
            skirt: state.products.filter(item => item.categories.includes("V"))
        })
    }, [state.products])
    return (
        <Helmet title="Trang chủ">

            <Section>
                <div className="banner">
                    <Slider />
                    <div className="banner__ads">
                        <div className="banner__ads__image"><img src={ad1} alt=""></img></div>
                        <div className="banner__ads__image"><img src={ad1} alt=""></img></div>
                    </div>
                </div>

            </Section>
            {/* end hero slider */}

            {/* policy section */}
            <Section>
                <SectionBody>
                    <Grid
                        col={4}
                        mdCol={2}
                        smCol={1}
                        gap={20}
                    >
                        {
                            policy.map((item, index) => <Link key={index} to="/policy">
                                <PolicyCard
                                    name={item.name}
                                    description={item.description}
                                    icon={item.icon}
                                />
                            </Link>)
                        }
                    </Grid>
                </SectionBody>
            </Section>
            {/* end policy section */}

            {/* best selling section */}
            <Section extendClass="best_seller section__shadow">
                <SectionTitle>
                    <i className='bx bxs-hot'></i>top sản phẩm bán chạy
                </SectionTitle>
                <SectionBody>
                    <Grid
                        col={5}
                        mdCol={2}
                        smCol={1}
                        gap={20}
                    >
                        {

                            bestSeller.length > 0 && bestSeller.map((item, index) => (
                                <MyProductCard
                                    key={index}
                                    image={item.images[0] ?? noImages}
                                    name={item.name}
                                    price={Number(item.price)}
                                    slug={item.id}
                                />
                            ))
                        }
                    </Grid>
                </SectionBody>
            </Section>
            {/* end best selling section */}

            {/* new arrival section */}
            <Section extendClass="best_seller section__shadow">
                <SectionTitle>
                <img src={skirtImage} width="20" />Váy, Chân váy
                </SectionTitle>
                <SectionBody>
                    <Grid
                        col={5}
                        mdCol={2}
                        smCol={1}
                        gap={20}
                    >
                        {

                            skirt.length > 0 && skirt.map((item, index) => (
                                <MyProductCard
                                    key={index}
                                    image={item.variations[0].images[0] ? item.variations[0].images[0] : noImages}
                                    name={item.name}
                                    price={Number(item.variations[0].retail_price)}
                                    slug={item.custom_id}
                                />
                            ))
                        }
                    </Grid>
                </SectionBody>
            </Section>
            {/* end new arrival section */}

            {/* banner */}
            <Section>
                <SectionBody>
                    <Link to="/catalog">
                        <img src={banner} alt="" />
                    </Link>
                </SectionBody>
            </Section>
            {/* end banner */}

            {/* popular product section */}
            <Section>
                <SectionTitle>
                    phổ biến
                </SectionTitle>
                <SectionBody>
                    <Grid
                        col={4}
                        mdCol={2}
                        smCol={1}
                        gap={20}
                    >
                        {
                            productData.getProducts(12).map((item, index) => (
                                <ProductCard
                                    key={index}
                                    img01={item.image01}
                                    img02={item.image02}
                                    name={item.title}
                                    price={Number(item.price)}
                                    slug={item.slug}
                                />
                            ))
                        }
                    </Grid>
                </SectionBody>
            </Section>
            {/* end popular product section */}
        </Helmet>
    )
}

export default Home
