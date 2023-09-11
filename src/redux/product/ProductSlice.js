import { createSlice } from "@reduxjs/toolkit";
import productServices from "../../services/productServices";
import { sortByQuantity } from "../../utils/sort";
import {
  FILTER_BY_PRODUCT_CATEGORY,
  FILTER_BY_PRODUCT_COLOR,
  FILTER_BY_PRODUCT_NAME,
  FILTER_BY_PRODUCT_PROPERTY,
  FILTER_BY_PRODUCT_SIZE,
} from "../../utils/constant";
import { listSearchOther } from "../../utils/utils";
const initialState = {
  filter: {
    category: 0,
    color: [],
    size: [],
    name: "",
    properties: [],
  },
  links: [],
  products: [],
  isLoading: false,
  page: undefined,
  total_pages: 1,
  product: "",
  categories: [],
  colors: [],
  sizes: [],
  properties: [],
};

export const product = createSlice({
  name: "product",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setTotalPage: (state, action) => {
      state.total_pages = action.payload;
    },
    setProducts: (state, action) => {
      state.products = sortByQuantity(action.payload);
    },
    setProduct: (state, action) => {
      state.product = state.products.find(
        (item) => item.custom_id == action.payload
      );
    },
    getProduct: (state, action) => {
      return state.product;
    },
    clearFilterRedux: (state, action) => {
      state.filter = initialState.filter;
    },
    // filter products by properties
    filterProducts: (state, action) => {
      const { type, checked, filterObject } = action.payload;
      var filter = state.filter;
      var properties = state.filter.properties;

      switch (type) {
        case FILTER_BY_PRODUCT_NAME:
          state.filter.name = checked ? filterObject : "";
          break;
        case FILTER_BY_PRODUCT_CATEGORY:
          state.filter.category = filterObject;
          break;
        case FILTER_BY_PRODUCT_PROPERTY:
          state.filter.properties = checked
          ? [...properties, filterObject]
          : listSearchOther(filter.properties, filterObject);
        default:
      }
    },
    addLinks: (state, action) => {
      state.links = [...state.links, action.payload];
      console.log(state.links);
    },
    updateLinks: (state, action) => {
      state.links.pop();
      state.links = [...state.links, action.payload];
    },
    setLinks: (state, action) => {
      state.links = action.payload;
    },
    setProperties: (state, action) => {
      state.properties = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  filterProducts,
  setCategories,
  clearFilterRedux,
  addLinks,
  updateLinks,
  setLinks,
  setProducts,
  setLoading,
  setTotalPage,
  setProduct,
  getProduct,
  setPage,
  setProperties,
} = product.actions;

export default product.reducer;
