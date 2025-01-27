"use client";

import { Session } from 'next-auth'
import React from 'react'
import { Button } from '../ui/button'
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { LogIn, LogOut } from "lucide-react"


const UserButtom = ({user} : Session) => {
  return (
    <div>
        {user?.email}
        {user?.email? (
            <Button variant={"destructive"} onClick={() => signOut()}><LogOut/> <span>Logout</span></Button>
        ): (
            <Button asChild>
                <Link href={'/auth/login'}> <LogIn/><span>Login</span> </Link>
            </Button>
        )}
    </div>
  )
}

export default UserButtom