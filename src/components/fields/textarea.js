import { ErrorMessage, Field } from "formik";
import { classNames } from "src/utils";

export default function Component({
  name,
  label,
  helpText,
  extraClasses = "",
  altLink,
  format,
  icon,
  rightIcon,
  ...props
}) {
  return (
    <Field name={name}>
      {({ field: { onChange, onBlur, value }, meta: { touched, error } }) => {
        const formatValue = (val) => (format ? format(val) : val);
        return (
          <fieldset className="space-y-2">
            <div className="flex justify-between items-center">
              {label ? (
                <label
                  htmlFor={name}
                  className="text-sm  tracking-wider  text-gray-900"
                >
                  {label}
                </label>
              ) : (
                <span />
              )}
              {altLink && <div className="items-end">{altLink}</div>}
            </div>
            <div className="relative">
              {icon && (
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  {icon}
                </div>
              )}
              <textarea
                id={name}
                onChange={onChange}
                onBlur={onBlur}
                value={formatValue(value)}
                className={classNames(
                  icon ? "pl-12" : "pl-4",
                  rightIcon ? "pr-12" : "pr-4",
                  touched && error ? "border-red-500" : "border-gray-200",
                  extraClasses,
                  // "border block w-full px-4 py-3 placeholder-gray-500 border-gray-200 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                  "border  block font-medium w-full py-3 placeholder-gray-300 rounded-sm focus:ring-primary focus:border-primary sm:text-sm caret-primary h-28 resize-none"
                )}
                {...props}
              />
              {rightIcon && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                  {rightIcon}
                </div>
              )}
            </div>
            {helpText && <p className="text-xs text-gray-400">{helpText}</p>}
            <ErrorMessage name={name}>
              {(msg) => (
                <div className="text-xs text-red-500 opacity-80">{msg}</div>
              )}
            </ErrorMessage>
          </fieldset>
        );
      }}
    </Field>
  );
}
