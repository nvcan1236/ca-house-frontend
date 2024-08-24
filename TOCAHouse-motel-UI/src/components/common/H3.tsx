import { ReactNode } from "react";

const H3 = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return <h3 className={`text-lg font-medium w-fit ${className}`}>{children}</h3>;
};

export default H3;
