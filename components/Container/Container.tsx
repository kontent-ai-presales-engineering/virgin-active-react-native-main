import type { ReactNode } from "react";

type ContainerProps = {
  readonly children: ReactNode;
};

export const Container = ({ children }: ContainerProps) => <>{children}</>;
