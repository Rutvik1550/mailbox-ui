import React from 'react';
import SideBar from '../components/mailbox/Sidebar';
import { Outlet } from 'react-router-dom';

export const MainLayout = () => {
  return (
    <div>
        <SideBar />
        <Outlet />
    </div>
  )
}
