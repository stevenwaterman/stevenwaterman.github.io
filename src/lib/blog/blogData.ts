export type AuthorDetails = {
	shortName: string;
	longName: string;
	job: string;
	bio: string;
	links: {
		email?: string;
    calendly?: string;
		github?: string;
		twitter?: string;
		twitch?: string;
		linkedin?: string;
		website?: string;
	};
};

const assertAuthors = <T extends Record<string, AuthorDetails>>(authors: T) => authors;
export const authors = assertAuthors({
	SteWaterman: {
		shortName: "Steven",
		longName: "Steven Waterman",
		job: "Technical Coach",
		bio: "I've spent my career making development simple. I'm always happy to chat with you - feel free to get in touch!",
		links: {
			email: "steven@lexoral.com",
      calendly: "lexoral/office-hours",
			github: "StevenWaterman",
			twitter: "SteWaterman",
			twitch: "SteWaterman",
			linkedin: "steven-waterman",
			website: "www.stevenwaterman.uk"
		}
	}
} as const);

export type Author = keyof typeof authors;

export type BlogPost = {
	type: "coaching" | "technical" | "projects" | "media";
	author: keyof typeof authors;
	title: string;
  stylisedTitle?: string;
	shortDescription: string;
	longDescription: string;
	date: Date;
	featured: boolean;
	published: boolean;
	header?: {
    position?: "bottom" | "center" | "top" | "left" | "right";
    fit?: "contain" | "cover" | "fill";
  };
  original?: {
    text: "the Lexoral blog" | "the Scott Logic blog";
    link: string;
  }
};

const assertBlogPosts = <T extends Record<string, BlogPost>>(posts: T) => posts;
export const blogPosts = assertBlogPosts({
  "introducing-sharpshot": {
    type: "projects",
    author: "SteWaterman",
    title: "Introducing SharpShot",
    shortDescription: "SharpShot is an esoteric visual programming language, made for Durhack 2018",
    longDescription: "In October 2018, I participated in Durhack, a hackathon run by the university's computing society. The idea was simple: An esoteric 2-dimensional visual programming language, where data flies around the screen in real-time.",
    date: new Date("2019-07-22T18:00:00Z"),
    featured: false,
    published: true
  },
  "rethinking-dto": {
    type: "technical",
    author: "SteWaterman",
    title: "Rethinking the Java DTO",
    shortDescription: "Can we utilise static type-checking and integration with modern IDEs to write a better DTO?",
    longDescription: "DTOs help translate data between server and client. By going back to first principles, how can we utilise static type-checking and integration with modern IDEs to write a better DTO?",
    date: new Date("2020-01-03T11:00:00Z"),
    featured: true,
    published: true,
    header: {
      fit: "contain"
    },
    original: {
      text: "the Scott Logic blog",
      link: "https://blog.scottlogic.com/2020/01/03/rethinking-the-java-dto.html"
    }
  },
  "minesweeper-netech-talk": {
    type: "media",
    author: "SteWaterman",
    title: "Solving Minesweeper in Polynomial Time",
    shortDescription: "I gave a talk on solving minesweeper at NE:Tech. Things got weird!",
    longDescription: "I gave a talk on solving minesweeper at NE:Tech. Things got weird!",
    date: new Date("2020-01-13T09:00:00Z"),
    featured: false,
    published: true
  },
  "sprint-with-sat": {
    type: "technical",
    author: "SteWaterman",
    title: "Planning 56 sprints per second with SAT4J",
    shortDescription: "SAT solvers are surprisingly fast and probably under-used, but can they plan our sprints?",
    longDescription: "SAT solvers are surprisingly fast and probably under-used. Could one help us improve sprint planning meetings? Maybe, but first you'll have to change the way you think about user stories.",
    date: new Date("2020-01-16T12:00:00Z"),
    featured: true,
    published: true,
    original: {
      text: "the Scott Logic blog",
      link: "https://blog.scottlogic.com/2020/01/16/planning-56-sprints-per-second-with-sat4j.html"
    }
  },
	"open-source-punish": {
		type: "projects",
		author: "SteWaterman",
		title: "Lexoral is open-source so you can punish us",
		shortDescription:
			"Anyone can read the code for Lexoral and use it in their own projects. That means you can punish us.",
		longDescription:
			"You can read the code for Lexoral, and even use it in your own projects. There's a lot of benefits to being open-source, but there's one that you don't hear people talking about: it lets you punish us for not sticking to our promises.",
		date: new Date("2022-01-04T12:10:00Z"),
		featured: true,
		published: true,
		header: {
      fit: "contain"
    },
    original: {
      text: "the Lexoral blog",
      link: "https://lexoral.com/blog/open-source-punish/"
    }
	},
	"svelte-firestore-binding": {
		type: "technical",
		author: "SteWaterman",
		title: "Database sync like magic, with Svelte + Firestore",
		shortDescription:
			"Svelte and Firestore are a match made in heaven, making it easy to sync data between the browser and the database.",
		longDescription:
			"Both Firestore and Svelte are event-driven and reactive. By forgetting everything we know about data layers and building one from first principles, we've made it easy to synchronise data both ways between the browser and the database.",
		date: new Date("2022-02-16T18:30:00Z"),
		featured: true,
		published: true,
    header: {
      position: "bottom"
    },
    original: {
      text: "the Lexoral blog",
      link: "https://lexoral.com/blog/svelte-firestore-binding/"
    }
	},
  "you-dont-need-js": {
		type: "technical",
		author: "SteWaterman",
		title: "5 things you don't need Javascript for",
		shortDescription:
			"Javascript can do a lot, but it's really over-used. Here's my top 5 things you don't need Javascript for.",
		longDescription:
			"Javascript can do a lot, but it's really over-used. HTML and CSS are surprisingly powerful on their own, so let's have a look at some of the things you can achieve without Javascript (or a backend) - from animated diagrams to dark mode.",
		date: new Date("2022-02-28T12:00:00Z"),
		featured: true,
		published: true,
    header: {
      position: "center"
    },
    original: {
      text: "the Lexoral blog",
      link: "https://lexoral.com/blog/you-dont-need-js/"
    }
	},
  "speaking-with-confidence": {
    type: "coaching",
    author: "SteWaterman",
    title: "You can learn to Speak Confidently",
    shortDescription: "Do the words 'public speaking' strike fear into your heart? I used to be the same. Used to.",
    longDescription: "Do the words 'public speaking' strike fear into your heart? It doesn't come naturally to me either, but over time I've slowly improved. This post is all about the things that helped me, so you can learn too.",
    date: new Date("2022-04-04T12:30:00Z"),
    featured: true,
    published: true,
    header: {
      position: "top",
      fit: "cover"
    },
    original: {
      text: "the Lexoral blog",
      link: "https://lexoral.com/blog/speaking-with-confidence/"
    }
  },
  "office-hours": {
    type: "coaching",
    author: "SteWaterman",
    title: "We Need to Talk (if you want)",
    stylisedTitle: "We Need to Talk <span style='font-size:0.5em;white-space:nowrap;'>(if you want)</span>",
    shortDescription: "I've always been open to chat with people, but now it's official. You can book a slot in my diary to chat about anything.",
    longDescription: "I've always been available to chat, but now I've taken it a step further. Anyone can book time in my diary to chat about anything - even if you just want my advice. Why did I decide to do that? Let's talk about it.",
    date: new Date("2022-04-08T18:00:00Z"),
    featured: true,
    published: true,
    header: {
      position: "top",
      fit: "cover"
    },
    original: {
      text: "the Lexoral blog",
      link: "https://lexoral.com/blog/office-hours/"
    }
  }
} as const);

export type BlogId = keyof typeof blogPosts;

export type SnippetConfig = {
	name: string;
	language: "svelte" | "ts" | "java";
	snippet: string;
};
