import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const SCOPES = [
	"https://www.googleapis.com/auth/spreadsheets",
	"https://www.googleapis.com/auth/userinfo.email",
	"https://www.googleapis.com/auth/userinfo.profile",
	"openid",
];

export const authOptions: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
			authorization: {
				params: {
					access_type: "offline",
					response_type: "code",
					scope: SCOPES.join(" "),
				},
			},
		}),
	],
	callbacks: {
		async jwt({ token, account }) {
			if (account) {
				token.accessToken = account?.access_token;
				token.refreshToken = account?.refresh_token;
				token.scope = account?.scope;
			}

			return token;
		},
		async session({ session, token }) {
			session.accessToken = token.accessToken as string;
			session.refreshToken = token.refreshToken as string;
			session.scope = token.scope as string;
			return session;
		},
	},
};
