import { LayoutProps } from "@/models/common";
import Link from "next/link";
import React from "react";

export default function MainLayout({ children }: LayoutProps) {
  return (
    <div>
      <h1>Main Layout</h1>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      {children}
    </div>
  );
}
