import config from '../config'
import Login from "../views/ui/pages/auth/login";
import SignUp from '../views/ui/pages/auth/register';
import Layouts from "../layouts";
import home from "../views/ui/home/home";
import UserProfile from '../views/ui/user/userprofile';
import UserSetting from '../views/ui/user/usersetting';
import ShowList from '../components/common/ShowList';
import MovieDetails from "../views/ui/movie/movie-details";
import TvshowDetails from "../views/ui/tvshow/tvshow-details";
const publicRoutes = [
    { path: config.routes.login, component: Login, layout: null},
    { path: config.routes.register, component: SignUp, layout: null},
    { path: config.routes.home, component: home, layout: Layouts.DefaultLayout},
    { path: config.routes.userdetail, component: UserProfile, layout: Layouts.DefaultLayout},
    { path: config.routes.UserProfile, component: UserSetting, layout: Layouts.DefaultLayout},
    { path: config.routes.show, component: ShowList, layout: Layouts.DefaultLayout},
    { path: config.routes.movieDetails, component: MovieDetails, layout: Layouts.DefaultLayout},
    { path: config.routes.tvshowDetails, component: TvshowDetails, layout: Layouts.DefaultLayout},
]
const privateRoutes = [
]
export { publicRoutes, privateRoutes }