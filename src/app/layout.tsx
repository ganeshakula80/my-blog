import Navbar from "@/components/navbar";
import "@/styles/globals.css";
import "@/styles/layout.css";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <html lang="en">
        <body>
          <Navbar />
          <main className="container mx-auto p-4">{children}</main>
        </body>
      </html>
    </>
  );
};

export default Layout;
