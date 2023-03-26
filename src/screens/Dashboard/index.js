import React from "react";
import DashboardLayout from "src/screens/DashBoardLayout/DashboardLayout";
import MainContent from "src/screens/Dashboard/MainContent";
import UsersProvider from "src/contexts/UsersProvider";

const Dashboard = () => {
  return (
    <UsersProvider>
      <DashboardLayout>
        <MainContent />
      </DashboardLayout>
    </UsersProvider>
  );
};

export default Dashboard;
