import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearFilterRedux,
  filterProducts,
} from "../../redux/product/ProductSlice";
import {
  FILTER_BY_PRODUCT_PROPERTY,
  PROPERTY_COLOR,
  PROPERTY_SIZE,
} from "../../utils/constant";
import { fetchProperties } from "../../utils/utils";
// import colors from '../../assets/fake-data/product-color'
// import size from '../../assets/fake-data/product-size'
const SearchFilterItem = (props) => {
  const dispatch = useDispatch();
  const filterState = useSelector((state) => state.product.filter);
  const properties = useSelector((state) => state.product.properties);
  useEffect(() => {
    fetchProperties(dispatch);
  }, []);
  return (
    <React.Fragment>
      <div className="search-query__item__container">
        {properties
          .filter((property) => {
            return filterState.properties.includes(property.id) &&
              property.type == PROPERTY_COLOR
          })
          .map((item, index) => {
            // console.log(item)
            return (
              <button
                key={index}
                className={
                  "search-query__item__display bg-main-c-white hover-white-main"
                }
              >
                <span>{item.name}</span>
                <i
                  onClick={() =>
                    dispatch(
                      filterProducts({
                        type: FILTER_BY_PRODUCT_PROPERTY,
                        checked: false,
                        item: item.id,
                      })
                    )
                  }
                  className="bx bx-x"
                ></i>
              </button>
            );
          })}
        {properties
          .filter((property) => {
            return (
              filterState.properties.includes(property.id) &&
              property.type == PROPERTY_SIZE
            );
          })
          .map((item, index) => {
            // console.log(item)
            return (
              <button
                key={index}
                className={
                  "search-query__item__display bg-main-c-white hover-white-main"
                }
              >
                <span>{item.name}</span>
                <i
                  onClick={() =>
                    dispatch(
                      filterProducts({
                        type: FILTER_BY_PRODUCT_PROPERTY,
                        checked: false,
                        item: item.id,
                      })
                    )
                  }
                  className="bx bx-x"
                ></i>
              </button>
            );
          })}
        {filterState.properties.length > 0 && (
          <button
            onClick={() => dispatch(clearFilterRedux())}
            className="search-query__item__display bg-crimson-c-white hover-red"
          >
            {/* <span>Xoa tat ca</span> */}
            <i className="bx bx-trash"></i>
          </button>
        )}
      </div>
    </React.Fragment>
  );
};

export default SearchFilterItem;
