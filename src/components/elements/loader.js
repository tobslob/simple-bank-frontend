import React from "react";

function Loader() {
  return (
    <div className="h-56 w-full flex justify-center items-center">
      {/*<svg className="animate-spin text-primary h-10 w-10 " ><!-- ... --> </svg>*/}
      <div className="items-center flex animate-bounce   justify-center rounded-full w-14 h-14 bg-gradient-to-tr from-secondary to-primary">
        <div className="h-9 w-9 rounded-full bg-gray-200 animate-spin"></div>
      </div>
    </div>
  );
}

export default Loader;
