export const sortByQuantity = (arr) =>{
    arr = arr.slice().sort((a,b) => a.quantity-b.quantity>0?-1:1)
    return arr
}