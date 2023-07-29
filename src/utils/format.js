export const formatRespone = (res) =>{
    let temp = {
        message:undefined,
        status:undefined,
        data:undefined
    }
    temp.message = res.data.message;
    temp.status = res.data.status;
    temp.data = res.data.data;

    return temp
}
export const formatProduct = (product) =>{
    return {
        slug:product.custom_id,
        image:product.image,
        name:product.name,
        
    }
}