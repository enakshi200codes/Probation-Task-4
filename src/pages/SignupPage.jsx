import React from "react";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export default function SignupPage() {
  useDocumentTitle("Create Account");

  return (
    <div>
      <h1>Create Account</h1>
      <p>Join Nocturne.</p>
    </div>
  );
}