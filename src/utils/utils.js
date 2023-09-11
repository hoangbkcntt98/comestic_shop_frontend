import { useDispatch } from "react-redux";
import productServices from "../services/productServices";
import { FILTER_BY_PRODUCT_CATEGORY, TOTAL_PAGE } from "./constant";
import {
  filterProducts,
  setCategories,
  setProducts,
  setProperties,
  setTotalPage,
  updateLinks,
} from "../redux/product/ProductSlice";

export const isEmpty = (arr) => {
  if (arr == undefined || arr.length == 0) return true;
  return false;
};
export const listSearchOther = (arr, element) => {
  return arr && arr.length > 0 && arr.filter((item) => item != element);
};

export const listSearch = (arr, element) => {
  return arr && arr.length > 0 && arr.filter((item) => item == element);
};
export const printLog = (data) => {
  console.log(data);
};
// Fetch Data
export const fetchData = (dispatch) => {
  productServices.getProductCategories().then((res) => {
    dispatch(setCategories(res.data));
  });
  productServices.getProductProperties().then((res) => {
    dispatch(setProperties(res.data));
  });
  productServices.getProducts().then((res) => {
    dispatch(setProducts(res.data));
    dispatch(setTotalPage(parseInt(res.params.total_pages / TOTAL_PAGE) + 1));
  });
};

export const fetchDataWhileEmpty = (dispatch, store) => {
  let categories = store.categories;
  let properties = store.properties;
  let products = store.products;
  if (isEmpty(categories)) {
    fetchCategories(dispatch);
  }
  if (isEmpty(properties)) {
    fetchProperties(dispatch);
  }
  if (isEmpty(products)) {
    fetchProducts(dispatch);
  }
};

export const fetchProducts = (dispatch) => {
  productServices.getProducts().then((res) => {
    dispatch(setProducts(res.data));
    dispatch(setTotalPage(parseInt(res.params.total_pages / TOTAL_PAGE) + 1));
  });
};

export const fetchCategories = (dispatch) => {
  productServices.getProductCategories().then((res) => {
    dispatch(setCategories(res.data));
  });
};

export const fetchProperties = (dispatch) => {
  productServices.getProductProperties().then((res) => {
    dispatch(setProperties(res.data));
  });
};

export const updateProductListByCategory = (dispatch, category) => {
  dispatch(
    updateLinks({
      display: category.name,
      link: "/catalog",
    })
  );
  dispatch(
    filterProducts({
      type: FILTER_BY_PRODUCT_CATEGORY,
      checked: true,
      filterObject: category.id,
    })
  );
}