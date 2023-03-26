import React, { useContext, useState } from "react";
import cogoToast from "cogo-toast";
import { transferServices } from "src/services/transfer.service";

const TransferContext = React.createContext();

export const TransferConsumer = TransferContext.Consumer;
const Provider = TransferContext.Provider;

const TransferProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [transfer, setTransfer] = useState();

  const createTransfer = (params, onCompleteAction) => {
    setLoading(true);
    transferServices
      .createTransfer(params)
      .then((res) => {
        setLoading(false);
        console.log("res", res);
        setTransfer(res);
        onCompleteAction && onCompleteAction(res, params);
        cogoToast.success("Transfer  successfully!!");
      })
      .catch((e) => {
        setLoading(false);
        console.log("e", e);
        cogoToast.error(
          e?.response?.data?.message ||
            "Unable to transfer funds at the moment !!"
        );
      });
  };

  const value = {
    transfer,
    loading,
    createTransfer,
  };
  return <Provider value={value}>{children}</Provider>;
};
export function useTransferContext() {
  const context = useContext(TransferContext);
  if (!context) {
    throw new Error("Wrap component in context ");
  }

  return context;
}

export default TransferProvider;
