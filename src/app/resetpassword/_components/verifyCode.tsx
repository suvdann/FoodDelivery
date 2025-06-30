"use client";

import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { ChevronLeft, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  nextHandler: () => void;
  backHandler: () => void;
};
export const VerifyCode = ({ nextHandler, backHandler }: Props) => {
  const [code, setCode] = useState("");
  const [seconds, setSeconds] = useState(60);

  const [canResend, setCanResend] = useState(false);

  // timer ajiluulah

  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true); // 0 bolson uyd resend
    }
  }, [seconds]);
  const handleVerify = async () => {
    const email = localStorage.getItem("resetEmail");
    // console.log("Илгээх email:", email);
    // console.log("Илгээх code:", code);
    if (!email) {
      alert("Email олдсонгүй.");
      return;
    }
    try {
      const res = await fetch(
        "https://fooddelivery-backend-zyay.onrender.com/checkOpt",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code, email }),
        }
      );

      const data = await res.text();

      // console.log("Сервер хариу:", data);
      if (res.ok) {
        alert("Код зөв байна!");
        nextHandler();
      } else {
        alert("Код буруу байна!");
      }
    } catch (err) {
      console.error(err);
      alert("Серверийн алдаа");
    }
    1;
  };

  return (
    <div className="flex justify-center items-center  w-[416px] h-full">
      <div className=" flex flex-col gap-5 items-center justify-center ">
        <Button variant="outline" onClick={backHandler} className="">
          <ChevronLeft />
        </Button>
        <h1 className="font-semibold text-[20px]">
          Enter the code sent to your email
        </h1>

        <div className="">
          <InputOTP
            maxLength={4}
            value={code}
            onChange={(value) => setCode(value)}
          >
            <InputOTPGroup className="flex gap-2">
              <InputOTPSlot
                index={0}
                className="w-12 h-12 text-2xl border border-gray-300 rounded"
              />
              <InputOTPSlot
                index={1}
                className="w-12 h-12 text-2xl border border-gray-300 rounded"
              />
              <InputOTPSlot
                index={2}
                className="w-12 h-12 text-2xl border border-gray-300 rounded"
              />
              <InputOTPSlot
                index={3}
                className="w-12 h-12 text-2xl border border-gray-300 rounded"
              />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <div className="flex items-center justify-center gap-6">
          <Button
            onClick={handleVerify}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Verify Code
          </Button>

          <Button
            disabled={!canResend} // canResend=false үед товч ажиллахгүй
            onClick={async () => {
              const email = localStorage.getItem("resetEmail");

              if (!email) {
                alert("Email алга байна.");
                return;
              }

              try {
                // Кодыг дахин илгээх
                await fetch(
                  "https://fooddelivery-backend-ic50.onrender.com/sendCode",
                  {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email }),
                  }
                );

                alert("Код дахин илгээгдлээ");

                // Таймерийг дахин эхлүүлнэ
                setSeconds(60);
                setCanResend(false);
              } catch (err) {
                alert("Код илгээхэд алдаа гарлаа");
                console.error(err);
              }
            }}
            variant={canResend ? "default" : "outline"} // гадаад төрх
          >
            {canResend ? "Resend" : `Resend in ${seconds}s`}
          </Button>
        </div>
      </div>
    </div>
  );
};
