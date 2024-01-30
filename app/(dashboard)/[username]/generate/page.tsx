'use client'
import { Form, useForm } from "@/components/form/form";
import { CheckIcon, RaceSelect, TextArea } from "@/components/form/inputs";
import { z } from "zod";
import { DefaultValues, SubmitHandler } from "react-hook-form";
import React, { useState } from "react";
import Loading from "./loading";
import ImageContainer from "@/components/ImageContainer";
import { Image } from "openai/resources";

export interface GenerationForm {
  race: any;
  style: string;
  role: string;
  story: string;
}

const formSchema = z.object({
  race: z.enum(['Human', 'Elf', 'Dwarf', 'Dragonborn', 'Drow', 'Gnome', 'Halfling', 'Fire Genasi']),
  style: z.enum(['hyperrealism', 'anime', 'pop-art', 'pixel-art', '3d', 'minimalist', 'isometric']),
  role: z.enum(['barbarian', 'sorcerer', 'rogue', 'cleric', 'druid', 'paladin', 'warlock']),
  story: z.string().max(500)
})

export default function Page() {
  const races = ['Human', 'Elf', 'Dwarf', 'Dragonborn', 'Drow', 'Gnome', 'Halfling', 'Fire Genasi']
  const classes = ['barbarian', 'sorcerer', 'rogue', 'cleric', 'druid', 'paladin', 'warlock']
  const stlyes = ['hyperrealism', 'anime', 'pop-art', 'pixel-art', '3d', 'minimalist', 'isometric']
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/generate`
  const form = useForm({ schema: formSchema })
  const [images, setImages] = useState<Image[]>([])
  const [formData, setFormData] = useState<GenerationForm>()
  const [loading, setLoading] = useState(false)
  const [isError, setIsError] = useState<Error>()
  const { control } = form

  if (isError) throw isError

  const onSubmit: SubmitHandler<GenerationForm> = async (data) => {
    try {
      setLoading(true)
      setFormData(data)
      const image = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      setLoading(false)

      if (!image.ok) throw new Error(`${image.status} ${image.statusText}`)
      setImages(await image.json())

    } catch (error) {
      setIsError(new Error(`${error}`))
    }
  }


  const closeContainer = () => {
    setImages([])
    setFormData(undefined)
  }

  return (
    <div className="col-span-12 flex flex-col items-center p-4">
      <div className="max-w-screen-lg w-full bg-base-100 drop-shadow-md rounded-lg">
        <div className="p-8">
          <Form form={form} onSubmit={onSubmit} >
            <label className="label text-xl w-auto">1. Choose your race</label>
            <RaceSelect options={races} control={control as any} label="What race do you play?"{...form.register('race')} />
            <div className="divider m-0" ></div>
            <label className="label text-xl">2. Choose your class</label>
            <div className="flex flex-row justify-evenly">
              {classes.map((role) => (
                <CheckIcon key={`${role}-input`} field="classes" label={role} value={role} format='jpeg' {...form.register('role')} />
              ))}
            </div>
            <div className="divider m-0" ></div>
            <label className="label text-xl">3. Choose your art style</label>
            <div className="flex flex-wrap justify-evenly">
              {stlyes.map((style) => (
                <CheckIcon key={`${style}-input`} field="styles" label={style} value={style} format='png' {...form.register('style')} />
              ))}
            </div>
            <label className="label text-xl">4. Add your backstory</label>
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
