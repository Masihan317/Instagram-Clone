import React from 'react'
import Home from './Home'
import Notifications from './Notifications'
import Create from './Create'
import Profile from './Profile'
import Search from './Search'

const SidebarItems = () => {
  return (
    <>
      <Home />
      <Search />
      <Notifications />
      <Create />
      <Profile />
    </>
  )
}

export default SidebarItems