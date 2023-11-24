import routes from './routes-path'
import Layouts from "../layouts/Layouts";
import UserProfile from '../views/ui/pages/user/Userprofile';
import UserSetting from '../views/ui/pages/user/Usersetting';
import ShowList from '../components/common/ShowList';
import AddMovie from '../views/dashboard/movie/AddMovie';
import MoviePage from "../views/ui/pages/MoviePage";
import Login from "../views/ui/pages/auth/Login";
import Home from "../views/ui/home/home";
import WatchMovie from "../views/ui/movie/watch-movie";
import TvshowDetails from "../views/ui/tvshow/watch-tvshow";
import Error404 from "../views/ui/error/error404";
import ShowTvseries from "../components/ListFilm/ShowTvSeries";
import Register from "../views/ui/pages/auth/Register";
import ShowDetail from '../components/common/ShowDetail';
const publicRoutes = [
    { path: routes.login, component: Login, layout: null },
    { path: routes.register, component: Register, layout: null },
    { path: routes.home, component: Home, layout: Layouts.DefaultLayout },
    { path: routes.userdetail, component: UserProfile, layout: Layouts.DefaultLayout },
    { path: routes.UserProfile, component: UserSetting, layout: Layouts.DefaultLayout },
    { path: routes.show, component: ShowList, layout: Layouts.DefaultLayout },
    { path: routes.movie, component: MoviePage, layout: Layouts.DefaultLayout },
    { path: routes.addMovie, component : AddMovie, layout : Layouts.DashBoardLayout },
    { path: routes.movieDetails, component: WatchMovie, layout: Layouts.DefaultLayout},
    { path: routes.tvshowDetails, component: TvshowDetails, layout: Layouts.DefaultLayout},
    { path: routes.error404, component: Error404, layout: null},
    { path: routes.tvSeries, component: ShowTvseries, layout: Layouts.DefaultLayout},
    { path: routes.movieInfo, component: ShowDetail, layout: Layouts.DefaultLayout}
]
const privateRoutes = [
]
export { publicRoutes, privateRoutes } 