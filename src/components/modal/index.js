import React, { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Button } from "src/components/fields";

const LayoutHeader = ({ title, ref, setOpen }) => {
  return (
    <div className=" sticky left-0 top-0  w-full">
      <header className="relative z-50  h-16 md:h-16 border-gray-100">
        <nav aria-label="Top" className="flex h-full items-center">
          <div className=" w-full">
            <div className="m-auto w-full w-full px-4 sm:px-6 lg:px-8">
              <div className="w-full flex justify-between gap-4 items-center">
                {title && (
                  <h1 className="text-2xl font-bold  flex flex-1 justify-start items-center gap-4">
                    {title}
                  </h1>
                )}
                <div className="relative lg:flex justify-end items-center gap-2">
                  <Button style="cancel" ref={ref}>
                    <span aria-hidden="true" className="h-5 w-5">
                      X
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default function Layout({
  title = "",
  showHeader = true,
  children,
  isOpen,
  setIsOpen,
  isDrawer = false,
}) {
  const initialFocusRef = useRef();
  return (
    <Fragment>
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          static
          className="fixed z-50 inset-0 overflow-auto bg-black/30"
          open={isOpen}
          onClose={setIsOpen}
          initialFocus={initialFocusRef}
        >
          {isDrawer ? (
            <div className="flex items-start justify-center sm:block">
              <Transition.Child
                as="div"
                enter="ease-out duration-150"
                enterFrom="opacity-0 sm:translate-x-50"
                enterTo="opacity-100 sm:translate-x-0"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 sm:translate-x-0"
                leaveTo="opacity-0  sm:translate-x-full"
              >
                <div
                  className="h-screen"
                  onClick={() => {
                    setIsOpen && setIsOpen(false);
                  }}
                >
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="w-full min-h-screen ml-auto lg:px-6 max-w-lg bg-white  h-full overflow-y-auto py-8"
                  >
                    {children}
                  </div>
                </div>
              </Transition.Child>
            </div>
          ) : (
            <div className="flex items-start justify-center sm:block">
              <Transition.Child
                as="div"
                enter="ease-out duration-150"
                enterFrom="opacity-0 sm:scale-95"
                enterTo="opacity-100 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 sm:scale-100"
                leaveTo="opacity-0  sm:scale-95"
              >
                <div
                  className="min-h-screen"
                  onClick={() => {
                    setIsOpen && setIsOpen(false);
                  }}
                >
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="w-full m-auto lg:px-6 max-w-lg bg-white lg:mt-32 rounded-lg min-h-[200px] py-8"
                  >
                    {children}
                  </div>
                </div>
              </Transition.Child>
            </div>
          )}
        </Dialog>
      </Transition.Root>
    </Fragment>
  );
}
