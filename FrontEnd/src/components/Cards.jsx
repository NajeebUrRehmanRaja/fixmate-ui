import React from "react";

const Cards = ({ title, content, icon }) => {
  return (
    <div className="bg-gray-900 shadow-lg p-5 rounded-lg ">
      <div>
        {icon}
        <h2 className="text-xl font-bold mb-2 mt-2 ">{title}</h2>
        <p className=" ">{content}</p>
      </div>
    </div>
  );
};

export default Cards;
