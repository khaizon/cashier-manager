const SCOPES = "https://www.googleapis.com/auth/spreadsheets";

const googleURL = () => {
  const rootURL = "https://accounts.google.com/o/oauth2/v2/auth";
  const params = new URLSearchParams({
    client_id: `${process.env.GOOGLE_CLIENT_ID}`,
    redirect_uri: `${process.env.BASE_URL}/google`,
    response_type: "code",
    scope: SCOPES,
    access_type: "offline",
  });
  return `${rootURL}?${params}`;
};

export default googleURL;
