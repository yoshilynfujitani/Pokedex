import React, { useState } from 'react'
import axios from 'axios';

const Card = ({ data, loading, infopokemon}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const cardClasses = `transition cursor-pointer shadow-md rounded-lg px-5 py-5 backdrop-blur-md bg-slate-100/40 hover:scale-[1.15] ${
    isHovered ? 'z-10' : 'z-0'
  }`;

  
  

 

  return (
    <>
      { loading ? <h1>Loading</h1> : <div className={cardClasses} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <p>{data.url}</p>
        <img src={data.sprites.other['official-artwork'].front_default} alt="" className='w-32 h-32 md:w-48 md:h-48' />
       <p className="transition  cursor-pointer text-xl font-bold  hover:"> {data.name.charAt(0).toUpperCase() + data.name.slice(1)}</p>
      </div>}
    </>
  )
}

export default Card