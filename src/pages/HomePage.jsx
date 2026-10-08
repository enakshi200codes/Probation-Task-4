import React from "react";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export default function HomePage() {
  useDocumentTitle("Objects for the evening");

  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to Nocturne. Objects for the evening.</p>
    </div>
  );
}