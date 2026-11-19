import React from 'react'

function Navbar(props) {
  
  return (
    <div style={{ backgroundColor: props.color }} className='bg-blue-700 flex items-center justify-between text-white px-8 py-3'>
      <h2>{props.title}</h2>
      <div className='flex gap-8'>
        {props.links.map((link, index) => (
          <a key={index} href="#" className='hover:text-gray-300'>{link}</a>
        ))} 
      </div>
    </div>
  )
}

export default Navbar