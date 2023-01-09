import { LayoutProps } from "@/models/common";
import Link from "next/link";
import React from "react";

type Props = {};

export default function AdminLayout({ children }: LayoutProps) {
  return (
    <div>
      <h1>Admin Layout</h1>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      {children}
    </div>
  );
}
