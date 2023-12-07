import routes from './routes-path'
import Login from "../views/ui/pages/auth/Login";
import Register from '../views/ui/pages/auth/Register';
import Layouts from "../layouts/Layouts";

import UserProfile from '../views/ui/pages/user/Userprofile';
import UserSetting from '../views/ui/pages/user/Usersetting';
import CategoryMovie from '../views/ui/movie/CategoryMovie';
import CategoryTvSeries from '../views/ui/tvshow/CategoryTvSeries';
import MoviePage from '../views/ui/pages/MoviePage';
import AddMovie from '../views/dashboard/movie/AddMovie';
import WatchMovie from "../views/ui/movie/watch-movie";
import WatchTvSeries from "../views/ui/tvshow/watch-tvshow";
import Error404 from "../views/ui/error/error404";
import ShowTvseries from "../components/ListFilm/ShowTvSeries";
import Home from "../views/ui/home/home"
import FavoriteMovie from "../views/ui/movie/FavoriteMovie";
import FavoriteTvSeries from "../views/ui/tvshow/FavoriteTvSeries";
import MovieDetail from '../components/common/MovieDetail ';
import Search from "../views/ui/search/search";
import AddTvSeries from "../views/dashboard/tvseries/addTvSeries";
import UpdateTvSeries from "../views/dashboard/tvseries/updateTvSeries";

const publicRoutes = [
    { path: routes.login, component: Login, layout: null },
    { path: routes.register, component: Register, layout: null },

    { path: routes.userdetail, component: UserProfile, layout: Layouts.DefaultLayout },
    { path: routes.UserProfile, component: UserSetting, layout: Layouts.DefaultLayout },
    { path: routes.categoryMovie, component: CategoryMovie, layout: Layouts.DefaultLayout },
    { path: routes.categoryTvSeries, component: CategoryTvSeries, layout: Layouts.DefaultLayout },
    { path: routes.movie, component: MoviePage, layout: Layouts.DefaultLayout },
    { path: routes.watchMovie, component: WatchMovie, layout: Layouts.DefaultLayout},
    { path: routes.watchTvShow, component: WatchTvSeries, layout: Layouts.DefaultLayout},
    { path: routes.error404, component: Error404, layout: null},
    { path: routes.tvSeries, component: ShowTvseries, layout: Layouts.DefaultLayout},
    { path: routes.movieDetail, component: MovieDetail, layout: Layouts.DefaultLayout},
    {path: routes.home,component:Home, layout: Layouts.DefaultLayout},

    { path: routes.favoriteMovies, component: FavoriteMovie, layout: Layouts.DefaultLayout},
    { path: routes.favoriteTvSeries, component: FavoriteTvSeries, layout: Layouts.DefaultLayout},
    { path: routes.search, component: Search, layout: Layouts.DefaultLayout},
]
const privateRoutes = [
    { path: routes.addMovie, component : AddMovie, layout : Layouts.DashBoardLayout },
    { path: routes.addTvSeries, component : AddTvSeries, layout : Layouts.DashBoardLayout },
    { path: routes.updateTvSeries, component : UpdateTvSeries, layout : Layouts.DashBoardLayout },
]
export { publicRoutes, privateRoutes }