import React from "react";
import { Header } from "../../page/header/Header";
import { Footer } from "../../page/footer/Footer";

export const MainLayout = ({ children }) => {
  return (
    <div>
      {/* header goes here  */}
      <Header />

      <div className="main">{children}</div>

      {/* footer goes here  */}

      <Footer />
    </div>
  );
};
