import {Route, Routes} from 'react-router-dom'
import {publicRoutes} from "../routing";
import {Fragment} from "react";

const LayoutsRoute = props => {
    return (
        <Routes>
            {publicRoutes.map((route, index) => {
                let Layout = Fragment;
                if (route.layout){
                    Layout = route.layout
                }
                const Page = route.component
                return <Route key={index} path={route.path} element={
                    <Layout>
                        <Page />
                    </Layout>} />
            })}
        </Routes>
    )
}
export default LayoutsRoute