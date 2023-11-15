import config from '../config'
import Login from "../views/pages/auth/login";
import SignUp from '../views/pages/auth/register';
import Layouts from "../layouts";
import home from "../views/home/home";
import UserProfile from '../views/user/userprofile';
import UserSetting from '../views/user/usersetting';
const publicRoutes = [
    { path: config.routes.login, component: Login, layout: null},
    { path: config.routes.register, component: SignUp, layout: null},
    { path: config.routes.home, component: home, layout: Layouts.DefaultLayout},
    { path: config.routes.userdetail, component: UserProfile, layout: Layouts.DefaultLayout},
    { path: config.routes.UserProfile, component: UserSetting, layout: Layouts.DefaultLayout},

]
const privateRoutes = [
]
export { publicRoutes, privateRoutes }