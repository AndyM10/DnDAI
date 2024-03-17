import { ComponentProps, forwardRef, useState } from "react";
import { FieldError } from "./form";
import Image from 'next/image'
import { useController, type Control } from "react-hook-form";
import { GenerationForm } from "@/app/(dashboard)/[username]/generate/page";

interface InputProps extends ComponentProps<"input"> {
  label: string;
}

interface TextAreaProps extends ComponentProps<"textarea"> {
  label: string;
}

interface CheckIconProps extends ComponentProps<"input"> {
  label: string;
  field: string;
  format: string
}

interface RaceSelectProps extends ComponentProps<"select"> {
  label: string;
  options: Array<string>
  control: Control<GenerationForm>;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ label, type = 'text', ...props }, ref) => (
  <div>
    <label className="label" htmlFor={`input-${label}`}><span className="label-text">{label}</span></label>
    <input className="input w-full input-bordered"
      ref={ref}
      type={type}
      id={`input-${label}`}
      {...props} />
    <FieldError name={props.name} />
  </div>
))

Input.displayName = 'Input'

export const Toggle = forwardRef<HTMLInputElement, InputProps>(({ label, type = 'checkbox', ...props }, ref) => (
  <div className="flex items-center justify-between gap-3 my-3">
    <label className="flex cursor-pointer gap-3 text-xs">
      <input type={type} ref={ref} className="toggle toggle-xs toggle-accent"{...props} />
      {label}
    </label>
    <div className="label">
      <a className="link-hover link label-text-alt" href="#">Forgot password?</a>
    </div>
    <FieldError name={props.name} />
  </div>
))

Toggle.displayName = 'Toggle'

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(({ label, ...props }, ref) => (
  <div >
    <label className="label">{label}</label>
    <textarea className="textarea textarea-bordered w-full" ref={ref} {...props} />
    <FieldError name={props.name} />
  </div>
))

TextArea.displayName = 'TextArea'

export const CheckIcon = forwardRef<HTMLInputElement, CheckIconProps>(({ label, format, ...props }, ref) => (
  <div className="flex items-center">
    <input id={label} type="radio" ref={ref} className="radio hidden peer"  {...props} />
    <label htmlFor={label} className="label gap-2 p-4 flex flex-col select-none opacity-50 peer-checked:opacity-100">
      <img className="rounded-lg" width={90} height={90} src={`/imgs/${props.field}/${label}.${format}`} />
      {label}
    </label>

    <FieldError name={props.name} />
  </div>
))

CheckIcon.displayName = 'CheckIcon'


export const RaceSelect = forwardRef<HTMLSelectElement, RaceSelectProps>(({ label, control, ...props }, ref) => {
  const { field } = useController({ control, name: 'race' })
  return (
    <div className="grid lg:aspect-[2/1] lg:grid-cols-2 rounded justify-center">
      <select ref={ref} className="select select-bordered mb-4 mr-0 lg:mr-4" onChange={e => field.onChange(e.target.value)}  >
        <option disabled value={label}>{label}</option>
        {props.options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      {
        field.value ?
          <figure className="pointer-events-none object-cover my-auto max-auto ">
            <Image src={`/imgs/races/${field.value.toLowerCase().replace(/\s+/g, '')}.png`} width={250} height={250} alt="loginimg" className="rounded mx-auto" />
          </figure> :
          <div className="skeleton w-250 h-250"></div>
      }
      <FieldError name={props.name} />
    </div >
  )
})

RaceSelect.displayName = 'RaceSelect'
