"use client";

import { GlobalProvider } from "@/contexts/GlobalContext";
import Main from "./Main";

const Page = () => {
  return (
    <GlobalProvider>
      <Main />
    </GlobalProvider>
  );
};

export default Page;
