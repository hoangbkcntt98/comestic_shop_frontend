import React, {
  useCallback,
  useState,
  useEffect,
  useRef,
  Fragment,
} from "react";

import Helmet from "../components/helmet/Helmet";
import CheckBox from "../components/checkbox/CheckBox";

import productData from "../assets/fake-data/products";
// import colors from '../assets/fake-data/product-color'
// import size from '../assets/fake-data/product-size'
import Button from "../components/button/Button";
import InfinityList from "../components/list/InfinityList";
import FilterBar from "../components/nav-link/FilterBar";
import { useSelector, useDispatch } from "react-redux";
import {
  addLinks,
  clearFilterRedux,
  filterProducts,
  setProducts,
  product,
  setLinks,
  setLoading,
  setTotalPage,
  setProperties,
} from "../redux/product/ProductSlice";
import SearchName from "../components/search/SearchName";
import Breadcrumb from "../components/bread-cumb/BreadCumb";
import productServices from "../services/productServices";
import { RingLoader } from "react-spinners";
import MyInfinityList from "../components/list/MyInfinityList";
import {
  FILTER_BY_PRODUCT_COLOR,
  FILTER_BY_PRODUCT_PROPERTY,
  FILTER_BY_PRODUCT_SIZE,
  PROPERTY_COLOR,
  PROPERTY_SIZE,
  TOTAL_PAGE,
} from "../utils/constant";
import Section, { SectionBody } from "../components/section/Section";
import { Link } from "react-router-dom";
import Grid from "../components/grid/Grid";
import PolicyCard from "../components/card/PolicyCard";
import policy from "../assets/fake-data/policy";
const Catalog = (props) => {
  const store = useSelector((state) => state.product);
  const filterState = useSelector((state) => state.product.filter);
  const products = useSelector((state) => state.product.products);

  const [productList, setProductList] = useState([]);
  const isLoading = useSelector((state) => state.product.isLoading);
  const [colors, setColors] = useState([]);
  const [size, setSize] = useState([]);
  const properties = store.properties;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLoading(true));
    productServices.getSyncProducts().then((res) => {
      setProductList(res.data.data);
    });
    console.log("fetch dat ");
    dispatch(setLoading(false));
  }, []);

  const filterSelect = (type, checked, propertyID) => {
    const filterData = {
      type: type,
      checked: checked,
      filterObject: propertyID,
    };
    dispatch(filterProducts(filterData));
  };

  // update products by filters
  useEffect(() => {
    let temp = products;
    if (filterState.name.length > 0) {
      temp = temp.filter((e) => e.name.includes(filterState.name));
    }
    if (filterState.category > 0) {
      temp = temp.filter((e) => {
        let isContainCategory = e.categories.find((category) => {
          return category.id == filterState.category;
        });
        return isContainCategory != undefined;
      });
    }

    if (filterState.properties.length > 0) {
      temp = temp.filter((e) => {
        // var isContainProperty = e.properties.find((per))
        const check = e.properties.find((property) =>
          filterState.properties.includes(property.id)
        );
        return check !== undefined;
      });
    }

    setProductList(temp);
  }, [filterState]);

  const filterRef = useRef(null);
  const [open, setOpen] = useState(false);
  const showHideFilter = () => {
    filterRef.current.classList.toggle("active");
    setOpen(!open);
  };
  return (
    <Fragment>
      <div className="catalog-policy">
        <Section>
          <SectionBody>
            <Grid col={4} mdCol={2} smCol={1} gap={20}>
              {policy.map((item, index) => (
                <Link key={index} to="/policy">
                  <PolicyCard
                    name={item.name}
                    description={item.description}
                    icon={item.icon}
                  />
                </Link>
              ))}
            </Grid>
          </SectionBody>
        </Section>
      </div>

      <Helmet title="Sản phẩm">
        <div className="catalog">
          <div
            className={
              open ? "catalog__filter__close show" : "catalog__filter__close"
            }
            onClick={showHideFilter}
          >
            <i className="bx bx-x"></i>
          </div>
          <div className="catalog__filter" ref={filterRef}>
            <div className="catalog__filter__widget">
              <div className="catalog__filter__widget__title catalog__filter__widget__title__category">
                DANH MUC
              </div>

              <div className="catalog__filter__widget__content">
                <FilterBar />
              </div>
            </div>
            <div className="catalog__filter__widget__title catalog__filter__widget__title__category">
              BO LOC
            </div>
            <div className="catalog__filter__widget">
              <div className="catalog__filter__widget__title">màu sắc</div>
              <div className="catalog__filter__widget__content">
                {properties
                  .filter((property) => property.type == PROPERTY_COLOR)
                  .map((item, index) => (
                    <div
                      key={index}
                      className="catalog__filter__widget__content__item"
                    >
                      <CheckBox
                        label={item.name}
                        onChange={(input) =>
                          filterSelect(
                            FILTER_BY_PRODUCT_PROPERTY,
                            input.checked,
                            item.id
                          )
                        }
                        checked={filterState.properties.includes(item.id)}
                      />
                    </div>
                  ))}
              </div>
            </div>

            <div className="catalog__filter__widget">
              <div className="catalog__filter__widget__title">kích cỡ</div>
              <div className="catalog__filter__widget__content">
                {properties
                  .filter((property) => property.type == PROPERTY_SIZE)
                  .map((item, index) => (
                    <div
                      key={index}
                      className="catalog__filter__widget__content__item"
                    >
                      <CheckBox
                        label={item.name}
                        onChange={(input) =>
                          filterSelect(
                            FILTER_BY_PRODUCT_PROPERTY,
                            input.checked,
                            item.id
                          )
                        }
                        checked={filterState.properties.includes(item.id)}
                      />
                    </div>
                  ))}
              </div>
            </div>

            <div className="catalog__filter__widget">
              <div className="catalog__filter__widget__content">
                <Button
                  size="sm"
                  onClick={() => {
                    dispatch(clearFilterRedux());
                  }}
                >
                  xóa bộ lọc
                </Button>
              </div>
            </div>
          </div>
          <div className="catalog__filter__toggle">
            <Button size="sm" onClick={() => showHideFilter()}>
              bộ lọc
            </Button>
          </div>
          <div className="catalog__content">
            <SearchName />
            {isLoading == true && (
              <div className="catalog__content__loading">
                <RingLoader loading={true} size={50} />
                <h3>Đang tải dữ liệu sản phẩm ....</h3>
              </div>
            )}

            {productList.length > 0 && isLoading == false && (
              <Fragment>
                <MyInfinityList data={productList} total={productList.length} />
              </Fragment>
            )}
          </div>
        </div>
      </Helmet>
    </Fragment>
  );
};

export default Catalog;
