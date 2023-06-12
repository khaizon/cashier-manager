"use client"

import { LoginButton } from "@/components/buttons";
import { useSession } from "next-auth/react";


export default function Home() {
  const session = useSession({required: true})
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div style={{
        maxWidth: '100%', textOverflow:"wrap", wordBreak: "break-all"}}>{JSON.stringify(session)}</div>
      <h1>Server Session</h1>
        <LoginButton/>
    </main>
  );
}
