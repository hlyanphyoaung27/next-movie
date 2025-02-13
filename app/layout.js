import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { UserContext, UserProvider } from "./authProvider";
import { sessionId } from "./home/page";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

  const userDetails = async() => {
  const token = process.env.TMDB_TOKEN;
  const session = await sessionId();
  const id = session.session_id
  const res = await fetch(`https://api.themoviedb.org/3/account?session_id=${id}`, {
      method: 'GET',
      headers: {
          Authorization: `Bearer ${token}`
      }
  });
  return await res.json()
}





export default async function RootLayout({ children }) {

  const user = await userDetails();
  console.log('hello:', user)

  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
         
              <Header/>
              <div className="p-4">
                <section className="flex gap-4">
                  <Sidebar />
                  <div className="pl-8 border-l-2">
                    <UserProvider user={user}>
                      {children}
                  </UserProvider>
                  </div>
                </section>

                <footer className="text-xs py-4 mt-4 border-t text-gray-600 text-center">
                  &copy; Copyright2024
                </footer>
              </div>
       
        </ThemeProvider>
      </body>
    </html>
  );
}
