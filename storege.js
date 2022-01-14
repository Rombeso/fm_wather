export const STOREGE = {
    saveFavoriteCities: function (favoriteCities) {
        localStorage.setItem('storage', JSON.stringify(favoriteCities));
    },
    getFavoriteCities: function () {
        JSON.parse(localStorage.getItem('storage'));
    }
    // getCurrentCity: function () {
    //     console.log(favoriteCities);
    // }
}


