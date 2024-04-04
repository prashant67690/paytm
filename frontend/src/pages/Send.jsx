import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Send() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");

  const paymentHandler = () => {
    axios
      .post(
        "http://localhost:3000/api/v1/account/transfer",
        {
          to: id,
          amount: amount,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        console.log(res.data);
      });

    // navigate("/paymentSuccess");
  };

  return (
    <div className="flex justify-center h-screen bg-gray-100">
      <div className="h-full flex flex-col justify-center">
        <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
          <div className="flex flex-col space-y-1.5 p-6">
            <h2 className="text-3xl font-bold text-center">Send Money</h2>
          </div>
          <div className="flex justify-start">
            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
              <span className="text-white text-2xl">A</span>
            </div>
            <h3 className="ml-2 flex flex-col justify-center text-2xl font-semibold">
              {name}
            </h3>
          </div>
          <div className="mx-5 ml-2 text-xl font-semibold">Amount (in Rs)</div>
          <input
            onChange={(e) => {
              setAmount(e.target.value);
            }}
            type="text"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            id="amount"
            placeholder="Enter amount"
          />
          <button
            onClick={paymentHandler}
            className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white"
          >
            Initiate Transfer
          </button>
        </div>
      </div>
    </div>
  );
}

export default Send;
