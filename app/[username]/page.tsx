'use client'

import { Form, useForm } from "@/components/form/form";
import { CheckIcon, TextArea } from "@/components/form/inputs";
import { z } from "zod";
import { SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { ImagesResponseDataInner } from "openai";
import Loading from "./loading";
import ImageContainer from "@/components/ImageContainer";
import { toast } from "react-hot-toast";

export interface GenerationForm {
  race: any;
  style: string;
  role: string;
  story: string;
}

const formSchema = z.object({
  race: z.enum(['human', 'elf', 'dwarf']),
  style: z.enum(['hyperrealism', 'anime', 'cartoon']),
  role: z.enum(['barbarian', 'sorcerer', 'rogue']),
  story: z.string().max(500)
})


const notify = () => toast.custom((t) => (
  <div className={`toast toast-center toast-middle${t.visible ? 'animate-enter' : 'animate-leave'}}`}>
    <div className="alert alert-success">
      <span>Message sent successfully.</span>
    </div>
  </div >
))

export default function Page() {
  const races = ['human', 'elf', 'dwarf']
  const classes = ['barbarian', 'sorcerer', 'rogue']
  const stlyes = ['hyperrealism', 'anime', 'cartoon']

  const form = useForm({ schema: formSchema })
  const [images, setImages] = useState<ImagesResponseDataInner[]>([])
  const [formData, setFormData] = useState<GenerationForm>()
  const [loading, setLoading] = useState(false)
  const onSubmit: SubmitHandler<GenerationForm> = async (data) => {
    try {
      setLoading(true)
      setFormData(data)
      const image = await fetch('http://localhost:3000/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      setLoading(false)
      setImages(await image.json())


    } catch (error) {
      throw error
    }
  }

  const closeContainer = () => {
    notify()
    setImages([])
    setFormData(undefined)
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
                <CheckIcon key={`${role}-input`} field='race' label={role} value={role} format='jpeg' {...form.register('role')} />
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
        {images.length > 0 && !loading && formData &&
          <ImageContainer image={images} formData={formData} close={closeContainer} />
        }
        {loading && (
          <Loading />
        )}
      </div>

    </div >
  )
}
