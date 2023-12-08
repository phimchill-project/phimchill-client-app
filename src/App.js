import { Route, Routes } from 'react-router-dom'
import {privateRoutes, publicRoutes} from "./router/routing";
import { Fragment } from "react";
import './assets/ui/css/bootstrap.min.css'
import './assets/ui/css/typography.css'
import './assets/ui/css/style.css'
import './assets/ui/css/responsive.css'

import './assets/ui/css/line-awesome.min.css'
import './assets/ui/css/fontawesome.css'

import './assets/chatwindow/style.css'
import './assets/common/style.css'

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
          {privateRoutes.map((route, index) => {
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
