// my-project/types/next-auth.d.ts

import {NextAuth, Account} from "next-auth";

declare module "next-auth" {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		accessToken: string;
		refreshToken: string;
		scope: string;
		expires: number;
	}
	interface Account {
		access_token: string;
    refresh_token: string;
    scope: string;
    expires_at: number;
	}
}

import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
	interface JWT {
		user: {
			name: string;
			email: string;
			image: string;
		};
		accessToken: string;
		refreshToken: string;
		accessTokenExpires: number;
    scope: string;
	}
}