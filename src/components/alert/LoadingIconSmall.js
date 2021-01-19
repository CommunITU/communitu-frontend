import React from "react";


const LoadingIconSmall = (props) => {


    let style = props.style ? props.style : {width: "20px", height: "20px"}
    return (
        <div className="text-center">
            <img alt="loading" style={style}
                 src={require("../../assets/images/loading.gif").default}></img>
        </div>

    )
}

export default LoadingIconSmall