import React from "react";

import Helmet from "../components/helmet/Helmet";
import Section, {
  SectionBody,
  SectionTitle,
} from "../components/section/Section";
import Grid from "../components/grid/Grid";
import ProductCard from "../components/card/ProductCard";
import ProductView from "../components/product/ProductView";

import productData from "../assets/fake-data/products";
import { useDispatch, useSelector } from "react-redux";
import productServices from "../services/productServices";
import {
  addLinks,
  getProduct,
  setLinks,
  updateLinks,
} from "../redux/product/ProductSlice";
import MyProductCard from "../components/card/MyProductCard";
import MyProductview from "../components/product/MyProductview";
import Breadcrumb from "../components/bread-cumb/BreadCumb";
import Button from "../components/button/Button";
import { useHistory } from "react-router";
import { PROPERTY_COLOR, PROPERTY_SIZE } from "../utils/constant";
import { Status } from "../status";
const noImages = require("../assets/images/no-images.png").default;
const Product = (props) => {
  // const product = productData.getProductBySlug(props.match.params.slug)
  const products = useSelector((state) => state.product.products);
  const [product, setProduct] = React.useState();
  // const relatedProducts = productData.getProducts(8)
  const dispatch = useDispatch();
  const history = useHistory();
  React.useEffect(() => {
    let search = props.match.params.id;
    productServices.getProduct(search).then((res) => {
      if(res.status == Status.SUCCESS) {
        let item = JSON.parse(JSON.stringify(res.data));
        item.image = item.images[0];
        item.colors = item.properties.filter(property => property.type == PROPERTY_COLOR).map(property => property.name)
        item.sizes = item.properties.filter(property => property.type == PROPERTY_SIZE).map(property => property.name)
        setProduct(item);
      }
    });

    dispatch(
      setLinks([
        {
          display: "Sản Phẩm",
          link: localStorage.getItem("page")
            ? "/catalog?page=" + localStorage.getItem("page")
            : "/catalog",
        },
        {
          display: search,
          link: "#",
        },
      ])
    );
  }, []);

  return (
    <React.Fragment>
      {product && (
        <Helmet title={product.name}>
          <Section>
            <SectionBody>
              <Button
                size="sm"
                icon="bx bx-arrow-back"
                animate={true}
                margin={"mb"}
                onClick={() => {
                  window.history.back();
                }}
              >
                Trở về
              </Button>
              <MyProductview product={product} />
              {/* <ProductView product={product}/> */}
            </SectionBody>
          </Section>
        </Helmet>
      )}
      {!product && (
        <Section>
          <SectionBody>
            Không tìm thấy sản phẩm !!!.
          </SectionBody>
        </Section>
      )} 
    </React.Fragment>
  );
};

export default Product;
