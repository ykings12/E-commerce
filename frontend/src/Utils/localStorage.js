//add a product to local storage
export const addFavoriteToLocalStorage=(product)=>{
    const favorites=getFavoritesFromLocalStorage();
    if(!favorites.some((p)=>p._id===product._id)){
        favorites.push(product);
        localStorage.setItem('favorites',JSON.stringify(favorites));
    }
}

//remove  product from a localstorage

export const removeFavoriteFromLocalStorage=(productID)=>{
    const favorites=getFavoritesFromLocalStorage();
    const updateFavorites=favorites.filter(
        (product)=>product._id!== productID
    );
    localStorage.setItem("favorites",JSON.stringify(updateFavorites));
}


//retrieve fav from localstorage
export const getFavoritesFromLocalStorage=()=>{
    const favoritesJSON=localStorage.getItem("favorites");
    return favoritesJSON?JSON.parse(favoritesJSON):[];
}