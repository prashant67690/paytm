import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import SubHeading from "../components/SubHeading";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const buttonClickHandler = async (e) => {
    e.preventDefault();
    console.log(email + password);
    if (password == "" || email == "") {
      return;
    }

    const res = await axios.post("http://localhost:3000/api/v1/user/signin", {
      username: email,
      password,
    });

    console.log(res.data);
    localStorage.setItem("token", res.data.token);
    navigate("/dashboard");
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2  px-4 py-4">
          <Heading label={"Sign In"} />
          <SubHeading label={"Enter Your Credentials to access your account"} />
          <InputBox
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            label={"Email"}
            placeholder={"johndoe@gmail.com"}
          />
          <InputBox
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="123456"
            label={"Password"}
          />
          <div className="pt-4">
            <Button onClick={buttonClickHandler} label={"Sign in"} />
          </div>
          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Sign up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
}

export default Signin;
