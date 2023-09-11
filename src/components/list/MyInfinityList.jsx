import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import Grid from "../grid/Grid";
import ProductCard from "../card/ProductCard";
import MyProductCard from "../card/MyProductCard";
import SearchFilterItem from "../search/SearchFilterItem";
import { useSelector } from "react-redux";
const noImages = require("../../assets/images/no-images.png").default;
const MyInfinityList = (props) => {
  const perLoad = 12; // items each load

  const listRef = useRef(null);

  const [data, setData] = useState([]);

  const [load, setLoad] = useState(true);

  const [index, setIndex] = useState(0);

  const filter = useSelector((state) => state.product.filter);

  const categories = useSelector((state) => state.product.categories);

  const [breadcrumb, setBreadcrumb] = useState('');

  useEffect(() => {
    setData(props.data.slice(0, perLoad));
    setIndex(1);
  }, [props.data]);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (listRef && listRef.current) {
        if (
          window.scrollY + window.innerHeight >=
          listRef.current.clientHeight + listRef.current.offsetTop + 200
        ) {
          console.log("bottom reach");
          setLoad(true);
        }
      }
    });
  }, [listRef]);

  useEffect(() => {
    setBreadcrumb(makeBreadcrumb(filter.category));
  }, [filter.category]);

  useEffect(() => {
    const getItems = () => {
      const pages = Math.floor(props.data.length / perLoad);
      const maxIndex = props.data.length % perLoad === 0 ? pages : pages + 1;

      if (load && index <= maxIndex) {
        const start = perLoad * index;
        const end = start + perLoad;

        setData(data.concat(props.data.slice(start, end)));
        setIndex(index + 1);
      }
    };
    getItems();
    setLoad(false);
  }, [load, index, data, props.data]);

  const makeBreadcrumb = (categorieId) => {
    var category = categories.find((cate) => cate.id == categorieId);
    var breadcrumb;
    if (category) {
      if (category.parentId > 0) {
        var parent = categories.find((cate) => cate.id == category.parentId);
        if(parent){
          breadcrumb = `${category.name}/${parent.name}`
        }
      }
      breadcrumb = category.name;
    }
    return breadcrumb;
  };

  return (
    <div ref={listRef}>
      <div className="row" style={{ padding: "0 1rem 1rem 1rem" }}>
        <h2>Category : {breadcrumb}</h2>
        <p>Tổng số sản phẩm : {props.total}</p>
        <SearchFilterItem />
      </div>

      <Grid col={4} mdCol={2} smCol={1} gap={20}>
        {data.map((item, index) => (
          <MyProductCard
            key={index}
            image={item.images[0]}
            name={item.name}
            price={Number(item.price)}
            slug={item.id}
          />
        ))}
      </Grid>
    </div>
  );
};

MyInfinityList.propTypes = {
  data: PropTypes.array.isRequired,
};

export default MyInfinityList;
