"use client";
import React from "react";

import AuthForm from "@/components/forms/AuthForms";
import { SignUpSchema } from "@/lib/validations";

const SignUp = () => {
  return (
    <AuthForm
      formType="SIGN_UP"
      schema={SignUpSchema}
      defaultValue={{
        username: "",
        name: "",
        email: "",
        password: "",
      }}
      onSubmit={(data) => Promise.resolve({ success: true })}
    />
  );
};

export default SignUp;
