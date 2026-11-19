import React from 'react'
import Navbar from './Components/Navbar'
function App() {
  return (
    <div>
      
        <Navbar title="My App" color="blue" links={["Home", "About", "Services", "Blogs"]}/>
        <Navbar title="My App" color="red" links={["Home", "Menu", "Services", "Blogs", "Contact"]}/>
        <Navbar title="My App" color="green" links={["Home", "Contact", "Services", "Blogs"]}/>
    </div>
  )
}

export default App
