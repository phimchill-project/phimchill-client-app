import routes from './routes-path'
import Login from "../views/ui/pages/auth/login";
import Register from '../views/ui/pages/auth/Register';
import Layouts from "../layouts/Layouts";
import home from "../views/ui/home/home";
import UserProfile from '../views/ui/pages/user/userprofile';
import UserSetting from '../views/ui/pages/user/usersetting';
import ShowList from '../components/common/ShowList';
import MoviePage from '../views/ui/pages/MoviePage';
import AddMovie from '../views/dashboard/movie/AddMovie';

const publicRoutes = [
    { path: routes.login, component: Login, layout: null },
    { path: routes.register, component: Register, layout: null },
    { path: routes.home, component: home, layout: Layouts.DefaultLayout },
    { path: routes.userdetail, component: UserProfile, layout: Layouts.DefaultLayout },
    { path: routes.UserProfile, component: UserSetting, layout: Layouts.DefaultLayout },
    { path: routes.show, component: ShowList, layout: Layouts.DefaultLayout },
    { path: routes.movie, component: MoviePage, layout: Layouts.DefaultLayout },
    { path: routes.addMovie, component : AddMovie, layout : Layouts.DashBoardLayout }
]
const privateRoutes = [
]
export { publicRoutes, privateRoutes }