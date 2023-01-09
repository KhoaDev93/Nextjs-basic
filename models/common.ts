import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";

export type LayoutProps = {
  children: ReactNode;
};

export type NextPageWithLayout = NextPage & {
  Layout?: (props: LayoutProps) => ReactElement;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
