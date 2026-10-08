import React from "react";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export default function NotFoundPage() {
  useDocumentTitle("404 Not Found");

  return (
    <div>
      <h1>404 — Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
}