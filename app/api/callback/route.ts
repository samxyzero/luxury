import { NextResponse } from "next/server";

function renderMessage(status: "success" | "error", payload: Record<string, string>) {
  const message = `authorization:github:${status}:${JSON.stringify(payload)}`;
  const html = `<!DOCTYPE html>
<html>
  <body>
    <script>
      (function () {
        function receiveMessage(e) {
          window.opener.postMessage(
            ${JSON.stringify(message)},
            e.origin
          );
          window.removeEventListener("message", receiveMessage, false);
        }
        window.addEventListener("message", receiveMessage, false);
        window.opener.postMessage("authorizing:github", "*");
      })();
    </script>
  </body>
</html>`;
  return new NextResponse(html, {
    status: 200,
    headers: { "Content-Type": "text/html" },
  });
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const cookieState = request.headers
    .get("cookie")
    ?.split("; ")
    .find((c) => c.startsWith("decap_oauth_state="))
    ?.split("=")[1];

  const clientId = process.env.GITHUB_OAUTH_ID;
  const clientSecret = process.env.GITHUB_OAUTH_SECRET;

  if (!clientId || !clientSecret) {
    return renderMessage("error", { message: "OAuth app is not configured on the server." });
  }
  if (!code || !state || state !== cookieState) {
    return renderMessage("error", { message: "Invalid or expired authorization request." });
  }

  try {
    const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: `${url.origin}/api/callback`,
      }),
    });

    const data = await tokenRes.json();
    if (!data.access_token) {
      return renderMessage("error", {
        message: data.error_description || "GitHub did not return an access token.",
      });
    }

    const response = renderMessage("success", {
      token: data.access_token,
      provider: "github",
    });
    response.cookies.delete("decap_oauth_state");
    return response;
  } catch {
    return renderMessage("error", { message: "Failed to exchange authorization code." });
  }
}
