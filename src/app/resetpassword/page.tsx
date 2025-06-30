"use client"

import { useState } from "react";
import { Resetpassword } from "./_components/Resetpassword";
import { RightPhoto } from "./_components/rigthPhoto";
import { VerifyCode } from "./_components/verifyCode";

const ResetPasswordPage = () => {
  const arr = [Resetpassword,VerifyCode];
  const [index, setIndex] = useState(0);
  const nextHandler = () => {
    setIndex((prev) => prev + 1);
  };
  const backHandler=()=>{
    setIndex((prev)=>prev-1)
  }
    const Stepper = arr[index];
  return (
    <div className="w-screen h-screen flex p-5">
      <div className="flex-1/5 h-full justify-center">
        {/* <Resetpassword nextHandler={nextHandler}/> */}
        <Stepper nextHandler={nextHandler} backHandler={backHandler} />
      </div>

      <div className="flex-2/5 h-full">
        <RightPhoto />
      </div>
    </div>
  );
};
export default ResetPasswordPage;
