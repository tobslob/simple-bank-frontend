import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import home from "../../assets/home.svg";
import trasactions from "../../assets/trasactions.svg";
import contact from "../../assets/contact.svg";
import finances from "../../assets/finances.svg";

function Sidebar() {
  return (
    <Container>
      <h2>Bank App</h2>
      <ListSection>
        <ul>
          <li>
            <Link className="link" to={`/dashboard`}>
              {" "}
              <img src={home} alt="dash" />
              <span>Home</span>
            </Link>
          </li>

          <li>
            <Link className="link" to={`/dashboard`}>
              {" "}
              <img src={finances} alt="dash" />
              <span>Finances</span>
            </Link>
          </li>

          <li>
            <Link className="link" to={`/dashboard`}>
              {" "}
              <img src={trasactions} alt="dash" />
              <span>Trasactions</span>
            </Link>
          </li>

          <li>
            <Link className="link" to={`/dashboard`}>
              {" "}
              <img src={contact} alt="dash" />
              <span>History</span>
            </Link>
          </li>
        </ul>
      </ListSection>
    </Container>
  );
}

export default Sidebar;

const Container = styled.div`
  height: 100vh;
  width: 230px;
  position: fixed;
  z-index: 2;
  h2 {
    padding-left: 22px;
    color: #4f4bf5;
  }
`;

const ListSection = styled.div`
  margin-top: 40px;
  ul {
    list-style-type: none;
    padding-inline-start: 20px !important;
  }
  .link {
    padding-bottom: 50px !important;
    text-decoration: none !important;
    display: flex;
    align-items: center;
    cursor: pointer;
    color: #817d7d;
    span {
      margin-left: 20px;
    }
    &:hover {
      opacity: 1;
    }
  }
  .options {
    .hide {
      display: none;
    }
    .show {
      display: flex;
      flex-direction: column;
      margin-top: -30px;
      padding-bottom: 10px;
      li {
        padding-bottom: 20px;
        cursor: pointer;

        &:hover {
          opacity: 0.5;
        }
      }
      .option {
        color: white;
        text-decoration: none;
      }
    }
  }
  li {
    color: white;
    letter-spacing: 0.4px;
    font: normal normal normal 16px "poppins";
    letter-spacing: 0.4px;
    color: #ffffff;
    padding-left: 10px;
  }
`;
