'use client'
import { Form, useForm } from "@/components/form/form";
import { z } from "zod";
import { SubmitHandler } from 'react-hook-form';
import { Input } from "@/components/form/inputs";
import { browserClient } from "@/lib/browserClient";
import Image from 'next/image'

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

export default function SignUpForm() {
  const form = useForm({ schema: formSchema })
  const { supabase } = browserClient()
  const onSubmit: SubmitHandler<SignUpForm> = async (formData) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${location.origin}/auth/confirm`,
          data: {
            username: formData.username,
            full_name: formData.fullName
          }
        }
      })
      if (error) throw Error(error.message)
      if (!data) throw Error('No data returned')

    } catch (error) {
      throw error
    }
  }

  return (
    <main className="grid bg-base-100 lg:aspect-[2/1] lg:grid-cols-2 rounded">
      <figure className="pointer-events-none object-cover max-lg:hidden">
        <Image src={'/imgs/dwarflogin.png'} width={500} height={500} alt="loginimg" />
      </figure>
      <Form form={form} className="flex flex-col justify-center gap-4 px-10 py-10 lg:px-16" onSubmit={onSubmit}>
        <Input label="fullName" type="text" {...form.register('fullName')} />
        <Input label="username" type="text" {...form.register('username')} />
        <Input label="email" type="email" {...form.register('email')} />
        <Input label="password" type="password" {...form.register('password')} />
        <button className="btn btn-neutral w-full mt-4" type="submit">Submit</button>
        <button type="button" className="btn w-full mt-4 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xlinkHref="http://www.w3.org/1999/xlink"
            viewBox="0 0 32 32"
            width="16"
            height="16">
            <defs>
              <path
                id="A"
                d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z" />
            </defs>
            <clipPath id="B"><use xlinkHref="#A" /></clipPath>
            <g transform="matrix(.727273 0 0 .727273 -.954545 -1.45455)">
              <path d="M0 37V11l17 13z" clip-path="url(#B)" fill="#fbbc05" />
              <path d="M0 11l17 13 7-6.1L48 14V0H0z" clip-path="url(#B)" fill="#ea4335" />
              <path d="M0 37l30-23 7.9 1L48 0v48H0z" clip-path="url(#B)" fill="#34a853" />
              <path d="M48 48L17 24l-4-3 35-10z" clip-path="url(#B)" fill="#4285f4" />
            </g>
          </svg>
          Login with Google
        </button>
      </Form>
    </main>
  )
}

