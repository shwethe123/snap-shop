"use client"

import {useAction} from "next-safe-action/hooks"
import AuthFormProps from '@/components/auth/auth-form'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import registerSchema from '@/types/register-schema'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { register } from "@/server/actions/register-action"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

const Register = () => {
  const form = useForm({
    resolver : zodResolver(registerSchema),
    defaultValues : {
      name : "",
      email : "",
      password : ""
    }
  });

  const {execute, status, result} = useAction(register, {
    onSuccess({data}) {
      form.reset();
      toast.success(data?.succes, {
        action :{
          label : "Open Gmail",
          onClick : () => {window.open("https://mail.google.com", "_blank")}
        }
      });
    }
  })

const onSubmit = ( values : z.infer<typeof registerSchema>) => {
  const {name, email, password} = values
  execute ({name, email, password})
}

  return (
    <AuthFormProps 
      formTitle="Create an account" 
      footerLabel="Already have an account" 
      footerHref='/auth/login' 
      showProvider={true}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div>
          <FormField name='name' control={form.control} render={({field}) => (<FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder='Please enter user name' {...field}/>
              </FormControl>
              <FormMessage/>
            </FormItem>)}/>

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
                <Input placeholder='*********' {...field} type="password"/>
              </FormControl>
              <FormMessage/>
            </FormItem>)}/>
            {/* <Button size={"sm"} variant={"link"} className='pl-0 mb-1'>
              <Link href={"/auth/rest"}>Forgot password</Link>
            </Button> */}
          </div>
          <Button className={cn("w-full bg-primary my-4", status ==="executing" && "animate-pulse")}>Register</Button>
        </form>
      </Form>
    </AuthFormProps>
  )
}

export default Register