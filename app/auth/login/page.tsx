"use client"

import { useAction } from 'next-safe-action/hooks'
import AuthFormProps from '@/components/auth/auth-form'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import loginSchema from '@/types/login-schema'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { login } from '@/server/actions/login-action'
import { cn } from '@/lib/utils'

const Login = () => {
  const form = useForm({
    resolver : zodResolver(loginSchema),
    defaultValues : {
      email : "",
      password : ""
    }
  });


  const {execute, status, result} = useAction(login)

const onSubmit = ( values: z.infer<typeof loginSchema>) => {
  const {email, password} = values
  execute ({ email, password })
}

  return (
    <AuthFormProps 
      formTitle="Login to your account" 
      footerLabel="Don't have an account" 
      footerHref='/auth/register' 
      showProvider={true}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div>
            <FormField name='email' control={form.control} render={({field}) => (<FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='email@gmail.com' {...field}/>
              </FormControl>
              <FormMessage/>
            </FormItem>)}/>

            <FormField name='password' control={form.control} render={({field}) => (<FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder='*********' {...field} type='password'/>
              </FormControl>
              <FormMessage/>
            </FormItem>)}/>
            <Button size={"sm"} variant={"link"} className='pl-0 mb-1'>
              <Link href={"/auth/rest"}>Forgot password</Link>
            </Button>
          </div>
          <Button className={cn("w-full bg-primary my-4", status ==="executing" && "animate-pulse")}>Login</Button>
        </form>
      </Form>
    </AuthFormProps>
  )
}

export default Login