import { ComponentProps, forwardRef } from "react";
import { FieldError } from "./form";

interface InputProps extends ComponentProps<"input"> {
  label: string;
}

interface TextAreaProps extends ComponentProps<"textarea"> {
  label: string;
}

interface CheckIconProps extends ComponentProps<"input"> {
  field: string;
  label: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ label, type = 'text', ...props }, ref) => (
  <div >
    <label className="label">{label}</label>
    <input className="input input-bordered input-primary" ref={ref} type={type} {...props} />
    <FieldError name={props.name} />
  </div>
))

Input.displayName = 'Input'

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(({ label, ...props }, ref) => (
  <div >
    <label className="label">{label}</label>
    <textarea className="textarea textarea-bordered w-full" ref={ref} {...props} />
    <FieldError name={props.name} />
  </div>
))

export const CheckIcon = forwardRef<HTMLInputElement, CheckIconProps>(({ label, field, ...props }, ref) => (
  <div className="flex items-center">
    <input id={label} type="radio" name={field} ref={ref} className="radio hidden peer"  {...props} />
    <label htmlFor={label} className="label gap-2 p-4 flex flex-col select-none opacity-50 peer-checked:opacity-100">
      <img className="rounded-lg" width={90} height={90} src={`/imgs/${label}.png`} />
      {label}
    </label>

    <FieldError name={props.name} />
  </div>
))


