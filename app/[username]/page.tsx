'use client'

import { Form, useForm } from "@/components/form/form";
import { CheckIcon, TextArea } from "@/components/form/inputs";
import { z } from "zod";
import { SubmitHandler } from "react-hook-form";
import { generateImage } from "@/lib/openai";
import { Suspense, useEffect, useState } from "react";
import { ImagesResponseDataInner } from "openai";
import Loading from "./loading";

interface GenerationForm {
  race: any;
  style: string;
  story: string;
}

const formSchema = z.object({
  race: z.enum(['human', 'elf', 'dwarf']),
  style: z.string(),
  story: z.string().max(100)
})

export default function Page({ params }: { params: { username: string } }) {
  const races = ['human', 'elf', 'dwarf']
  const stlyes = ['hyperrealism', 'anime', 'cartoon']

  const form = useForm({ schema: formSchema })
  const [images, setImages] = useState<ImagesResponseDataInner[]>([])
  const [loading, setLoading] = useState(false)

  const onSubmit: SubmitHandler<GenerationForm> = async (data) => {
    try {
      setLoading(true)
      const images = await generateImage(`${data.style} concept art of a ${data.race} fantasy warrior, dungeons and dragons, headshot, inspired by the best fantasy ${data.style} artists `)
      setImages(images.data)
    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    if (images.length != 0) {
      setLoading(false)
    }
  }, [images])

  return (
    <div className="flex flex-col items-center">
      <h1 className="label text-3xl">{params.username}</h1>
      <div className="m-5">
        <Form form={form} onSubmit={onSubmit}>
          <div className="flex ">
            {races.map((race) => (
              <CheckIcon key={`${race}-input`} field='race' label={race} value={race} {...form.register('race')} />
            ))}
          </div>
          <div className="divider m-0" ></div>
          <div className="flex">
            {stlyes.map((style) => (
              <CheckIcon key={`${style}-input`} field='style' label={style} value={style} {...form.register('style')} />
            ))}
          </div>
          <TextArea label="Story" {...form.register('story')} />
          <button className="btn btn-secondary mt-4" type="submit">Submit</button>
        </Form>
      </div >
      <div className="flex w-full">
        {loading ? <Loading /> : images.map((image, index) => (
          <div className=" relative w-full">
            <img key={index} src={image.url!} width={1024} height={1024} alt={`Image ${index}`} />
          </div>
        ))}
      </div>
    </div >
  )
}
