import React from 'react'
import NaveLogo from './nav-logo'
import UserButtom from './user-buttom'
import { auth } from '@/server/auth'

const AppNav = async () => {
    const session = await auth();
    console.log(session);
  return (
    <div className='flex justify-between items-center p-4'>
        <NaveLogo />
        <UserButtom user={session?.user} expires={session?.expires!}/>
    </div>
  )
}

export default AppNav