import { Field } from "formik";

export default function Component({
  name,
  label,
  helpText,
  type = "checkbox",
  extraClasses = "",
  altLink,
  format,
  icon,
  optionValue,
  onItemSelected,
  ...props
}) {
  return (
    <Field name={name}>
      {({ field: { onChange, onBlur, value } }) => {
        const handleChange = onChange(name);
        const onSelect = (item) => {
          const val = item ? item[optionValue] : "";
          handleChange(val);
          setTimeout(() => {
            onItemSelected && onItemSelected(item);
          }, 100);
        };
        const formatValue = (val) => (format ? format(val) : val);
        return (
          <fieldset className="relative flex items-center w-full">
            <div className="flex items-center h-5">
              <input
                {...props}
                id={name}
                name={name}
                onChange={onSelect}
                onBlur={onBlur}
                checked={formatValue(value)}
                className={
                  "w-4 h-4 text-primary border-gray-200 rounded focus:ring-primary"
                }
                type={"checkbox"}
              />
            </div>
            <div className="ml-3">
              <label
                htmlFor={name}
                className="text-sm font-medium text-gray-900"
              >
                {label || "Select"}
              </label>
            </div>
          </fieldset>
        );
      }}
    </Field>
  );
}
