'use client'

import { Form, useForm } from "@/components/form/form";
import { CheckIcon, TextArea } from "@/components/form/inputs";
import { z } from "zod";
import { SubmitHandler } from "react-hook-form";
import { generateImage } from "@/lib/openai";
import { useState } from "react";
import { ImagesResponseDataInner } from "openai";

interface QueryForm {
  query: string;
}

const formSchema = z.object({
  query: z.string().min(1).max(100),
})


export default function Page({ params }: { params: { username: string } }) {
  const form = useForm({ schema: formSchema })
  const [images, setImages] = useState<ImagesResponseDataInner[]>([])


  const onSubmit: SubmitHandler<QueryForm> = async (data) => {
    try {
      console.log(data.query)

      const images = await generateImage(data.query)
      setImages(images.data)


    } catch (error) {
      throw error
    }
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="label text-3xl">{params.username}</h1>
      <div>
        <Form form={form} onSubmit={onSubmit}>
          <TextArea label="query" {...form.register('query')} />
          <CheckIcon label="human" />
          <button className="btn btn-secondary mt-4" type="submit">Submit</button>
        </Form>
      </div>
      <div className="flex w-full">
        {images.map((image, index) => (
          <div className=" relative w-full">
            <img src={image.url!} width={1024} height={1024} alt={`Image ${index}`} />
          </div>
        ))}
      </div>
    </div>
  )
}
