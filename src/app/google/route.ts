interface GoogleTokenResult {
  access_token: string;
  expires_in: Number;
  refresh_token: string;
  scope: string;
  id_token: string;
}

const getToken = async (code: string): Promise<GoogleTokenResult> => {
  const url = "https://oauth2.googleapis.com/token";
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID as string,
    client_secret: process.env.GOOGLE_CLIENT_SECRET as string,
    code,
    grant_type: "authorization_code",
    redirect_uri: `${process.env.BASE_URL}/google`,
  });

  return await fetch(`${url}?${params}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then((res) => res.json())
    .catch((e) => console.log(e));
};

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const searchParams = new URLSearchParams(requestUrl.search);
  const code = searchParams.get("code") as string;

  const googleTokenResult = await getToken(code);
  console.log(googleTokenResult);
  const { access_token, expires_in, refresh_token } = googleTokenResult;
  return new Response("Hello, Next.js!", {
    status: 200,
    headers: { referer: code },
  });
}
