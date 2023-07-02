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
    <textarea className="textarea textarea-bordered " ref={ref} {...props} />
    <FieldError name={props.name} />
  </div>
))

export const CheckIcon = forwardRef<HTMLInputElement, CheckIconProps>(({ label, ...props }, ref) => (
  <div>
    <input type="checkbox" className="peer hidden" id="checkicon" />
    <label htmlFor="checkicon" className="select-none p-3 rounded-md border-2 border-white cursor-pointer peer-checked:text-green-400">
      Check me
    </label>
    <FieldError name={props.name} />
  </div>
))


