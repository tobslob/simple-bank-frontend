import { ErrorMessage, Field } from "formik";
import { classNames } from "src/utils";
import GooglePlacesField from "src/components/fields/locationField";

export default function Component({
  name,
  label,
  helpText,
  icon,
  altLink,
  rightIcon,
  extraClasses = "",
  onLocationSelected,
  format,
  ...props
}) {
  return (
    <Field name={name}>
      {({ field: { onChange, onBlur, value }, meta: { touched, error } }) => {
        const formatValue = (val) => (format ? format(val) : val);
        const onSelected = (addr) =>
          onLocationSelected && onLocationSelected(addr);
        return (
          <fieldset className="space-y-2">
            {label && (
              <div className="flex justify-between items-center">
                {label ? (
                  <label
                    htmlFor={name}
                    className="text-2xs uppercase tracking-wider font-bold text-gray-900"
                  >
                    {label}
                  </label>
                ) : (
                  <span />
                )}
                {altLink && <div className="items-end">{altLink}</div>}
              </div>
            )}
            <div className="relative">
              {icon && (
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  {icon}
                </div>
              )}
              <GooglePlacesField
                autoComplete="x-raninpodx-"
                onSelected={onSelected}
                // onChange={onChange}
                onBlur={onBlur}
                value={formatValue(value)}
                className={classNames(
                  icon ? "pl-12" : "pl-4",
                  rightIcon ? "pr-12" : "pr-4",
                  touched && error && error[name]
                    ? "border-red-500"
                    : "border-gray-200",
                  extraClasses,
                  "border border-gray-200 block font-medium w-full py-3 placeholder-gray-300 rounded-sm focus:ring-primary focus:border-primary sm:text-sm caret-primary"
                )}
                {...props}
              />
              {rightIcon && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                  {rightIcon}
                </div>
              )}
            </div>
            {helpText && <p className="text-sm text-gray-400">{helpText}</p>}
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
