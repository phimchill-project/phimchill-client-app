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
<<<<<<< HEAD
    allMovies:"/admin/movies",
    updateMovies:"admin/movies/update/:movieName",
    deleteMovies:"admin/movies"
=======
    addMovie : "/admin/add-movie",
    addTvSeries: "/admin/add-tvSeries",
    updateTvSeries: '/admin/update-tvSeries/:name',
    movieHistory : "/movieHistory"
>>>>>>> 687a795232bdf880cade65b0a58f36616cb3cd61
}
export default routes;