import { Form, useForm } from "@/components/form/form";
import { Input } from "@/components/form/inputs";
import { SupabaseClient } from "@supabase/auth-helpers-nextjs";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { SubmitHandler } from "react-hook-form";
import { z } from "zod";

interface LoginForm {
  email: string;
  password: string;
}

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
})

export default function LoginForm({ router, supabase }: { router: AppRouterInstance, supabase: SupabaseClient }) {

  const form = useForm({ schema: formSchema })

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    try {
      const resp = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      })
      router.refresh()

      if (resp.error) throw Error(resp.error.message)
      if (resp.data) {
        console.log('user logged in!', resp.data)
        router.push(`/${resp.data.user?.user_metadata.username}/generate`)
      }
    } catch (error) {
      throw error
    }
  }

  return (
    <>
      <h1 className="label text-3xl">Log In</h1>
      <Form form={form} onSubmit={onSubmit}>
        <Input label="email" type="email" {...form.register('email')} />
        <Input label="password" type="password" {...form.register('password')} />
        <button className="btn btn-secondary mt-4" type="submit">Submit</button>
      </Form>
    </>
  )

}

