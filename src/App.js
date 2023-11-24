
import { Route, Routes } from 'react-router-dom'
import { publicRoutes } from "../src/router/routing";
import { Fragment } from "react";

//scss files
import './assets/css/bootstrap.min.css'
import './assets/css/typography.css'
import './assets/css/style.css';
import './assets/css/responsive.css'



function App() {
  return (

    <div className="App">
      <Routes>
        {publicRoutes.map((route, index) => {
          let Layout = Fragment;
          if (route.layout) {
            Layout = route.layout
          }
          const Page = route.component
          return <Route key={index} path={route.path} element={
            <Layout>
              <Page />
            </Layout>} />
        })}
      </Routes>
    </div>
  );
}
export default App;
