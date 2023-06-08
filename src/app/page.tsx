import googleURL from "./auth/googleURL";

export default function Home() {
  const loginURL = googleURL();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="text-red-500">{process.env.GOOGLE_CLIENT_ID}</div>
      <a className="text-red-500" href={loginURL}>
        Login
      </a>
    </main>
  );
}
