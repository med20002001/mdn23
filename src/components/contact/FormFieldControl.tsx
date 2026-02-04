import type {
  Control,
  FieldPath,
  FieldValues,
} from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type BaseProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  required?: boolean;
};

type InputProps = {
  as?: "input";
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
  placeholder?: string;
  autoComplete?: string;
};

type TextareaProps = {
  as: "textarea";
  placeholder?: string;
  rows?: number;
};

export type FormFieldControlProps<T extends FieldValues> =
  BaseProps<T> & (InputProps | TextareaProps);

export function FormFieldControl<T extends FieldValues>({
  control,
  name,
  label,
  required = false,
  ...props
}: FormFieldControlProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const error = fieldState.error?.message;

        const baseInputClasses = `
          w-full px-6 py-5
          bg-gray-50
          border-0
          rounded-2xl
          outline-none
          transition-all duration-300
          text-gray-900 font-light
          placeholder:text-gray-300
          focus:bg-white
          focus:ring-1
          focus:ring-gray-900/10
        `;

        const errorClasses = error
          ? "ring-1 ring-red-100"
          : "";

        return (
          <FormItem className="space-y-2.5">
            {/* LABEL + ERROR INLINE */}
            <div className="flex items-center justify-between px-1">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-900">
                {label}
                {required && <span className="ml-1 text-red-500">*</span>}
              </label>

              {error && (
                <span className="text-[9px] font-bold text-red-500 uppercase tracking-tighter">
                  {error}
                </span>
              )}
            </div>

            <FormControl>
              {"as" in props && props.as === "textarea" ? (
                <Textarea
                  {...field}
                  rows={props.rows ?? 4}
                  placeholder={props.placeholder}
                  required={required}
                  className={`${baseInputClasses} resize-none ${errorClasses}`}
                />
              ) : (
                <Input
                  {...field}
                  type={props.type ?? "text"}
                  placeholder={props.placeholder}
                  autoComplete={props.autoComplete}
                  required={required}
                  className={`${baseInputClasses} ${errorClasses}`}
                />
              )}
            </FormControl>

            {/* FormMessage gardé pour accessibilité */}
            <FormMessage className="sr-only" />
          </FormItem>
        );
      }}
    />
  );
}
