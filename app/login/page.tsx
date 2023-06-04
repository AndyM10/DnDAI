'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { z } from "zod";
import { Form, useForm } from "../../components/form/form";
import { Input } from "../../components/form/inputs";

import type { Database } from '@/lib/database'
import { SubmitHandler } from 'react-hook-form';

interface LoginForm {
  email: string;
  password: string;
  username: string;
  fullName: string;
}

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
  username: z.string().min(3).max(20),
  fullName: z.string().max(100)
})


export default function Page() {

  const form = useForm({ schema: formSchema })
  const router = useRouter()
  const supabase = createClientComponentClient<Database>()

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    try {
      const resp = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback`,
          data: {
            username: data.username,
            full_name: data.fullName
          }
        }
      })
      if (resp.error) throw Error(resp.error.message)
      if (resp.data) {
        console.log('user logged in!', resp.data)
        router.push(`/${resp.data.user?.user_metadata.username}`)
      }
    } catch (error) {
      throw error
    }

  }

  return (
    <>
      <div className="flex justify-center m-4">
        <h1 className="text-4xl font-bold justify-center">Sign Up or Login!</h1>
      </div>
      <div className="flex flex-col w-full lg:flex-row m-4">
        <div className="grid flex-grow rounded-box place-items-center">
          <Form form={form} onSubmit={onSubmit}>
            <Input label="fullName" type="text" {...form.register('fullName')} />
            <Input label="username" type="text" {...form.register('username')} />
            <Input label="email" type="email" {...form.register('email')} />
            <Input label="password" type="password" {...form.register('password')} />
            <button className="btn btn-secondary mt-4" type="submit">Submit</button>
          </Form>
        </div>
        <div className="divider lg:divider-horizontal before:bg-primary after:bg-primary">
          OR
        </div>
        <div className="grid flex-grow rounded-box place-items-center">

        </div>
      </div>
    </>
  )
}

