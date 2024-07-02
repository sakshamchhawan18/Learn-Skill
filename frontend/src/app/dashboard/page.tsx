"use client";

import Logout from "@/components/buttons/Logout";

export default function Home() {
  const handleClick = ()=>{

  }   
  return (

      <main className="flex min-h-screen flex-col items-center justify-between p-24">
              <h1>Work in progress from dashboard classes</h1>
              {/* <button onClick={handleClick}>Logout</button> */}
              <Logout />
      </main>
    );
  }
  