import React, { useRef, useState, useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import 'swiper/swiper-bundle.min.css'

// swiper core styles
import 'swiper/swiper.min.css'

// modules styles
import 'swiper/components/navigation/navigation.min.css'
import 'swiper/components/pagination/pagination.min.css'
import Button from '../../components/button/Button'

import { Link } from "react-router-dom";

// import Swiper core and required modules
import SwiperCore, {
  Autoplay,
  Navigation,
  Pagination
} from 'swiper';
import { set } from '../../redux/product-modal/productModalSlice'
import { useSelector, useDispatch } from 'react-redux'
import numberWithCommas from "../../utils/numberWithCommas";
import { sortByQuantity } from "../../utils/sort";
// install Swiper modules
SwiperCore.use([Navigation, Pagination, Autoplay]);


export default function Slider() {
  const dispatch = useDispatch()
  const productRedux = useSelector((state) => state.product.products)
  const content = "Sự hiện diện của những chiếc áo thun basic cổ tròn trong tủ đồ của bạn chính là chìa khóa giúp cho bạn có thêm nhiều outfit thú vị mà lại không cần đến quá nhiều món đồ. Áo thun nữ cotton cổ tròn basic chính là vũ khí tiện dụng cho các chị em trong trang phục hàng ngày!<br><br><br>Thiết kế đơn giản, form dáng tiện lợi của áo thun PPN4502. Tại sao chỉ với 1 chiếc áo thun nữ basic mà bạn có thể phối với 10 bộ độ khác nhau? Câu trả lời nằm ở chính sự đơn giản của chúng. Càng đơn giản, bạn lại càng dễ mix & match với những món đồ khác nhau.Áo thun nữ PPM4502 có thiết kế cổ tròn đơn giản, nhẹ nhàng tôn da. Tay cáo, form áo cũng không hề cầu kỳ, rất dễ mặc với nhiều thân hình khác nhau. Đặc biệt hơn, màu sắc của chiếc áo phông nữ cổ tròn này cũng rất nhã nhặn, trung tính, trơn màu. Sự tối giản từ thiết kế, đường may đến bảng màu giúp các chị em không cần đắn đo quá nhiều khi lựa chọn. Chất liệu cotton 95% được xử lý nghiêm ngặt, quy trình và công nghệ hiện đại nên mang tới cho chiếc áo sự thoải mái, mềm mại, thoáng mát ngay khi chạm vào. Cùng với đó, áo thun nữ cotton cổ tròn Yody có khả năng thâm shuts mồ hôi rất tốt nên người mặc không bị cảm giác bí bách, dính dính trên da khi đổ mồ hôi vào mùa hè. Bên cạnh đó, sản phẩm cũng chưa 5% spandex - loại sợi giúp co giãn, đàn hồi hiệu quả thích hợp mặc tới nhiều môi trường, ngay cả khi vận động <br><br><br> Sự hiện diện của những chiếc áo thun basic cổ tròn trong tủ đồ của bạn chính là chìa khóa giúp cho bạn có thêm nhiều outfit thú vị mà lại không cần đến quá nhiều món đồ. Áo thun nữ cotton cổ tròn basic chính là vũ khí tiện dụng cho các chị em trong trang phục hàng ngày!<br><br><br>Thiết kế đơn giản, form dáng tiện lợi của áo thun PPN4502. Tại sao chỉ với 1 chiếc áo thun nữ basic mà bạn có thể phối với 10 bộ độ khác nhau? Câu trả lời nằm ở chính sự đơn giản của chúng. Càng đơn giản, bạn lại càng dễ mix & match với những món đồ khác nhau.Áo thun nữ PPM4502 có thiết kế cổ tròn đơn giản, nhẹ nhàng tôn da. Tay cáo, form áo cũng không hề cầu kỳ, rất dễ mặc với nhiều thân hình khác nhau. Đặc biệt hơn, màu sắc của chiếc áo phông nữ cổ tròn này cũng rất nhã nhặn, trung tính, trơn màu. Sự tối giản từ thiết kế, đường may đến bảng màu giúp các chị em không cần đắn đo quá nhiều khi lựa chọn. Chất liệu cotton 95% được xử lý nghiêm ngặt, quy trình và công nghệ hiện đại nên mang tới cho chiếc áo sự thoải mái, mềm mại, thoáng mát ngay khi chạm vào. Cùng với đó, áo thun nữ cotton cổ tròn Yody có khả năng thâm shuts mồ hôi rất tốt nên người mặc không bị cảm giác bí bách, dính dính trên da khi đổ mồ hôi vào mùa hè. Bên cạnh đó, sản phẩm cũng chưa 5% spandex - loại sợi giúp co giãn, đàn hồi hiệu quả thích hợp mặc tới nhiều môi trường, ngay cả khi vận động" 
  useEffect(() => {
    if (productRedux.length > 0) {
      setData(productRedux.slice(0, 6))
    }
  }, [productRedux])
  const [data, setData] = useState();
  const SliderItem = (props) => {

    return (
      <div className="slider-item">

        <div className="slider-item__image">
          <img src={props.data.images[0]} alt="" />
          <div className="slider-item__info__price">
            <div className="slider-item__info__price__text1">
              Only
            </div>
            <div className="slider-item__info__price__text2">
              {numberWithCommas(props.data.price)} VND
            </div>
          </div>

        </div>
        <div className="slider-item__info">
          <div className="slider-item__info__name">{props.data.name}</div>
          <div className="slider-item__info__sku">SKU:{props.data.custom_id}</div>
          <div className="slider-item__info__description"  dangerouslySetInnerHTML={{ __html: content }}></div>

          <div className="slider-item__info__btn">
            <div className="slider-item__info__btn__item">

              <Link to={`/catalog/${props.data.custom_id}`}>
                <Button
                  size="sm"
                  icon="bx bx-search"
                  animate={true}
                >
                  Xem
                </Button>
              </Link>
            </div>
            <div className="slider-item__info__btn__item">
              <Button
                size="sm"
                icon="bx bxs-cart-add"
                animate={true}
                onClick={() => dispatch(set(props.data.custom_id))}
              >
                Thêm vào giỏ
              </Button>
            </div>
          </div>
        </div>

      </div>
    )
  }

  return (
    <>
      <Swiper
        navigation={true}
        className="my-slider"
        // slidesPerView={'auto'}
        pauseOnMouseEnter={true}
        pagination={{
          "clickable": true
        }}
        autoplay={{
          "delay": 2500,
          "disableOnInteraction": false,
          "pauseOnMouseEnter":true
        }}
        loop={true}
      >
        {data && data.length > 0 && data.map(item => <SwiperSlide><SliderItem data={item} /></SwiperSlide>)}
      </Swiper>
    </>
  )
}