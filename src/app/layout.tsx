// src/app/layout.tsx

import Navbar from "@/components/navbar";
import { UserProvider } from "@/contexts/UserContext";  // Import UserProvider
import "@/styles/globals.css";
import "@/styles/layout.css";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>My Blog</title>
        <meta name="description" content="A platform to share and read blogs" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <UserProvider> {/* Wrap with UserProvider */}
          <Navbar />
          <main className="container mx-auto p-4">{children}</main>
        </UserProvider>
      </body>
    </html>
  );
};

export default Layout;
