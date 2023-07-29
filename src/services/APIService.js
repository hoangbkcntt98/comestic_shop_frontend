import API from './api';
const services = {
    async get(resources,param){
        // let params = param&&param.length!=0?param.map(e => {return '/'+e}):'';
        return await API.get(`${resources}`,{
            params:param
        })
    },
    async post(resources,param,data){
        let params = param&&param.length!=0?param.map(e => {return '/'+e}):'';
        return await API.post(`${resources}`+params,data)
    }
}
export default services;