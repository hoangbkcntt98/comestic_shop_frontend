import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import 'swiper/swiper-bundle.min.css'

// swiper core styles
import 'swiper/swiper.min.css'

// modules styles
import 'swiper/components/navigation/navigation.min.css'
import 'swiper/components/pagination/pagination.min.css'



// import Swiper core and required modules
import SwiperCore, {
    Autoplay,
    Navigation,
    Pagination
} from 'swiper';

// install Swiper modules
SwiperCore.use([Navigation]);


export default function ImageSlider(props) {
    React.useEffect(() => {
        console.log(props.images);
    }, [])
 

    return (
        <>
            <div className="product__images__slide">
                <Swiper
                    navigation={true}

                    // slidesPerView={'auto'}
                    // pagination={{
                    //     "clickable": true
                    // }}
                    // autoplay={{
                    //     "delay": 2500,
                    //     "disableOnInteraction": false
                    // }}
                    // loop={true}
                    spaceBetween={10}
                    slidesPerView={4}
                >
                    {props.images && props.images.map(img =>
                        <SwiperSlide>
                            <div className={`product__images__slide__item`}>
                                <img src={img.url} onClick={()=>{
                                    props.setImage(img.url)
                                    // props.setCode(img.code)
                                    }}></img>
                                <p>{img.code}</p>
                            </div>

                        </SwiperSlide>)}
                </Swiper>
            </div>

        </>
    )
}