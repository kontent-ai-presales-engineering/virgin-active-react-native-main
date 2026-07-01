import type { ReactNode } from "react";

type WebLayoutProps = {
  readonly children: ReactNode;
};

export const WebLayout = ({ children }: WebLayoutProps) => <>{children}</>;
