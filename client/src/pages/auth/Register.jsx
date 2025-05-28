import CommonForm from "@/components/common/Form";
import { registerFormControl } from "@/config";
import { registerUser } from "@/store/auth-slice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const initialState = {
  userName: "",
  email: "",
  password: "",
};
const Register = () => {
  const [formData, setFormData] = useState(initialState);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast.success(data?.payload?.message);
        navigate("/auth/login");
      } else {
        console.log(data)
        toast.error(data?.error?.message);
        toast.error(data?.error?.name)
      }
    });
  };
  
  console.log(formData);
  return (
    <div className="mx-auto w-full max-w-md space-y-6 ">
      <div className="text-center ">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create New Account
        </h1>
        <p className="mt-2">Already have an account</p>
        <Link
          className="font-medium  ml-2 text-primary hover:underline"
          to="/auth/login"
        >
          Login
        </Link>
      </div>
      <CommonForm
        formControls={registerFormControl}
        buttonText={"Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default Register;
