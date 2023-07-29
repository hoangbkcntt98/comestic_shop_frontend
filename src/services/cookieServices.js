import Cookies from 'universal-cookie';
const cookie = new Cookies();
const CookieService = {
    get(key){
        return cookie.get(key);

    },
    set(key,val,option){
        return cookie.set(key,val,option?option:{path:'/'})
    },
    getAll(){
        return cookie.getAll()
    }
}
export default CookieService;
