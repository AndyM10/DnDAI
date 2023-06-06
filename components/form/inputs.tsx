import { ComponentProps, forwardRef } from "react";
import { FieldError } from "./form";

interface InputProps extends ComponentProps<"input"> {
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

