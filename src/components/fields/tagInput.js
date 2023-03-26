import {ErrorMessage, useFormikContext} from 'formik'
import {classNames} from 'src/utils'
import React, {useState} from 'react'
import _ from 'lodash'
import { WithContext as ReactTags } from "react-tag-input";
// ReactTags blows up with normal imports, dynamic imports are required to make it work
// import dynamic from 'next/dynamic'
//
// let ReactTags
//
// ReactTags = dynamic(
//   () => import('react-tag-input').then((mod) => mod.WithContext),
//   { ssr: false }
// )

const Keys = {
  TAB: 9,
  SPACE: 32,
  COMMA: 188,
  ENTER: 13,
}
const delimiters = [Keys.COMMA, Keys.SPACE, Keys.ENTER]


export default function Component({
  name,
  label,
  format,
  options = [],
  extraClasses = '',
  optionLabel = 'name',
  optionValue = 'code',
  autoFocus = 'false',
  onItemSelected,
  placeholder,
  helpText,
  autocomplete,
  isRequired,
  altLink,
  icon,
  rightIcon,
  ...props
}) {
  const {
    values,
    setFieldValue,
    setFieldError,
    validateField,
    errors,
    touched,
  } = useFormikContext()
  const initialTags =
    values && values[name] && _.isArray(values[name])
      ? _.filter(options, (elem) => values[name].includes(elem[optionLabel]))
      : []
  // console.log({ values, initialTags });
  const [tags, setTags] = useState(initialTags)

  // Bugfix on suggestions. It requires an id field to work properly
  const suggestions = _.map(options, (opt) => {
    return { id: opt[optionValue], [optionLabel]: opt[optionLabel] }
  }).filter((el) => el.id !== undefined)

  // set formik values for tag input
  const setFormValues = (tags) => {
    const newValues = _.map(tags, (tag) => tag[optionLabel])
    console.log({ tags, newValues })
    setFieldValue(name, newValues, true)
  }

  const handleDelete = (i) => {
    const newTags = tags.filter((tag, index) => index !== i)

    // re-render
    setTags(newTags)
    setFormValues(newTags)
  }

  const handleAddition = (tag) => {
    const newTags = [...tags, tag]

    // re-render
    setTags(newTags)
    setFormValues(newTags)
  }

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice()

    newTags.splice(currPos, 1)
    newTags.splice(newPos, 0, tag)

    // re-render
    setTags(newTags)
    setFormValues(newTags)
  }

  const handleTagClick = (index) => {
    console.log('The tag at index ' + index + ' was clicked')
  }

  const markIt = (input, query) => {
    const escapedRegex = query.trim().replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&')
    return {
      __html: input.replace(RegExp(escapedRegex, 'gi'), (x) => {
        return `<mark>${escape(x)}</mark>`
      }),
    }
  }

  const tagClassNames = {
    tags: classNames(
      rightIcon ? 'pr-12' : 'pr-4',
      touched && touched[name] && errors && errors[name]
        ? 'border-red-500'
        : 'border-gray-200',
      extraClasses,
      'ReactTags__wrapper bg-white border border-gray-200 block relative font-medium w-full py-1.5 px-4 rounded-sm focus-within:ring-1 focus-within:ring-primary focus-within:border-primary space-x-1'
    ),
    tagInput: 'ReactTags__TagInput inline-block w-1/2',
    tag: 'ReactTags__tag rounded-sm bg-slate-100 -ml-2.5 inline-flex justify-center items-center text-sm font-medium mr-5 py-1 pl-2.5 pr-1.5',
    tagInputField:
      'border-0 inline-block w-auto outline-none ring-0 placeholder-gray-300 focus:outline-none focus:ring-0 sm:text-sm caret-primary py-1.5 px-0 pr-4 inline-block',
    suggestions:
      'absolute z-10 mt-1.5 max-h-60 w-1/2 divide-y divide-gray-200 overflow-auto bg-white py-0.5 sm:text-sm shadow shadow-gray-200 focus:outline-none',
    activeSuggestion: 'bg-primary text-white',
  }

  // console.log("tagClassNames", tagClassNames, ReactTags);

  const removeComponent = ({ onRemove }) => {
    return (
      <button
        className="flex justify-center items-center py-1"
        onClick={onRemove}
      >
        {/*<XMarkIcon className="ml-1.5 h-3 w-3 mt-0.5 text-gray-400 hover:text-black" />*/}
      </button>
    )
  }
  return (
    <fieldset className="space-y-2">
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
      {ReactTags ? (
        <ReactTags
          tags={tags}
          classNames={tagClassNames}
          suggestions={suggestions}
          placeholder={placeholder}
          labelField={optionLabel}
          delimiters={delimiters}
          handleDelete={handleDelete}
          handleAddition={handleAddition}
          handleDrag={handleDrag}
          handleTagClick={handleTagClick}
          inputFieldPosition={'inline'}
          // autoComplete={1}
          autofocus={false}
          removeComponent={removeComponent}
          renderSuggestion={(tag, query) => {
            const text = tag[optionLabel]
            return (
              <p
                dangerouslySetInnerHTML={markIt(text, query)}
                className="relative w-full border-b border-100 cursor-pointer select-none py-3 pl-3 pr-10"
              />
            )
          }}
        />
      ) : (
        <input
          placeholder={placeholder}
          className="border border-gray-200 block font-medium w-full py-3 placeholder-gray-300 rounded-sm focus:ring-primary focus:border-primary sm:text-sm caret-primary"
          type="text"
        />
      )}
      {helpText && <p className="text-xs text-gray-400">{helpText}</p>}
      <ErrorMessage name={name}>
        {(msg) => <div className="text-xs text-red-500 opacity-80">{msg}</div>}
      </ErrorMessage>
    </fieldset>
  )
}
