"use client";

import React from "react";

import AuthForm from "@/components/forms/AuthForms";
import { SignInSchema } from "@/lib/validations";

const SignIn = () => {
  return (
    <AuthForm
      formType="SIGN_IN"
      schema={SignInSchema}
      defaultValue={{
        email: "",
        password: "",
      }}
      onSubmit={(data) => Promise.resolve({ success: true })}
    />
  );
};

export default SignIn;
