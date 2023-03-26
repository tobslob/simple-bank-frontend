import { ErrorMessage, Field } from "formik";
import { classNames, isImage, replaceImgIp } from "src/utils";
import Dropzone from "react-dropzone";


export const Placeholder = (
  <div className="text-center text-xs flex flex-col justify-center items-center space-y-1">
    {/*<img src="/images/svg/featured-icon.svg" className="w-8" alt="featured" />*/}
    <p>
      {/*<span className="text-primary">Click to upload</span>{" "}*/}
      <span className="text-primary">
        Click to upload a profile picture
      </span>{" "}
      {/*<span>or drag and drop</span>*/}
    </p>
    {/*<p>SVG, PNG, JPG or GIF (max. 800x400px)</p>*/}
  </div>
);
export const DocumentPlaceHolder = (
  <div className="text-center text-xs flex flex-col justify-center items-center space-y-1">
    {/*<img src="/images/svg/featured-icon.svg" className="w-8" alt="featured" />*/}
    <p>
      {/*<span className="text-primary">Click to upload</span>{" "}*/}
      <span className="text-primary">Click to upload document</span>{" "}
      {/*<span>or drag and drop</span>*/}
    </p>
    {/*<p>SVG, PNG, JPG or GIF (max. 800x400px)</p>*/}
  </div>
);
export default function Component({
  name,
  label,
  helpText,
  placeholder = Placeholder,
  accept = ["image/*"],
  maxFiles = 8,
  maxSize = 4 * 1024 * 1024,
  fromSources = ["local_file_system"],
  groupClass = "w-full grid grid-cols-1 relative z-0 md:grid-cols-2 gap-4",
  itemClass = "border border-gray-200 inline-flex font-medium w-full py-3.5 px-3.5 placeholder-gray-300 rounded-sm text-sm cursor-pointer justify-center items-center",
  options = [],
  optionLabel = "name",
  optionValue = "code",
  checkboxVisible = false,
  multiple = false,
  checkboxClass = "w-4 h-4 text-primary border-gray-200 rounded-full focus:ring-primary mr-4",
  selectedOptionClass = "bg-indigo-50 text-primary",
  altLink,
  format,
  uploadType = "image",
  extraClasses = "",
  ...props
}) {
  return (
    <Field name={name}>
      {({
        field: { onChange, onBlur, value },
        meta: { touched, error },
        form: { setFieldValue },
      }) => {
        const images = value?.length ? value : [];

        const onDrop = (acceptedFiles) => {
          console.log(acceptedFiles);
          const files = acceptedFiles.map((file) => {
            const reader = new FileReader();
            reader.onload = function (e) {
              images.push(e.target.result);
            };
            reader.readAsDataURL(file);
            return file;
          });

          // if (uploadType === "image") {
          //   uploadFilesService
          //     .upload("onboarding", { file: files?.[0] })
          //     .then((res) => {
          //       console.log("after upload", res);
          //       const preview = res?.data?.media?.[0].path?.preview;
          //       //might need to be changed soon
          //       setFieldValue(
          //         name,
          //         value?.length ? [...value, preview] : [preview],
          //         true
          //       );
          //     });
          // } else {
          //   uploadFilesService
          //     .upload("users", { file: files?.[0] })
          //     .then((res) => {
          //       console.log("after upload", res);
          //       const preview = res?.data?.media?.[0].path?.preview;
          //       //might need to be changed soon
          //       setFieldValue(
          //         name,
          //         value?.length ? [...value, preview] : [preview],
          //         true
          //       );
          //       usersServices.batchInviteUser(preview).then((res) => {
          //         console.log("after upload", res);
          //         cogoToast.success(`User's uploaded successfully!!`);
          //         // const preview = res?.data?.media?.[0].path?.preview;
          //         // //might need to be changed soon
          //         // setFieldValue(
          //         //   name,
          //         //   value?.length ? [...value, preview] : [preview],
          //         //   true
          //         // );
          //       });
          //     });
          // }
        };

        const onRemoveClick = (i) => {
          const newImages = images.filter((tag, index) => index !== i);
          setFieldValue(name, newImages, true);
        };
        return (
          <div className="space-y-2 mt-3 mb-6">
            {label && (
              <div className="flex justify-between items-center mt-3 ">
                {label ? (
                  <label htmlFor={name} className=" text-sm text-gray-900">
                    {label}
                  </label>
                ) : (
                  <span />
                )}
                {altLink && <span className="items-end">{altLink}</span>}
              </div>
            )}

            {(!!images?.length &&
              images?.map((img, idx) => {
                console.log("img", img);
                return !isImage(img) ? (
                  <div className="mb-3">
                    <div className="relative flex justify-center items-center  h-28 w-auto">
                      <div className="text-center space-y-3">
                        {/*<DocumentCheckIcon*/}
                        {/*  className="text-primary mx-auto"*/}
                        {/*  width={30}*/}
                        {/*/>*/}
                        <p>File Uploaded</p>
                      </div>
                    </div>
                    <button
                      onClick={() => onRemoveClick(idx)}
                      className="text-2xs uppercase my-1 text-red-600 font-medium tracking-wider -top-4 right-0"
                    >
                      {/*<TrashIcon width={20} />*/}
                    </button>
                  </div>
                ) : (
                  <div className="relative h-44 w-auto">
                    <div className="w-44 h-44 mx-auto rounded-full overflow-auto">
                      <img
                        src={replaceImgIp(img)}
                        className="object-cover w-full h-full"
                        alt=""
                      />
                    </div>

                    <button
                      onClick={() => onRemoveClick(idx)}
                      className="text-2xs uppercase mt-1 text-red-600 font-medium tracking-wider -top-4 right-0"
                    >
                      {/*<TrashIcon width={20} />*/}
                    </button>
                  </div>
                );
              })) || (
              <>
                <Dropzone onDrop={onDrop}>
                  {({ getRootProps, getInputProps }) => (
                    <section
                      className={classNames(
                        touched[name] && error[name]
                          ? "border-red-500"
                          : "border-gray-200",
                        "h-40 rounded border-1 border-gray-200 bg-gray-100 w-full bg-white text-center border justify-center items-center cursor-pointer flex flex-col"
                      )}
                    >
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />

                        <div>
                          {(!!images?.length &&
                            images?.map((img, idx) => {
                              console.log("img", img);
                              return (
                                <div className="relative h-28 w-48">
                                  <img
                                    src={img}
                                    className="object-center object-cover h-full w-full"
                                    alt=""
                                  />
                                  <button
                                    onClick={() => onRemoveClick(idx)}
                                    className="text-2xs uppercase text-red font-medium tracking-wider -top-4 right-0"
                                  >
                                    {/*<TrashIcon width={10} />*/}
                                  </button>
                                </div>
                              );
                            })) || <p>{placeholder}</p>}
                        </div>
                      </div>
                    </section>
                  )}
                </Dropzone>
                {helpText && (
                  <p className="text-xs text-gray-400">{helpText}</p>
                )}
              </>
            )}

            <ErrorMessage name={name}>
              {(msg) => (
                <div className="text-xs text-red-500 opacity-80">{msg}</div>
              )}
            </ErrorMessage>
          </div>
        );
      }}
    </Field>
  );
}
