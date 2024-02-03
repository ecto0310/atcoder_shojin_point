import { ReactNode } from "react";
import Provider from "./provider";
import Header from "./header";

interface BodyProps {
  children: ReactNode;
}

const Body = ({ children }: BodyProps) => {
  return (
    <Provider>
      <Header />
      {children}
    </Provider>
  );
};

export default Body;
