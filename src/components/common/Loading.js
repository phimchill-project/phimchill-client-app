import {RotatingLines} from "react-loader-spinner";
import React from "react";

function loading() {
    return(
        <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
            <RotatingLines
                strokeColor="red"
                strokeWidth="5"
                animationDuration="0.75"
                width="96"
                visible={true}
            />
        </div>
    );
}

export default loading;