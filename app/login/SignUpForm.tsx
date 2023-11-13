'use client '
import { Form, useForm } from "@/components/form/form";
import { z } from "zod";
import { SubmitHandler } from 'react-hook-form';
import { Input } from "@/components/form/inputs";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { SupabaseClient } from "@supabase/supabase-js";

interface SignUpForm {
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

export default function SignUpForm({ router, supabase }: { router: AppRouterInstance, supabase: SupabaseClient }) {

  const form = useForm({ schema: formSchema })

  const onSubmit: SubmitHandler<SignUpForm> = async (data) => {
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
        router.refresh()
        router.push(`/${resp.data.user?.user_metadata.username}/generate`)
      }
    } catch (error) {
      throw error
    }
  }

  return (
    <>
      <h1 className="label text-3xl">Sign Up</h1>
      <Form form={form} onSubmit={onSubmit}>
        <Input label="fullName" type="text" {...form.register('fullName')} />
        <Input label="username" type="text" {...form.register('username')} />
        <Input label="email" type="email" {...form.register('email')} />
        <Input label="password" type="password" {...form.register('password')} />
        <button className="btn btn-secondary mt-4" type="submit">Submit</button>
      </Form>
    </>
  )
}
