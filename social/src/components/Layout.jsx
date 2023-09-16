import React from 'react'
import NavBarComponent from './NavBarComponent'
export default function Layout({children}) {
  return (
    <>
    <div className='h-full w-full flex'>
      <div className='h-full md:w-1/4 relative'>
      <NavBarComponent></NavBarComponent>
  
      </div>

      <div className='xs:w-full  md:w-[75%] flex h-full ' >
        {children}
      </div>
    </div>
    </>
  )
}
