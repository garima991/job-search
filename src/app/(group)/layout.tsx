'use client'

import Header from "@/components/Header";
import JobContextProvider from "@/context/JobContextProvider";
import { useEffect, useState } from "react";
import { createContext } from "react";


export const UserContext = createContext(null);

export default function Layout({ children }) {
   
   const [user, setUser] = useState(null);

  useEffect(() => {
    async function getUser() {
      const res = await fetch("http://localhost:3000/api/user");
      const data = await res.json();

      if (data.success) {
        setUser(data?.data);
      }
      console.log(data);
    }
    getUser();
  }, []);

    return (
        <UserContext.Provider
        value={{
          user,
          setUser,
        }}
      >
        <JobContextProvider>
        <div className="bg-gray-900 w-full h-screen">
            <div className="sticky top-0 z-50 bg-gray-900">
                <Header />
            </div>
            <main className = "w-full">
            {children}
            </main>
        </div>
        </JobContextProvider>
        </UserContext.Provider>
    )






}