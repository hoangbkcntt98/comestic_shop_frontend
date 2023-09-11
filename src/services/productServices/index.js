import services from "../APIService";
import { formatRespone } from "../../utils/format";
import { useSelector } from "react-redux";

const productServices = {
  async getProducts(params) {
    let rs = await services.get("products", params);
    return rs.data;
  },
  async getProduct(id) {
    let rs = await services.get("products/" + id);
    return rs.data; // return rs.data.data
  },
  async getProductProperties(params) {
    let rs = await services.get("/products.properties", params);
    // console.log('atributes',rs)
    return rs.data;
  },
  async getProductCategories(params) {
    let rs = await services.get("/products.categories", params);
    return rs.data;
  },
  getSyncProducts(params) {
    let rs = services.get("products", params);
    return rs;
  },
};
export default productServices;
