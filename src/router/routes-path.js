const routes = {
    login : '/login',
    register : "/register",
    home :"/",
    userdetail:"/user",
    UserProfile :"/usersetting",
    categoryMovie : "/category/:id/show-movies",
    categoryTvSeries : "/category/:id/show-tvseries",
    movie : "/movie",
    watchMovie : "/watch-movie/:name",
    watchTvShow : "/watch-tvshow/:name/:season_episode",
    error404: "/error404",
    tvSeries : "/tvSeries",
    movieDetail : "/movie-detail/:name",
    test :"/dashBoard",
    favoriteMovies : "/favorite-movies",
    favoriteTvSeries : "/favorite-tvseries",
    search : "/search",

    addMovie : "/admin/add-movie",
    addTvSeries: "/admin/add-tvSeries",
    updateTvSeries: '/admin/update-tvSeries/:name'
}
export default routes;