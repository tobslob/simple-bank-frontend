import React, {useState} from "react";
import {ErrorMessage, Field} from "formik";
import {Combobox} from "@headlessui/react";
import {classNames} from "src/utils";
import _ from "lodash";
import {DownOutlined, UpOutlined} from "@ant-design/icons";

export default function Component({
  name,
  label,
  format,
  options = [],
  extraClasses = "",
  optionLabel = "name",
  optionValue = "code",
  onItemSelected,
  placeholder,
  helpText,
  autocomplete,
  isRequired,
  altLink,
  icon,
  rightIcon,
  selected = "please select",
  showError = true,
  ...props
}) {
  const [query, setQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState(selected);
  const filteredOption =
    query === ""
      ? options
      : options.filter((option) => {
          return option[optionLabel]
            .toLowerCase()
            .includes(query.toLowerCase());
        });
  return (
    <Field name={name}>
      {({ field: { onChange, onBlur, value }, meta: { touched, error } }) => {
        const handleChange = onChange(name);

        const getSelectedOption = () => {
          const option = _.find(
            options,
            (opt) => opt[optionValue]?.toLowerCase() == value?.toLowerCase()
          );
          return option;
        };

        const onSelect = (item) => {
          // console.log("item", item);
          // setSelectedOption(item);
          const val = item ? item[optionValue] : "";
          handleChange(val);
          setTimeout(() => {
            setQuery("");
            onItemSelected && onItemSelected(item);
          }, 100);
        };

        // const _format = (val) => {
        //     const option = _.find(options, (option) => option[optionValue] === val);
        //     if (!option) {
        //         return "";
        //     }
        //     return option[optionLabel];
        // };

        const formatValue = (option) =>
          format ? format(option) : option[optionLabel];

        const valueSelected = getSelectedOption() || selectedOption;
        return (
          <Combobox
            as="fieldset"
            value={valueSelected}
            onChange={onSelect}
            className="space-y-1"
          >
            {label && (
              <div className="flex justify-between items-center mt-3">
                {label ? (
                  <Combobox.Label
                    htmlFor={name}
                    className="text-sm text-gray-900"
                  >
                    {label}
                    {isRequired && (
                      <span className=" text-red-500 ml-1">*</span>
                    )}
                  </Combobox.Label>
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
              <Combobox.Input
                placeholder={placeholder}
                className={classNames(
                  icon ? "pl-12" : "pl-4",
                  touched && error ? "border-red-500" : "border-gray-200",
                  extraClasses,
                  "appearance-none font-medium border border-gray-200 block w-full bg-gray-100 py-3 placeholder-gray-300 rounded pr-12 focus:ring-primary focus:border-primary sm:text-sm caret-primary"
                )}
                onChange={(event) => setQuery(event?.target?.value)}
                displayValue={(option) => {
                  return option ? option[optionLabel] : " ";
                }}
              />
              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md pr-4 focus:outline-none">
                <DownOutlined
                  className="h-5 w-5 text-gray-600"
                  aria-hidden="true"
                />
              </Combobox.Button>

              {filteredOption.length === 0 && query !== "" && (
                <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                    No result found.
                  </div>
                </Combobox.Options>
              )}

              {filteredOption.length > 0 && (
                <Combobox.Options className="absolute z-10 mt-1.5 max-h-60 w-full divide-y divide-gray-100 overflow-auto bg-white py-0.5 sm:text-sm shadow-lg shadow-gray-300 ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {filteredOption.map((option, idx) => (
                    <Combobox.Option
                      key={idx}
                      value={option}
                      className={({ active }) =>
                        classNames(
                          "relative cursor-pointer select-none py-3 pl-3 pr-10",
                          active ? "bg-primary text-white" : "text-gray-900"
                        )
                      }
                    >
                      {({ active, selected }) => (
                        <>
                          <span
                            // onClick={() => onSelect(option)}
                            className={classNames(
                              "block truncate",
                              selected && "font-semibold"
                            )}
                          >
                            {/*{option[optionLabel]}*/}
                            {formatValue(option)}
                          </span>

                          {selected && (
                            <span
                              className={classNames(
                                "absolute inset-y-0 right-0 flex items-center pr-4",
                                active ? "text-white" : "text-primary"
                              )}
                            >
                              <UpOutlined
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          )}
                        </>
                      )}
                    </Combobox.Option>
                  ))}
                </Combobox.Options>
              )}
            </div>

            {helpText && <p className="text-xs text-gray-400">{helpText}</p>}
            {showError && (
              <ErrorMessage name={name}>
                {(msg) => (
                  <div className="text-xs text-red-500 opacity-80">{msg}</div>
                )}
              </ErrorMessage>
            )}
          </Combobox>
        );
      }}
    </Field>
  );
}
