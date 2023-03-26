import React, { createContext, useContext, useState } from "react";
import { redirect, useLocation } from "react-router-dom";
import { transactionService } from "src/services/transaction.service";

const ApplicationContext = createContext();
const Provider = ApplicationContext.Provider;
function AccountProvider({ children }) {
  const location = useLocation();
  const id = location.query.id;
  const [application, setApplication] = useState();
  const [userApplication, setUserApplication] = useState([]);
  const [applications, setApplications] = useState([]);
  const [analytics, setAnalytics] = useState([]);
  const [loading, setLoading] = useState(false);

  const getApplications = (params, onComplete) => {
    setLoading(true);
    transactionService
      .getTransactions(params)
      .then((res) => {
        setLoading(false);
        setApplications(res);
        onComplete && onComplete(res);
      })
      .catch((e) => {
        setLoading(false);
        console.log("e", e);
      });
  };

  const getApplicationById = (id, onComplete) => {
    setLoading(true);
    transactionService
      .getApplication(id)
      .then((res) => {
        setLoading(false);
        console.log("res single opening", res);
        setApplication(res);
        onComplete && onComplete(res);
      })
      .catch((e) => {
        setLoading(false);
        console.log("e", e);
      });
  };
  const getApplicationByUserId = (id, onComplete) => {
    setLoading(true);
    transactionService
      .getApplicationByUserId(id)
      .then((res) => {
        setLoading(false);
        console.log("res single opening", res);
        setUserApplication(res);
        onComplete && onComplete(res);
      })
      .catch((e) => {
        setLoading(false);
        console.log("e", e);
      });
  };

  const createApplication = (param, onComplete) => {
    setLoading(true);
    transactionService
      .createApplication(param)
      .then((res) => {
        setLoading(false);
        console.log("created application", res);
        setApplication(res);
        onComplete && onComplete(res);
      })
      .catch((e) => {
        setLoading(false);
        console.log("e", e);
      });
  };
  const updateApplicationStatus = (id, status, onComplete) => {
    setLoading(true);
    transactionService
      .updateApplicationStatus(id, status)
      .then((res) => {
        setLoading(false);
        console.log("updated application", res);
        setApplication(res?.data);
        getApplicationById(res?.data?.id);
        onComplete && onComplete(res);
      })
      .catch((e) => {
        setLoading(false);
        console.log("e", e);
      });
  };

  const getAnalytics = (params, onComplete) => {
    setLoading(true);
    transactionService
      .getAnalytics(params)
      .then((res) => {
        setLoading(false);
        setAnalytics(res);
        onComplete && onComplete(res);
      })
      .catch((e) => {
        setLoading(false);
        console.log("e", e);
      });
  };

  const value = {
    createApplication,
    getApplications,
    getApplicationByUserId,
    getApplicationById,
    updateApplicationStatus,
    getAnalytics,
    analytics,
    loading,
    userApplication,
    applications,
    application,
  };

  return <Provider value={value}>{children}</Provider>;
}

export function useApplicationContext() {
  const context = useContext(ApplicationContext);
  if (!context) {
    throw new Error("Wrap component in opening provider  ");
  }

  return context;
}

export default AccountProvider;
