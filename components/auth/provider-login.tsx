"use client";

import React from 'react'
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";
import { Button } from '../ui/button';
import { signIn } from 'next-auth/react';

const ProviderLogin = () => {
  return (
    <div className='w-full flex flex-col space-y-4'>
      <Button variant={"outline"} 
        onClick={() => signIn("google", {
        redirect: false,
        callbackUrl: "/",
      })}>LogIn with google<FcGoogle /></Button>
      <Button variant={"outline"}
        onClick={() => signIn("github", {
          redirect: false,
          callbackUrl: "/",
      })}
      >LogIn with google<FaGithub /></Button>
    </div>
  )
}

export default ProviderLogin