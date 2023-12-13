import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import { store } from "./app/store";
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.Fragment>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Provider store={store}>
                <GoogleOAuthProvider clientId="917043825977-g06mbr1dq0v6b6fclba6f4unuatk8m4n.apps.googleusercontent.com">
                    <App />
                </GoogleOAuthProvider>;
            </Provider>
        </BrowserRouter>
    </React.Fragment>
);

