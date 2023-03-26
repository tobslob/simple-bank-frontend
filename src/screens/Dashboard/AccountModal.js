import React from "react";
import ModalLayout from "src/components/modal";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { CloseOutlined, CopyOutlined } from "@ant-design/icons";
import { Button, Input, MultiSelect } from "src/components/fields";
import { useUsersContext } from "src/contexts/UsersProvider";
import { useAuthUser } from "src/hooks";
import { formatNumber } from "src/utils";
import cogoToast from "cogo-toast";
import { useTransactionsContext } from "src/contexts/TransactionsProvider";
import { accountServices } from "src/services/account.service";

function AccountModal({ user, setModal, modal, accountData, setAccountData }) {
  return (
    <ModalLayout
      isDrawer={true}
      showHeader
      title=""
      isOpen={modal}
      setIsOpen={setModal}
    >
      <AccountForm
        {...{
          user,
          setModal,
          modal,
          accountData,
          setAccountData,
        }}
      />
    </ModalLayout>
  );
}
export const AccountForm = ({ setModal, accountData, setAccountData }) => {
  const initialValues = {
    transfer_type: "",
    balance: "",
    description: "",
  };

  const { getUserByToken, user } = useUsersContext();
  const { user: authUser, token } = useAuthUser();
  const { getTransactions } = useTransactionsContext();
  const validationSchema = Yup.object().shape({
    transfer_type: Yup.string().required("This field is required"),
    balance: Yup.string().required("Amount is required"),
    description: Yup.string().notRequired(),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log("values", values);
        const { transfer_type, ...others } = values;
        accountServices
          .addMoney(others)
          .then((res) => {
            console.log("res", res);
            getTransactions();
            getUserByToken(token);
            setModal(false);
            cogoToast.success("Account has been topped up successfully!!");
          })
          .catch((e) => {
            cogoToast.error(
              e?.response?.data?.message ||
                "Unable to complete your transaction at the moment!"
            );
          });
      }}
    >
      {({ values, errors }) => {
        console.log("active valeue", values, errors);
        return (
          <Form>
            <div className="flex justify-end pb-3 ">
              <CloseOutlined className="w-14" onClick={() => setModal(false)} />
            </div>
            <h1 className="text-2xl font-bold mb-4 ">Fund Wallet</h1>
            <p className=" text-gray-400 text-sm">Wallet balance</p>{" "}
            <h2 className=" text-primary font-bold text-3xl">
              ${formatNumber(authUser?.claim?.account[0]?.balance, "0,0.00")}
            </h2>{" "}
            <div className="w-20 border-b border-gray-400 my-4"></div>
            {/*<hr className="-mx-5" />*/}
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <div className="space-x-3 flex  ">
                  <label className="text-sm flex justify-start  font-medium text-gray-900">
                    <Field
                      className="w-4 h-4 text-primary border-gray-200  focus:ring-primary"
                      type="radio"
                      name="transfer_type"
                      value="account"
                    />
                    <span className="ml-2">Bank Transfer</span>
                  </label>
                  <label className="text-sm flex  justify-start   font-medium text-gray-900">
                    <Field
                      className="w-4 h-4 bg-primary border-gray-200  "
                      type="radio"
                      name="transfer_type"
                      value="card"
                    />
                    <span className="ml-2">Fund by Card</span>
                  </label>
                </div>
              </div>
              {values?.transfer_type === "card" ? (
                <>
                  <div className="col-span-2">
                    <Input name="balance" type="number" label="Enter amount" />
                  </div>{" "}
                  <div className="col-span-2">
                    <MultiSelect
                      checkboxClass={"w-full"}
                      extraClasses="!w-full col-span-2 !justify-between"
                      multiple={false}
                      format={() => {
                        return (
                          <div className="grid grid-cols-6 w-full ">
                            <div className="col-span-1">
                              <div className="bg-primary ring-primary rounded-full w-5 h-5" />
                            </div>
                            <div className="col-span-3">
                              <p>**** **** **** 0654</p>
                              <p className="text-gray-400 uppercase">
                                Expire Date
                              </p>
                            </div>
                            <div className="col-span-2">
                              <h2 className="text-bold text-2xl">03/24</h2>
                              <p className="text-gray-400">Expire Date</p>
                            </div>
                          </div>
                        );
                      }}
                      optionLabel="name"
                      optionValue="code"
                      options={[{ name: "card", code: "card" }]}
                      name="card"
                    />
                  </div>
                  <div className="col-span-2">
                    <Input name="description" />
                  </div>
                </>
              ) : (
                <>
                  <div className="col-span-2">
                    <div className=" divide-y border border-dashed ">
                      <div className="flex w-3/4 p-6   justify-between">
                        <div>
                          <p className="text-gray-400">Account number </p>
                          <p className="font-bold">134343</p>
                        </div>
                        <div>
                          <CopyOutlined className="text-primary" />
                        </div>
                        <div>
                          <p className="text-gray-400">Sort code</p>
                          <p className="font-bold">134343</p>
                        </div>
                      </div>
                      <div className="flex p-6">
                        <div>
                          <p className="text-gray-300">Beneficiary Name </p>
                          <p className="font-bold">John Doe</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2 text-center text-xs text-gray-400">
                    To fund wallet via a bank transfer, pleaase copy the account
                    number above and send your funds to it
                  </div>
                </>
              )}
              <div className="col-span-2 -mx-5">
                <hr />
              </div>
              <div className="col-span-2 flex justify-between  mt-4">
                <Button
                  className="text-sm  text-white p-2 px-3 bg-primary w-full rounded-full ring-primary ring-offset-primary"
                  type="submit"
                >
                  Done
                </Button>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
export const useAccountModal = ({
  setModal,
  modal,
  accountData,
  setAccountData,
}) => {
  return <AccountModal {...{ setModal, modal, accountData, setAccountData }} />;
};
export default AccountModal;
