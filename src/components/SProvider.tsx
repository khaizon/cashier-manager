'use client'

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export default function SProvider({ children }: { children: ReactNode }) {
	return <SessionProvider>{children}</SessionProvider>;
}
