export const checkLength = (string,length,option)=>{
    switch(option){
        case 'e':
            return string.length==length
            break;
        case 'l':
            return string.length<length
            break;
        case 't':
            return string.length>length
            break;
        default: return string.length==length
    }
}