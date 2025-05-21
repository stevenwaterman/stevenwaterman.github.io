import { SnippetConfig } from "../../lib/blog/blogData";

const ws: SnippetConfig = {
	name: "Basic Client",
	language: "ts",
	snippet: `
  // You will need to adjust this based on your WS message schema
  // Assuming "AUTH <token>" to authenticate, server responds "AUTH OK/ERROR"
  // Assuming server sends "AUTH EXPIRED" when your token expires

  let tokenPromise: Promise<string> = fetchToken();

  async function authenticate() {
    const token = await tokenPromise;
    ws.send("AUTH " + token);
  }

  ws.onOpen = () => authenticate();
  ws.onMessage = (event) => {
      if (event.data === "AUTH EXPIRED" || event.data === "AUTH ERROR") {
        tokenPromise = fetchToken();
        authenticate();
      }
  }
  `
};

export default {
	ws
};
