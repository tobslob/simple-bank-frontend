import React from "react";
import styled from "styled-components";
import Sidebar from "src/screens/DashBoardLayout/SideBar";
import Header from "src/screens/DashBoardLayout/Header";

function DashboardLayout({ children }) {
  // useAuthorization();
  return (
    <Div>
      <Sidebar className="sec" />

      <Header />
      <Main>{children}</Main>
    </Div>
  );
}

export default DashboardLayout;
const Div = styled.div`
  section {
    @media (max-width: 500px) {
      display: none !important;
    }
  }
`;

const Main = styled.main`
  position: fixed;
  right: 0;
  height: calc(100% - 90px);
  bottom: 0;
  width: calc(100% - 230px);
  padding: 30px;
  overflow-y: scroll;
  background: #fafaff;

  @media (max-width: 500px) {
    width: 100%;
  }
`;
