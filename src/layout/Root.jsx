import React from 'react'
import { Outlet } from 'react-router'
import Navber from '../components/Navber/Navber'

export default function 

() {
  return (
    <div>
      <Navber></Navber>
      <Outlet></Outlet>
        
    </div>
  )
}
