import { BlogId, BlogPost, blogPosts } from "$lib/blog/blogData"
import type { Response } from "@sveltejs/kit";

export async function get(): Promise<Response> {
  const data = Object.entries(blogPosts) as Array<[BlogId, BlogPost]>;
  data.sort((a,b) => (a[1].date.valueOf() - b[1].date.valueOf()))

  return {
    body: render(data),
    headers: {
      "Cache-Control": "max-age=0, s-maxage=3600",
      "Content-Type": "application/xml",
    },
    status: 200
  }
}

function render(posts: Array<[BlogId, BlogPost]>) {
  const postsXml = posts.map(([id, post]) => renderPost(id, post));

  return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>Steven Waterman's Blog</title>
<description>Assorted thoughts on agility, tech, and existing in this world</description>
<link>https://stevenwaterman.uk</link>
<atom:link href="https://stevenwaterman.uk/rss.xml" rel="self" type="application/rss+xml"/>
${postsXml.join("")}
</channel>
</rss>
`;
}

function renderPost(id: BlogId, post: BlogPost): string {
  return `<item>
<guid isPermaLink="true">https://stevenwaterman.uk/${id}</guid>
<title>${post.title}</title>
<link>https://stevenwaterman.uk/${id}</link>
<description>${post.longDescription}</description>
<pubDate>${new Date(post.date).toUTCString()}</pubDate>
</item>`
}
