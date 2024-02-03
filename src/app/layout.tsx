import { ReactNode } from "react";
import Body from "./body";

export const metadata = {
  title: "AtCoder Shojin Point",
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html>
      <body>
        <Body>{children}</Body>
      </body>
    </html>
  );
};

export default RootLayout;
