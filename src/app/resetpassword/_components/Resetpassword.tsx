"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { ChevronLeft } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import * as Yup from "yup";

type Props = {
  nextHandler: () => void;
};
export const Resetpassword = ({ nextHandler }: Props) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [step, setStep] = useState("email");
  const handleSendCode = async () => {
    try {
      const res = await axios.post("http://localhost:8000/sendCode", { email });

      // console.log("Код илгээгдлээ:", res.data);
      alert("Код имэйл рүү илгээгдлээ");

      // setStep("code");
      // router.push("/verifyCode");
    } catch (err: any) {
      console.error(err);

      // err.response байна уу шалгана
      if (err.response?.data?.message) {
        alert(err.response.data.message);
      } else {
        alert("Server алдаа");
      }
    }
  };

  return (
    <div className="flex flex-col  justify-center gap-6  w-[416px] h-full">
      <div className="flex items-start justify-start w-full">
        {" "}
        <Button variant="outline">
          <ChevronLeft />
        </Button>
      </div>

      <h1 className="font-semibold text-[24px]"> Reset your password </h1>
      <p className="text-[#71717A]">Enter your email to receive a password .</p>

      {/* <form onSubmit={}> */}
      <Input
        placeholder="example@gmail.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      ></Input>
      <Button
        type="submit"
        onClick={async () => {
          await handleSendCode();
          localStorage.setItem("resetEmail", email); //email save
          nextHandler();
        }}
      >
        Send code
      </Button>
      <p>
        Don’t have an account?
        <Button
          variant="link"
          className="text-[#2563EB]"
          onClick={() => redirect("/signup")}
        >
          Sign up
        </Button>
      </p>
      {/* </form> */}
    </div>
  );
};
