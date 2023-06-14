import { google } from "googleapis";
import { getServerSession } from "next-auth";
import { OAuth2Client } from "google-auth-library";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { authOptions } from "@/auth/options";

const sheets = google.sheets("v4");
let auth: OAuth2Client;

export async function GET(request: NextRequest) {
	const token = await getToken({ req: request });
	const session = await getServerSession(authOptions);
	console.log(session)

	if (!token) {
		NextResponse.json({ message: "Unathorized" }, { status: 403 });
	}

	if (!auth) {
		auth = new google.auth.OAuth2({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		});
	}

	auth.setCredentials({ access_token: token?.accessToken, refresh_token: token?.refreshToken });
	auth.apiKey = process.env.GOOGLE_API_KEY;

	const response = await sheets.spreadsheets.values.get({
		spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
		range: "maomao!A:H",
		auth,
	});

	return NextResponse.json(
		{
			data: response.data,
		},
		{
			status: 200,
		}
	);
}
