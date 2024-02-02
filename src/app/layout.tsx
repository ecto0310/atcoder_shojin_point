import { ReactNode } from "react";
import Provider from "./provider";

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
        <Provider>{children}</Provider>
      </body>
    </html>
  );
};

export default RootLayout;
