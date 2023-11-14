import config from '../config'
import Login from "../pages/auth/login";
import SignUp from '../pages/auth/register';
import ShowList from '../components/common/ShowList';

const publicRoutes = [
    { path: config.routes.login, component: Login, layout: null},
    { path: config.routes.register, component: SignUp, layout: null},
    { path: config.routes.showlist, component: ShowList, layout: null},
]
const privateRoutes = [
]
export { publicRoutes, privateRoutes }