import services from "../APIService";
import { formatRespone } from "../../utils/format";
import { useSelector } from "react-redux";

const productServices = {
  
    async getProducts(params){

        let rs = await services.get('products',params);
        //console.log(rs)
        return rs.data.content
        // return rs.data.data
    },
    async getProduct(params){
        let rs = await services.get('products/find/'+params);
        //console.log(rs)
        return rs.data.content        // return rs.data.data
    },
    async getProductAttributes(params){
        let rs = await services.get('/products/attributes',params)
        //console.log('atributes',rs)
        return rs.data.content
    }
  
}   
export default productServices;