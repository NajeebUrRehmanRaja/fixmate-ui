import React from 'react'

const Cards = ({ title, content, icon}) =>{
    return (
      <div className="bg-black shadow-lg p-10 w-full mx-auto rounded-lg ">
        <div className="text-center w-[350px]">
            {icon}
          <h2 className="text-xl font-bold mb-2 ">{title}</h2>
          <p className="text-white  ">{content}</p>
        </div>
      </div>
    );
}

export default Cards