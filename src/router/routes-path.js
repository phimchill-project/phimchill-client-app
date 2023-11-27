const routes = {
    login : '/login',
    register : "/register",
    home :"/",
    userdetail:"/user",
    UserProfile :"/usersetting",
    showMovie : "/category/:id/show-movies",
    showTvSeries : "/category/:id/show-tvseries",
    movie : "/movie",
    addMovie : "/add-movie",
    watchMovie : "/watch-movie/:name",
    watchTvShow : "/watch-tvshow/:name/:season_episode",
    error404: "/error404",
    tvSeries : "/tvSeries",
    movieDetail : "/movie-detail/:name",
}
export default routes;