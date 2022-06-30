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
			email: "blog@stevenwaterman.uk",
      calendly: "stewaterman/30min",
			github: "StevenWaterman",
			twitter: "SteWaterman",
			twitch: "SteWaterman",
			linkedin: "steven-waterman",
			// website: "www.stevenwaterman.uk"
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
  "minesweeper-lightning-talk": {
    type: "media",
    author: "SteWaterman",
    title: "How to solve Minesweeper in 3 minutes",
    shortDescription: "In my first ever tech talk, I explained how to algorithmically solve minesweeper",
    longDescription: "In my first ever tech talk, I explained how to algorithmically solve minesweeper",
    date: new Date("2020-01-17T09:00:00Z"),
    featured: false,
    published: true,
    header: {
      fit: "contain"
    }
  },
  "pick-n-mix": {
    type: "technical",
    author: "SteWaterman",
    title: "Typescript Pick 'n' Mix",
    shortDescription: "In TypeScript, we can just Pick the good bits of an interface, so let's do that.",
    longDescription: "Interface Segregation is an important part of writing clean and maintainable code. In most languages, it requires constant maintenance and naturally degrades over time. In TypeScript, we can just Pick the good bits.",
    date: new Date("2020-01-29T12:00:00Z"),
    featured: true,
    published: true,
    original: {
      text: "the Scott Logic blog",
      link: "https://blog.scottlogic.com/2020/01/29/typescript-pick-n-mix.html"
    },
    header: {
      fit: "contain"
    }
  },
  "embrace-your-obsessions": {
    type: "projects",
    author: "SteWaterman",
    title: "Embrace your Obsessions!",
    shortDescription: "For the past 3 months, I have been a bit obsessed with Minesweeper. That's a good thing.",
    longDescription: "For the past 3 months, I have been a bit obsessed with Minesweeper. It has plagued my honeymoon, stolen my free time, and been the subject of two tech talks. That's a good thing.",
    date: new Date("2020-02-10T12:00:00Z"),
    featured: false,
    published: true,
    original: {
      text: "the Scott Logic blog",
      link: "https://blog.scottlogic.com/2020/02/10/embrace-your-obsessions.html"
    },
    header: {
      position: "top"
    }
  },
  "minesweeper-optimisation": {
    type: "technical",
    author: "SteWaterman",
    title: "Slow Code HATES him! From 1 to 60fps",
    shortDescription: "After hearing about Svelte, I set off on a journey of iterative performance improvement.",
    longDescription: "After hearing about Svelte, a performance-first web framework, I tried it out in a web-based Minesweeper solver. SHOCKINGLY, it didn't automatically make my code fast - that took a process of iterative optimisation",
    date: new Date("2020-02-17:12:00:00Z"),
    featured: true,
    published: true,
    original: {
      text: "the Scott Logic blog",
      link: "https://blog.scottlogic.com/2020/02/10/minesweeper-optimisation.html"
    }
  },
  "stevie-w-60-fps": {
    type: "media",
    author: "SteWaterman",
    title: "Stevie W and the Quest for 60 FPS",
    shortDescription: "I gave a tech talk about optimising my Svelte app from 1 to 60 FPS.",
    longDescription: "Will our daring adventurer optimise his Svelte app to 60fps? Find out in this tech talk!",
    date: new Date("2020-02-21T09:00:00Z"),
    featured: false,
    published: true
  },
  "github-ci-cd": {
    type: "technical",
    author: "SteWaterman",
    title: "GitHub is a free CI/CD/Hosting solution",
    shortDescription: "Introducing a free GitHub Actions workflow which builds your front-end and deploys it.",
    longDescription: "Practicing Continuous Integration and Deployment, we can get new features to users faster and tighten our feedback loops. In this introduction to CI/CD, I introduce and explain an example GitHub Actions workflow which builds your front-end and deploys it with GitHub Pages.",
    date: new Date("2020-02-24T12:00:00Z"),
    featured: true,
    published: true
  },
  "microbit-raytracer": {
    type: "technical",
    author: "SteWaterman",
    title: "3D Rendering on a Children's Toy",
    shortDescription: "The BBC Micro:Bit is designed to do a lot of things, but 3D rendering isn't one of them.",
    longDescription: "I recently got the chance to play around with a BBC Micro:Bit - an educational toy aimed at helping kids learn to program. It's designed to do a lot of things, but 3D rendering isn't one of them.",
    date: new Date("2020-03-03T12:00:00Z"),
    featured: false,
    published: true,
    original: {
      text: "the Scott Logic blog",
      link: "https://blog.scottlogic.com/2020/03/03/microbit-raytracer.html"
    }
  },
  "raytracer-how-to": {
    type: "technical",
    author: "SteWaterman",
    title: "How to Write a Ray Tracer Intuitively",
    shortDescription: "Ray tracing seems complicated at first, but together we can make it simple.",
    longDescription: "Ray tracing is the process of simulating light rays to render a 3D scene. It seems really complicated at first, but it's actually quite simple. After reading this post, you could easily implement one yourself!",
    date: new Date("2020-03-10T12:00:00Z"),
    featured: false,
    published: true,
    original: {
      text: "the Scott Logic blog",
      link: "https://blog.scottlogic.com/2020/03/10/raytracer-how-to.html"
    }
  },
  "microbit-optimisation": {
    type: "technical",
    author: "SteWaterman",
    title: "Optimise your Micro:Bit code with Chrome DevTools",
    shortDescription: "Some might say I pushed the Micro:Bit too far. This post is not for those people.",
    longDescription: "Some might say I pushed the Micro:Bit too far. This post is not for those people. If your Micro:Bit is also struggling, this post will show you how to optimise your code and push it further",
    date: new Date("2020-03-27T12:00:00Z"),
    featured: false,
    published: true,
    original: {
      text: "the Scott Logic blog",
      link: "https://blog.scottlogic.com/2020/03/27/microbit-optimisation.html"
    }
  },
  "svelte-ts": {
    type: "technical",
    author: "SteWaterman",
    title: "Svelte and TypeScript - Together at last!",
    shortDescription: "Svelte is great, and now it's even better - it supports TypeScript.",
    longDescription: "Svelte is an up-and-coming web framework which removes the need for any runtime libraries by adding a transpilation step in its build process. The one thing stopping me going all-in was that it didn't support TypeScript - but now it does!",
    date: new Date("2020-07-24T12:00:00Z"),
    featured: false,
    published: true,
    original: {
      text: "the Scott Logic blog",
      link: "https://blog.scottlogic.com/2020/07/24/svelte-ts.html"
    }
  },
  "typescript-builders": {
    type: "technical",
    author: "SteWaterman",
    title: "TypeScript Builders: Improving your types one step at a time",
    shortDescription: "You can use the builder pattern to implement complex type constraints.",
    longDescription: "We can use builders to implement complex type constraints in TypeScript, giving us compile-time errors when we make a semantic error, rather than just syntactic errors.",
    date: new Date("2020-09-16T12:00:00Z"),
    featured: true,
    published: true,
    original: {
      text: "the Scott Logic blog",
      link: "https://blog.scottlogic.com/2020/09/16/typescript-builders.html"
    }
  },
  "reducer-builder": {
    type: "technical",
    author: "SteWaterman",
    title: "Better Redux Reducers with TypeScript Builders",
    shortDescription: "You can improve Redux Reducers by using the Builder pattern in TypeScript.",
    longDescription: "In my last blog post, I introduced the builder pattern in TypeScript and discussed how you can use it to get more accurate types in your code. It was all very abstract, so I thought it might be useful to show another more complex example.",
    date: new Date("2020-10-01T12:00:00Z"),
    featured: true,
    published: true,
    original: {
      text: "the Scott Logic blog",
      link: "https://blog.scottlogic.com/2020/10/01/reducer-builder.html"
    }
  },
  "ergo-rabbit-hole": {
    type: "projects",
    author: "SteWaterman",
    title: "Down the ergonomic keyboard rabbit hole",
    shortDescription: "Over the past few months I've had an ergonomic keyboard obsession.",
    longDescription: "Over the past few months I've had an ergonomic keyboard obsession. This is my story.",
    date: new Date("2020-10-09T12:00:00Z"),
    featured: true,
    published: true,
    original: {
      text: "the Scott Logic blog",
      link: "https://blog.scottlogic.com/2020/10/09/ergo-rabbit-hole.html"
    },
    header: {
      position: "top"
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
    featured: false,
    published: true,
    header: {
      position: "top",
      fit: "cover"
    },
    original: {
      text: "the Lexoral blog",
      link: "https://lexoral.com/blog/office-hours/"
    }
  },
  "opening-up-burnout": {
    type: "coaching",
    author: "SteWaterman",
    title: "Opening Up About Burnout",
    shortDescription: "Last year, I suffered from some pretty severe burnout. It's time we started talking about this stuff.",
    longDescription: "All too often, we forget our human sides at work. We lie to ourselves and others, that everything is okay. I think it's time we start opening up, so I'll go first. Last year, I suffered from burnout. Here's the story.",
    date: new Date("2022-06-12T12:00:00Z"),
    featured: true,
    published: true,
    header: {
      position: "top"
    }
  },
  "a-new-trajectory": {
    type: "coaching",
    author: "SteWaterman",
    title: "A New Trajectory",
    shortDescription: "I used to be a developer, and now I'm a Technical Coach. Let's discuss what it means, and how I got here.",
    longDescription: "I used to be a developer, and now I'm helping developers. It's not the change I expected, but it was long overdue. Let's discuss what a Technical Coach is, and how I got here. In other words, let's recap the last year of my life.",
    date: new Date("2022-06-13T12:00:00Z"),
    featured: true,
    published: true,
    header: {
      position: "top"
    }
  },
  "kind-and-true": {
    type: "coaching",
    author: "SteWaterman",
    title: "Kind and True",
    shortDescription: "The world is full of thoughts that are both kind and true, but don't need saying. What would happen if we said them anyway?",
    longDescription: "For years, I've followed a kind of 'heuristic triangle' to determine whether a thought is worth sharing. However, that triangle has one implication that I've avoided until now, because it feels vulnerable, alien, and uncomfortable.",
    date: new Date("2022-06-23T14:00:00Z"),
    featured: true,
    published: true
  },
  "balance-box": {
    type: "projects",
    author: "SteWaterman",
    title: "My Balance Box",
    shortDescription: "The world is full of thoughts that are both kind and true, but don't need saying. What would happen if we said them anyway?",
    longDescription: "For years, I've followed a kind of 'heuristic triangle' to determine whether a thought is worth sharing. However, that triangle has one implication that I've avoided until now, because it feels vulnerable, alien, and uncomfortable.",
    date: new Date("2022-06-30T14:00:00Z"),
    featured: true,
    published: false,
    header: {
      position: "top"
    }
  }
} as const);

export type BlogId = keyof typeof blogPosts;

export type SnippetConfig = {
	name: string;
	language: "svelte" | "ts" | "java" | "html" | "json";
	snippet: string;
};
