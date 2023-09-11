import services from "../APIService";
import { formatRespone } from "../../utils/format";
const userServices = {
    async fetchUser(){
        let rs = await services.get('user/auth/google/success')
        console.log(rs)
        return rs
    },
    async getUser(userId){
        let rs = await services.get('users',userId);
        // console.log(rs)
        return rs
    },
    async login(loginData){
        let res = await services.post('login',null,loginData);
        return formatRespone(res)
    },
    async loginWithGoole(token) {

    },
    async signup(registerData){
        let res = await services.post('user/signup',null,registerData);
        return res;
    },
    async loginWithFb(){
        let url = 'https://minishop-node-server.herokuapp.com/user/auth/facebook';
        let res = await services.get(url)
        console.log(res)
        return res;
    }
}
export default userServices;