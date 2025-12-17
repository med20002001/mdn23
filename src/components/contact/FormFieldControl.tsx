import type {
  Control,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
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
        const invalid = fieldState.invalid;
        const className = [
          invalid && "border-red-500 focus:ring-red-500", ]
          .filter(Boolean)
          .join(" ");
        return (
          <FormItem>
            <FormLabel className="text-sm font-semibold text-gray-900">
              {label}
              {required && <span className="text-red-500"> *</span>}
            </FormLabel>
            <FormControl>
              {"as" in props && props.as === "textarea" ? (
                <Textarea
                  {...field}
                  rows={props.rows ?? 5}
                  placeholder={props.placeholder}
                  required={required}
                  className={className}
                />
              ) : (
                <Input
                  {...field}
                  type={props.type ?? "text"}
                  placeholder={props.placeholder}
                  autoComplete={props.autoComplete}
                  required={required}
                  className={className}
                />
              )}
            </FormControl>

            <FormMessage className="text-xs text-red-600 mt-1" />
          </FormItem>
        );
      }}
    />
  );
}
