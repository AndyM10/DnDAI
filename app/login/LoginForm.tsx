import { Form, useForm } from "@/components/form/form";
import { Input } from "@/components/form/inputs";
import { useAuth } from "@/lib/authContext";
import { SupabaseClient } from "@supabase/supabase-js";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useEffect, useState } from "react";
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

export default function LoginForm({ router }: { router: AppRouterInstance }) {
  const form = useForm({ schema: formSchema })
  const [isError, setIsError] = useState<Error>()
  const { username, signIn } = useAuth()

  useEffect(() => {
    if (username) router.push(`/${username}/generate`)
  }, [username])

  if (isError) throw isError

  const onSubmit: SubmitHandler<LoginForm> = async (formData) => {
    try {
      signIn(formData.email, formData.password)
    } catch (error) {
      setIsError(new Error(`${error}`))
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

