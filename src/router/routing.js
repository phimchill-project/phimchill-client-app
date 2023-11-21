import routes from './routes-path'
import Layouts from "../layouts/Layouts";
import ShowList from '../components/common/ShowList';
import AddMovie from '../views/dashboard/movie/AddMovie';
import MoviePage from "../views/ui/pages/MoviePage";
import {Login} from "../api/authApi/authApi";
import Register from "../views/ui/pages/auth/register";
import UserProfile from "../views/ui/user/userprofile";
import UserSetting from "../views/ui/user/usersetting";
import Home from "../views/ui/home/home";
import MovieDetails from "../views/ui/movie/movie-details";
import TvshowDetails from "../views/ui/tvshow/tvshow-details";

const publicRoutes = [
    { path: routes.login, component: Login, layout: null },
    { path: routes.register, component: Register, layout: null },
    { path: routes.home, component: Home, layout: Layouts.DefaultLayout },
    { path: routes.userdetail, component: UserProfile, layout: Layouts.DefaultLayout },
    { path: routes.UserProfile, component: UserSetting, layout: Layouts.DefaultLayout },
    { path: routes.show, component: ShowList, layout: Layouts.DefaultLayout },
    { path: routes.movie, component: MoviePage, layout: Layouts.DefaultLayout },
    { path: routes.addMovie, component : AddMovie, layout : Layouts.DashBoardLayout },
    { path: routes.movieDetails, component: MovieDetails, layout: Layouts.DefaultLayout},
    { path: routes.tvshowDetails, component: TvshowDetails, layout: Layouts.DefaultLayout}
]
const privateRoutes = [
]
export { publicRoutes, privateRoutes }