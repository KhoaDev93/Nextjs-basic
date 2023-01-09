import { LayoutProps } from "@/models/common";
import React from "react";

export default function EmptyLayout({ children }: LayoutProps) {
  return <div>{children}</div>;
}
