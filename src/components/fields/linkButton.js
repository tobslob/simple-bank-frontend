import {classNames} from 'src/utils'
// import { ReactNode } from 'react'
//
// interface LinkButtonType {
//   extraClasses: string
//   buttonStyle: string
//   children: any
// }
export default function Component({
  extraClasses,
  buttonStyle = 'shade',
  children,
  ...props
}) {
  return (
    <a
      {...props}
      className={classNames(
        buttonStyle === 'shade'
          ? 'bg-primary  bg-white border border-gray-200 ring-transparent focus:outline-none hover:ring-2 hover:ring-offset-2 hover:ring-primary hover:border-primary hover:ring-primary hover:text-white'
          : 'bg-gray-100 border border-gray-100 ring-transparent focus:outline-none hover:ring-2 hover:ring-offset-0 hover:ring-black hover:border-black hover:ring-black hover:text-gray-900',
        'whitespace-nowrap text-white cursor-pointer inline-flex items-center rounded-lg justify-center w-full px-5 py-3.5 uppercase text-xs tracking-wider font-bold transition-all duration-200',
        extraClasses
      )}
    >
      {children}
    </a>
  )
}
