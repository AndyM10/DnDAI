import { ComponentProps, forwardRef } from "react";
import { FieldError } from "./form";

interface InputProps extends ComponentProps<"input"> {
  label: string;
}

interface TextAreaProps extends ComponentProps<"textarea"> {
  label: string;
}

interface CheckIconProps extends ComponentProps<"input"> {
  label: string;
  format: string
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
      <img className="rounded-lg" width={90} height={90} src={`/imgs/${label}.${format}`} />
      {label}
    </label>

    <FieldError name={props.name} />
  </div>
))

CheckIcon.displayName = 'CheckIcon'

