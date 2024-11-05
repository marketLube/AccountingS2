"use client";
import Navigation from "./Navigation";
import { useState } from "react";
import { Manrope } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import store from "@/lib/store";
import Main from "./Main";
import { Toaster } from "react-hot-toast";

const manropeFont = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "700", "800"],
  display: "swap",
});
export const queryClient = new QueryClient();

function AppLayout({ children }) {
  const [isHover, setIsHover] = useState(false);

  return (
    <Provider store={store}>
      <Toaster />
      <QueryClientProvider client={queryClient}>
        <div
          className={`app ${manropeFont.className}`}
          style={isHover ? { gridTemplateColumns: "13rem 1fr" } : {}}
        >
          <Navigation onSetHover={setIsHover} isHover={isHover} />
          <Main>{children}</Main>
        </div>
      </QueryClientProvider>
    </Provider>
  );
}

export default AppLayout;
