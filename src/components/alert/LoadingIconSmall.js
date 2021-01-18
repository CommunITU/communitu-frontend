import React from "react";


const LoadingIconSmall = (props) => {

    return (
        <div className="text-center">
            <img alt="loading" style={{width: "20px", height: "20px"}}
                 src={require("../../assets/images/loading.gif").default}></img>
        </div>

    )
}

export default LoadingIconSmall