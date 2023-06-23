import React from "react";
export const Element = ({ className }) => {
    return (
        <div
            style={{ backfaceVisibility: "hidden", outline: "1px solid transparent" }}
            className={`hidden md:block absolute h-50 w-300 bg-white z-0 transform -skew-x-12 -rotate-12 ${className}`}
        ></div>
    );
};


