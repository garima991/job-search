'use client'

import Header from "@/components/Header";
import JobContextProvider from "@/context/JobContextProvider";
import { useEffect, useState, createContext } from "react";

export const UserContext = createContext(null);

export default function Layout({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getUser() {
      try {
        const res = await fetch("http://localhost:3000/api/user", {
          credentials: "include"
        });
        const data = await res.json();

        if (data.success) {
          setUser(data?.data);
        }
        console.log(data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    }
    getUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <JobContextProvider>
        {/* Page background now uses theme variables */}
        <div
          style={{
            background: "var(--background)",
            color: "var(--foreground)",
            minHeight: "100vh",
            width: "100%"
          }}
        >
          {/* Header stays sticky with glass effect */}
          <div className="sticky top-0 z-50 glass">
            <Header />
          </div>

          <main className="w-full">
            {children}
          </main>
        </div>
      </JobContextProvider>
    </UserContext.Provider>
  );
}
