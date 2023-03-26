import React from "react";
import styled from "styled-components";
import { BellFilled, MailFilled } from "@ant-design/icons";
import { useAuthUser } from "src/hooks";

function TopHeader() {
  const { user } = useAuthUser();
  console.log("user in header", user);
  return (
    <HeadContainer className="top-header drop-shadow-md z-10">
      <div className="">
        <p className="font-bold text-primary text-2xl">
          Hello {user?.claim?.firstName}
        </p>
        <span className="text-gray-400 text-sm">Glad to see you again</span>
      </div>

      <div className="flex space-x-2 ">
        <div className=" bg-gray-100  cursor-pointer rounded">
          <MailFilled className="bell text-primary w-14 mb-2" />
        </div>{" "}
        <div className=" bg-gray-100  cursor-pointer rounded">
          <BellFilled className="bell text-primary w-14 mb-2" />
        </div>
      </div>
    </HeadContainer>
  );
}

export default TopHeader;

const HeadContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  padding: 10px 60px 10px 40px;
  border-bottom: 1px solid #eaeaea;
  opacity: 1;
  height: 90px;
  box-sizing: border-box;
  float: right;
  width: calc(100% - 230px);
  .welcome-text {
    p {
      margin: 0;
      margin-bottom: 10px;
      color: #4f4bf5;
      font-size: 18px;
      font-weight: bold;
    }
  }
  @media screen and (max-width: 500px) {
    display: flex;
    padding: 10px 40px 10px 40px;
  }
  .menu-icon {
    display: none;
    @media (max-width: 500px) {
      display: block;
      color: #707070;
      font-family: MonserratLight;
      font-size: 28px;
    }
  }

  h5 {
    letter-spacing: 0.12px;
    color: #707070;
    opacity: 1;
    font-weight: 500;
    font-size: 14px;
    font-family: "poppins";
    @media screen and (max-width: 400px) {
      display: none;
    }
    @media screen and (max-width: 500px) {
      display: none;
    }
  }

  .right-con {
    display: flex;
    justify-content: center;
    align-items: center;
    .user-avatar {
      @media screen and (max-width: 500px) {
        display: none;
      }
      @media screen and (max-width: 400px) {
        display: none;
      }
    }
  }
  .bell {
    @media screen and (max-width: 400px) {
      margin-left: -1rem;
      font-size: 3rem;
      width: 30px;
    }
    @media screen and (max-width: 500px) {
      margin-left: -1rem;
      font-size: 3rem;
      width: 30px;
    }
  }

  .nots {
    position: relative;
    margin-left: 20px;
    margin-right: 20px;
    display: inline-block;
    outline: none;
    .anticon.anticon-bell {
      outline: none !important;
    }
    .red-circle {
      position: absolute;
      top: 0px;
      right: 0px;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #f42753;
      border: 2.2px solid #fff;
    }

    .messages {
      position: absolute;
      right: 30%;
      background: #ffffff;
      max-height: 500px;
      overflow-y: scroll;
      /* padding: 0.5rem 1rem; */
      color: #707070;
      width: 300px;
      text-align: left;
      border-radius: 5px;
      box-shadow: 0px 0px 10px #00000029;
      .new-msg {
        margin: 10px !important;
        font-family: "poppins";
        font-size: 14px;
      }
      p {
        text-align: center;
      }
      @media (max-width: 400px) {
        left: 10%;
        width: 250px;
      }
      @media (max-width: 500px) {
        width: 250px;
        left: 10%;
      }
      .message {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding-bottom: 1.2rem;
        border-top: 1px solid #bfc2c7;
        padding: 10px 25px;
        /* margin-top:10px !important; */
        h5 {
          margin: 0 !important;
          font-weight: bold;
          font-family: "poppins" !important;
        }
        p {
          margin-top: 5px !important;
          text-align: left;
          width: 100%;
          font-size: 14px;
          color: #707070;
          font-weight: 400;
          line-height: 22px;
        }
        button {
          float: right;
          background: transparent;
          border: none;
          color: #0092e0;
          text-transform: capitalize;
          cursor: pointer;
          outline: none;
          margin-left: 10px;
          &.read {
            font-weight: bolder;
          }
        }

        p {
          letter-spacing: 0.32px;
          opacity: 1;
          font-weight: normal;
        }
      }
    }
  }

  .profile-icon {
    margin-left: 20px;
    margin-right: 20px;
  }

  .user-avatar {
    display: flex;

    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 1px solid #e2e2ea;
      opacity: 1;
    }
  }

  .user-info {
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    p {
      &:nth-child(1) {
        letter-spacing: 0.24px;
        letter-spacing: 0.44px;
        color: #173049;
        font-family: "poppins";
        font-size: 14px;
        margin: 0;
      }

      &:nth-child(2) {
        letter-spacing: 0.21px;
        font-family: "poppins";
        color: #707070;
        opacity: 0.95;
        font-weight: 500;
        font-size: 10px;
        margin: 0;
      }
    }
  }
`;
