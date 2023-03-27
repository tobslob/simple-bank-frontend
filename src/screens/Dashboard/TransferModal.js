import React, { useState } from "react";
import ModalLayout from "src/components/modal";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Button, Input } from "src/components/fields";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { useAuthUser } from "src/hooks";
import { classNames, formatNumber } from "src/utils";
import * as _ from "lodash";
import { transferServices } from "src/services/transfer.service";
import cogoToast from "cogo-toast";
import { useTransactionsContext } from "src/contexts/TransactionsProvider";
import { useUsersContext } from "src/contexts/UsersProvider";

function TransferModal({
  user,
  setModal,
  modal,
  transferData,
  setTransferData,
}) {
  return (
    <ModalLayout
      isDrawer={true}
      showHeader
      title=""
      isOpen={modal}
      setIsOpen={setModal}
    >
      <TransferForm
        {...{
          user,
          setModal,
          modal,
          transferData,
          setTransferData,
        }}
      />
    </ModalLayout>
  );
}
export const TransferForm = ({
  setModal,
  modal,
  transferData,
  setTransferData,
}) => {
  const { user } = useAuthUser();
  const { getUserById } = useUsersContext();

  const initialValues = {
    sortCode: "",
    toAccountId: "",
    amount: "",
    description: "",
    currency: user?.account?.[0]?.currency || "USD",
  };

  const [steps, setStep] = useState("one");
  const { getTransactions } = useTransactionsContext();
  const validationSchema = Yup.object().shape({
    toAccountId: Yup.string().required("Account is required"),
    amount: Yup.string().required("Amount is required"),
    currency: Yup.string().required("Currency is required"),
    description: Yup.string().required("Description  is required"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log("values", values);
        const { transfer_type, sortCode, ...others } = values;
        transferServices
          .createTransfer(others)
          .then((res) => {
            console.log("res", res);
            cogoToast.success("Transaction was successful!");
            getTransactions();
            getUserById(user?.id);
            setStep("three");
            setModal(false);
          })
          .catch((e) => {
            cogoToast.error(
              e?.response?.data?.message || "Unable to complete at the moment!"
            );
          });
      }}
    >
      {({ values, errors }) => {
        console.log("active valeue", values, errors);
        return (
          <Form>
            <div
              className={classNames(
                `flex  pb-3 mb-4 items-center`,
                steps === "two" ? "justify-between" : "justify-end"
              )}
            >
              {steps === "two" && (
                <span
                  onClick={() => setStep("one")}
                  className="rounded-full py-1 px-4 border-primary border cursor-pointer hover:ring-1 hover:ring-offset-1 ring-primary ring-offset-primary"
                >
                  Back
                </span>
              )}
              <CloseOutlined
                style={{ fontSize: "1.5em" }}
                onClick={() => setModal(false)}
              />
            </div>
            {steps === "one" && (
              <>
                <h1 className="text-lg font-bold mb-5">
                  Transfer Funds to Account
                </h1>{" "}
                <p className="text-sm text-gray-500 mb-1">Wallet Balance</p>
                <h1 className="font-bold text-3xl text-primary mb-4">
                  {_.compact([
                    user?.account?.[0]?.currency,
                    formatNumber(user?.account?.[0]?.balance, "0,0.00"),
                  ]).join(" ")}
                </h1>
                <div className="border-b w-20  border-gray-300 mb-5" />
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <Input
                      name="sortCode"
                      placeHolder="Enter sort code"
                      label="Sort Code"
                    />
                  </div>{" "}
                  <div className="col-span-2">
                    <Input
                      name="toAccountId"
                      placeHolder="Enter the account number"
                      label="Account Number"
                    />
                    {/*<p className="text-primary">Ezekiel Dunga</p>*/}
                  </div>
                  <div className="col-span-2">
                    <Input
                      name="amount"
                      placeHolder="Enter amount"
                      type="number"
                      label="Amount"
                    />
                  </div>{" "}
                  <div className="col-span-2">
                    <Input
                      name="description"
                      placeHolder="Write a description"
                      type="text"
                      label="Description"
                    />
                  </div>
                </div>
                <div className="mt-8">
                  <div className="flex w-full">
                    <Button
                      onClick={() => {
                        setStep("two");
                      }}
                      className="text-sm text-white p-2 px-3 bg-primary w-full rounded"
                      type="button"
                    >
                      Proceed
                    </Button>
                  </div>
                </div>
              </>
            )}

            {steps === "two" && (
              <>
                <h1 className="text-2xl font-bold mb-4">
                  Transfer Funds to Account
                </h1>{" "}
                <p className="text-sm text-gray-400 mb-1">Wallet Balance</p>
                <h1 className="font-bold text-3xl text-primary mb-4">
                  {_.compact([
                    user?.account?.[0]?.currency,
                    formatNumber(user?.account?.[0]?.balance, "0,0.00"),
                  ]).join(" ")}
                </h1>
                <div className="border-b w-20  border-gray-300 mb-5" />
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <div className="border border-dashed p-4 divide-y space-y-3">
                      <div className="flex justify-between  p-2">
                        <div className={"space-y-1"}>
                          <div>Amount</div>
                          {_.compact([values?.currency, values?.amount]).join(
                            " "
                          )}
                        </div>
                        <div className={"space-y-1 text-right"}>
                          <div>Sort Code</div>
                          <p className="text-gray-500">
                            {_.compact([values?.sortCode]).join(" ")}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between p-2">
                        {/* <div className="space-y-1"> */}
                          {/* <div>Amount Name</div>
                          <p className="text-gray-500">
                            {_.compact([
                              user?.claim?.firstName,
                              user?.claim?.lastName,
                            ]).join(" ")}
                          </p> */}
                        {/* </div> */}
                        <div className="space-y-1">
                          <div>Account Number </div>
                          <p className="text-gray-500">
                            {_.compact([values?.toAccountId]).join(" ")}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-y-1 justify-between p-2">
                        <div>Description</div>
                        <p className="text-gray-500">
                          {_.compact([values?.description]).join(" ")}
                        </p>
                      </div>
                    </div>
                  </div>{" "}
                </div>
                <div className="mt-4">
                  <div className="flex w-full">
                    <Button
                      className="text-sm text-white p-2 px-3 bg-primary w-full rounded"
                      type="submit"
                    >
                      Done
                    </Button>
                  </div>
                </div>
              </>
            )}
            {steps === "three" && (
              <>
                <div className="flex w-full h-full justify-center items-center mt-28">
                  <CheckOutlined
                    className="text-green-600"
                    style={{ width: "200px", fontSize: "6em" }}
                  />
                </div>
                <p className="text-center font-bold">Transaction successful</p>
              </>
            )}
          </Form>
        );
      }}
    </Formik>
  );
};
export const useTransferModal = ({
  setModal,
  modal,
  transferData,
  setTransferData,
}) => {
  return (
    <TransferModal {...{ setModal, modal, transferData, setTransferData }} />
  );
};
export default TransferModal;
