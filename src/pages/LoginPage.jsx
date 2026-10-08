import React from "react";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export default function LoginPage() {
  useDocumentTitle("Log In");

  return (
    <div>
      <h1>Log In</h1>
      <p>Access your Nocturne account.</p>
    </div>
  );
}