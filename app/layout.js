import AppLayout from "@/components/layouts/AppLayout";
import "@/styles/globals.css";
import "@/styles/sassStyle.css";

export const metadata = {
  title: {
    template: "%s | Easy Accounts",
    default: "Wellcome  | Easy Accounts",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
