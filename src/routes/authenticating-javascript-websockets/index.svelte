<script lang="ts">
	import BlogPost from "$lib/blog/BlogPost.svelte";
	import Snippet from "$lib/blog/snippets/Snippet.svelte";
	import snippets from "./snippets";
</script>

<BlogPost id="authenticating-javascript-websockets">
	<p>
		When I was the naive new guy at TalkJS, someone suggested that I could tackle renewable
		authentication for our WebSockets. And after only a couple of weeks, it worked great on my
		machine™.
	</p>

	<p>...but if your token expired while you were in a tunnel then it would break forever.</p>

	<h2>The Problem</h2>

	<p>
		When you enter the tunnel, you disconnect from the internet and your WebSocket connection
		closes. We start trying to reconnect, but after you leave the tunnel, the attempts to reconnect <em
			>still</em
		> fail, because now your token expired.
	</p>

	<p>That's easy, we'll just check for the 401 status code. Right?</p>

	<figure>
		<img
			src="/assets/blog/authenticating-javascript-websockets/meme.jpg"
			alt={`A "for the better, right?"" meme, using cats, "Your WebSocket connection failed" / "Because I'm in a tunnel, right?" / <blank> / "Because I'm in a tunnel, right?"`}
			style="max-width: 50%"
		/>
		<figcaption>Me encountering reality (2024)</figcaption>
	</figure>

	<h3>IETF RFC 6455</h3>

	<p>The general WebSocket specification is happy to tell us about that 401 status code:</p>

	<blockquote>
		If the connection could not be opened, either because a direct connection failed or because any
		proxy used returned an error, then the client MUST <em>Fail the WebSocket Connection</em> and
		abort the connection attempt.
		<cite><a href="https://datatracker.ietf.org/doc/html/rfc6455#section-4.1">Section 4.1</a></cite>
	</blockquote>

	<blockquote>
		Certain algorithms and specifications require an endpoint to <em
			>Fail the WebSocket Connection</em
		>. To do so, the client MUST <em>Close the WebSocket Connection</em>, and MAY report the problem
		to the user (which would be especially useful for developers) in an appropriate manner.
		<cite
			><a href="https://datatracker.ietf.org/doc/html/rfc6455#section-7.1.7">Section 7.1.7</a></cite
		>
	</blockquote>

	<h3>WHATWG WebSockets Standard</h3>

	<p>But when it comes to the browser specification, they're having none of it:</p>

	<blockquote>
		User agents must not convey any failure information to scripts... [because it] would allow a
		script to probe the user’s local network in preparation for an attack.
		<cite><a href="https://websockets.spec.whatwg.org/#message-example">Section 4</a></cite>
	</blockquote>

	<p>
		At its core, this is because WebSocket connections don't support CORS. The initial WebSocket
		connection is treated like a <code>no-cors</code> request, meaning you cannot receive any information
		about the server's response.
	</p>

	<h3>Impact</h3>

	<p>
		The end result is that if a WebSocket connection fails, you just get told that it failed. This
		works fine, until you want to try and differentiate between "I am still in a tunnel" and "My
		auth expired".
	</p>

	<h2>The Solution</h2>

	<p>
		We can't see the failure reason, so let's make sure there's only one option: network loss. That
		means that we need to remove any authentication checks from the initial connection. We need <strong
			>in-band authentication</strong
		>.
	</p>

	<p>
		Rather than checking auth tokens during the initial connection, we accept WebSocket connections
		from anyone. However, after connecting, you are left with an extremely limited "unauthenticated"
		session.
	</p>

	<Snippet config={snippets.ws} />

	<p>
		To authenticate the session, the client sends a WebSocket message containing their auth token.
		If it's valid, they become authenticated, otherwise they get a usable error message so they can
		refresh their token and try again.
	</p>

	<p>
		Rather than terminating the connection when your token expires, your connection simply reverts
		to the unauthenticated state and tells the client. That way, if the WebSocket <em>does</em> close,
		the client knows it must be a network issue.
	</p>

	<h2>Other Tips</h2>

	<p>Quick list of other things to think about</p>

	<ul>
		<li>Make sure the client is still authenticated before you send them data.</li>
		<li>
			Clients should reauthenticate before their token expires, so they're always authenticated.
		</li>
		<li>
			The client's system time is probably wrong, don't trust it when checking token expiry. The
			server should return <code>validFor</code> after you authenticate.
		</li>
		<li>
			You can still pass an auth token in the initial connection, but you should allow the
			connection and then close the WebSocket with a 3000 status code if it's invalid. This is
			visible to the client.
		</li>
	</ul>

	<h2>Conclusion</h2>

	<p>
		Don't try to check auth tokens during the initial WebSocket connection. Do it once the WebSocket
		is connected, instead. It's much more robust, avoids nasty edge cases, and keeps your users
		happy.
	</p>
</BlogPost>

<style>
	li {
		margin-top: 1em;
	}
</style>
