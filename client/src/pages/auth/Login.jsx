import CommonForm from "@/components/common/Form";
import { loginFormControl } from "@/config";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};
const Login = () => {
  const [formData, setFormData] = useState(initialState);
  const onSubmit = () => {};
  return (
    <div className="mx-auto w-full max-w-md space-y-6 ">
      <div className="text-center ">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign In
        </h1>
        <p className="mt-2">Don't have an account</p>
        <Link
          className="font-medium  ml-2 text-primary hover:underline"
          to="/auth/register"
        >
          Register
        </Link>
      </div>
      <CommonForm
        formControls={loginFormControl}
        buttonText={"Login"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default Login;
