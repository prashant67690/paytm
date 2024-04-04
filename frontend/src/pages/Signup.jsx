import React, { useState } from "react";
import axios from "axios";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import SubHeading from "../components/SubHeading";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const buttonClickHandler = async (e) => {
    e.preventDefault();
    console.log(firstName + lastName + email + password);
    if (firstName == "" || lastName == "" || password == "" || email == "") {
      return;
    }

    const res = await axios.post("http://localhost:3000/api/v1/user/signup", {
      username: email,
      password,
      firstname: firstName,
      lastname: lastName,
    });

    console.log(res.data);
    localStorage.setItem("token", res.data.token);
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2  px-4 py-4">
          <Heading label={"Sign Up"} />
          <SubHeading label={"Enter your infromation to create an account"} />
          <InputBox
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            placeholder="John"
            label={"First Name"}
          />
          <InputBox
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            placeholder="Doe"
            label={"Last Name"}
          />
          <InputBox
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="abc@gmail.com"
            label={"Email"}
          />
          <InputBox
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="*********"
            label={"Password"}
          />
        </div>
        <div className="pt-4">
          <Button label={"Sign Up"} onClick={buttonClickHandler} />
        </div>
        <BottomWarning
          label={"Already have an account?"}
          buttonText={"Sign in"}
          to={"/signin"}
        />
      </div>
    </div>
  );
}

export default Signup;
