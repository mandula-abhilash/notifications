import "./globals.css";

export const metadata = {
  title: "Notifications",
  description:
    "Notifications is a full-stack application designed to demonstrate real-time communication and notification distribution across a distributed system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex justify-center items-center bg-gray-50 my-10">
        {children}
      </body>
    </html>
  );
}
