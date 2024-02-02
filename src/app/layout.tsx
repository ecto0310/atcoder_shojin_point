import { ReactNode } from "react";
import Provider from "./provider";
import Header from "./header";

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
        <Provider>
          <Header />
          {children}
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
