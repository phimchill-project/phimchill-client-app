import { Route, Routes } from 'react-router-dom'
import { publicRoutes } from "./router/routing";
import { Fragment } from "react";

import './assets/ui/css/bootstrap.min.css'
import './assets/ui/css/typography.css'
import './assets/ui/css/style.css'
import './assets/ui/css/responsive.css'

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
            </Layout>
          } />
        })}
      </Routes>
    </div>
  );
}
export default App;
