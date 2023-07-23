'use client'

import { Form, useForm } from "@/components/form/form";
import { CheckIcon, TextArea } from "@/components/form/inputs";
import { z } from "zod";
import { SubmitHandler } from "react-hook-form";
import { generateImage } from "@/lib/openai";
import { useState } from "react";
import { ImagesResponseDataInner } from "openai";
import Loading from "./loading";
import ImageContainer from "@/components/ImageContainer";

interface GenerationForm {
  race: any;
  style: string;
  class: string;
  story: string;
}

const formSchema = z.object({
  race: z.enum(['human', 'elf', 'dwarf']),
  style: z.enum(['hyperrealism', 'anime', 'cartoon']),
  class: z.enum(['barbarian', 'sorcerer', 'rogue']),
  story: z.string().max(100)
})


export default function Page() {
  const races = ['human', 'elf', 'dwarf']
  const classes = ['barbarian', 'sorcerer', 'rogue']
  const stlyes = ['hyperrealism', 'anime', 'cartoon']

  const form = useForm({ schema: formSchema })
  const [images, setImages] = useState<ImagesResponseDataInner[]>([])
  const [loading, setLoading] = useState(false)

  const onSubmit: SubmitHandler<GenerationForm> = async (data) => {
    try {
      setLoading(true)
      const images = await generateImage(`${data.style} concept art of a fantasy ${data.race} ${data.class}, dungeons and dragons, inspired by the best fantasy ${data.style} artists `)
      setLoading(false)
      setImages(images)

    } catch (error) {
      throw error
    }
  }


  const closeContainer = () => {
    setImages([])
  }

  return (
    <div className="flex flex-col items-center">
      <div className="max-w-screen-lg w-full border-black border rounded-lg">
        <div className="p-8">
          <Form form={form} onSubmit={onSubmit} >
            <label className="label text-xl">1. Choose your race</label>
            <div className="flex flex-row justify-evenly">
              {races.map((race) => (
                <CheckIcon key={`${race}-input`} field='race' label={race} value={race} format='png' {...form.register('race')} />
              ))}
            </div>
            <div className="divider m-0" ></div>
            <label className="label text-xl">1. Choose your class</label>
            <div className="flex flex-row justify-evenly">
              {classes.map((role) => (
                <CheckIcon key={`${role}-input`} field='race' label={role} value={role} format='jpeg' {...form.register('class')} />
              ))}
            </div>
            <div className="divider m-0" ></div>
            <label className="label text-xl">2. Choose your art style</label>
            <div className="flex flex-wrap justify-evenly">
              {stlyes.map((style) => (
                <CheckIcon key={`${style}-input`} field='style' label={style} value={style} format='png' {...form.register('style')} />
              ))}
            </div>
            <label className="label text-xl">3. Add your backstory</label>
            <TextArea label="Story" {...form.register('story')} />
            <button className="btn btn-secondary mt-4" type="submit">Submit</button>
          </Form>
        </div >
      </div>
      <div className="flex w-full justify-evenly">
        {images.length > 0 && !loading &&
          <ImageContainer image={images} close={closeContainer} />
        }
        {loading && (
          <Loading />
        )}
      </div>

    </div >
  )
}
