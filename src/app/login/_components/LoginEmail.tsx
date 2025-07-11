"use client ";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormik } from "formik";
import { ChevronLeft } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import * as Yup from "yup";
import axios from "axios";
import { useAuth } from "@/app/_components/UserProvider";

// type LoginProps = {
//   changeHandler: () => void;
// setEmail: Dispatch<SetStateAction<string>>;
// };

const validationSchemaLogin = Yup.object({
  email: Yup.string()
    .required("Email is required")
    .test(
      "email",
      "Invalid email. Use a format like example@email.com",
      (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
      }
    ),
  //  password: Yup.string().required("Password is required"),
});

export const LoginEmail = () => {
  const router = useRouter();
  const { user, tokenChecker } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchemaLogin,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "https://fooddelivery-backend-goes.onrender.com/login",
          {
            email: values.email,
            password: values.password,
          }
        );

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("email", values.email);
        await tokenChecker(response.data.token);
      } catch (err: any) {
        console.log(err.response.data);
        alert(err.response.data.message);
      }
    },
  });

  const emailInputProps = {
    name: "email",
    value: formik.values.email,
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
  };

  const passInputProps = {
    name: "password",
    value: formik.values.password,
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
  };
  if (user) {
    redirect("/");
  }

  return (
    <div className="flex flex-col  justify-center gap-6  w-[416px] h-full">
      <div className="flex items-start justify-start w-full">
        <Button variant="outline" onClick={() => redirect("/signup")}>
          <ChevronLeft />
        </Button>
      </div>
      <h1 className="font-semibold text-[24px]">Log in </h1>
      <p className="text-[#71717A]">Log in to enjoy your favorite dishes.</p>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col gap-4">
          <Input
            className=" "
            placeholder="Enter your email address"
            {...emailInputProps}
          ></Input>
          <div className="text-red-500">
            {formik.touched && formik.errors.email}
          </div>
          <Input placeholder="Password" {...passInputProps}></Input>
          <div className="text-red-500">
            {formik.touched && formik.errors.password}
          </div>
        </div>
        <div>
          <Button
            variant="link"
            className=""
            onClick={() => redirect("/resetpassword")}
          >
            Forgot password
          </Button>
        </div>
        <Button type="submit" className="w-full" onClick={() => redirect("/")}>
          Let's Go
        </Button>
      </form>

      <div className="flex justify-center items-center">
        <p className="text-[#71717A]">
          Don't have an account?
          <Button
            variant="link"
            className="text-[#2563EB]"
            onClick={() => redirect("/signup")}
          >
            Sign up
          </Button>
        </p>
      </div>
    </div>
  );
};
