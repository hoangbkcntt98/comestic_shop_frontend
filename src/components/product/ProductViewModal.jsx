import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import Button from "../button/Button";
import { remove } from "../../redux/product-modal/productModalSlice";
import MyProductview from "./MyProductview";
import Product from "../../pages/Product";
import productServices from "../../services/productServices";
import { Status } from "../../status";
import { PROPERTY_COLOR, PROPERTY_SIZE } from "../../utils/constant";

const ProductViewModal = () => {
  const productId = useSelector((state) => state.productModal.value);
  const dispatch = useDispatch();

  const [product, setProduct] = useState(undefined);

  useEffect(() => {
    console.log(productId)
    productServices.getProduct(productId).then((res) => {
      if (res.status == Status.SUCCESS) {
        let item = JSON.parse(JSON.stringify(res.data));
        item.image = item.images[0];
        item.colors = item.properties
          .filter((property) => property.type == PROPERTY_COLOR)
          .map((property) => property.name);
        item.sizes = item.properties
          .filter((property) => property.type == PROPERTY_SIZE)
          .map((property) => property.name);
        setProduct(item);
      }else {
        setProduct(undefined)
      }
    });
  }, [productId]);

  return (
    <div
      className={`product-view__modal ${product === undefined ? "" : "active"}`}
    >
      <div className="product-view__modal__content">
        {product && <MyProductview product={product} />}
        <div className="product-view__modal__content__close">
          <Button size="sm" onClick={() => dispatch(remove())}>
            đóng
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductViewModal;
