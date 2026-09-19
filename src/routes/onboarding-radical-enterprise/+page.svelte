<script lang="ts">
	import BlogPost from "$lib/blog/BlogPost.svelte";
</script>

<BlogPost id="onboarding-radical-enterprise">
	<p>Hi, I'm Steven! I love cats, tech, and talking about cats & tech.</p>

	<p>
		A couple of months ago, I joined TalkJS as a full-stack developer. At least, I think that's my
		job title. I don't really know. It never came up.
	</p>

	<p>TalkJS is weird like that.</p>

	<h2>A High-Value Culture</h2>

	<p>
		An organisation's culture is made up of values and norms. In other words, it's the combination
		of <em>how</em> we act (behaviours / norms) and <em>why</em> (mindset / values). TalkJS focuses on
		getting the values right, and lets the norms emerge naturally.
	</p>

	<p>
		We value independence, autonomy, and freedom. We respect each other as humans, with lives
		outside of work, who know how they work best. We value making the best product we can -
		something so amazing that it forces everyone else to pay attention.
	</p>

	<p>
		It's one thing to <em>talk</em> about those values, and pretty much every company does. But what
		happens if you take those values, and use them as a cultural anchor? What behaviours do we encourage,
		by holding those values at the heart of the company?
	</p>

	<p>Well, you normalise things like the mid-day nap:</p>

	<figure>
		<!-- svelte-ignore a11y-media-has-caption -->
		<img
			src="/assets/blog/onboarding-radical-enterprise/joshua.jpg"
			alt="Joshua on Slack, saying 'gonna take a self-care break i.e. lie down for a bit'"
		/>
		<figcaption>Co-CEO Joshua leading by example</figcaption>
	</figure>

	<p>You normalise taking <em>real</em> time off:</p>

	<figure>
		<!-- svelte-ignore a11y-media-has-caption -->
		<img
			src="/assets/blog/onboarding-radical-enterprise/egbert.jpg"
			alt="Egbert on slack, saying 'About to vanish for ~2 weeks! Loved the meetup folks, thanks for coming. I plan to fully disconnect. For anything that you need me for, @mention me and I'll get back to it when I'm back. If we're on fire, solve it'"
		/>
		<figcaption>Co-CEO Egbert proving that everyone deserves work-life balance</figcaption>
	</figure>

	<p>
		And in a much broader sense, you normalise <em>trusting</em> people to choose for themselves.
		Work anywhere, any time, on whatever helps make TalkJS better. You can work on Christmas Day if
		you want, and you can skip the Company Meetup without needing an excuse. I struggle to think of
		<em>anything</em> that's mandatory.
	</p>

	<p>
		In short, TalkJS is a company where a bunch of humans come together to make something cool. And
		now I'm one of them.
	</p>

	<figure>
		<!-- svelte-ignore a11y-media-has-caption -->
		<img
			src="/assets/blog/onboarding-radical-enterprise/steven.jpg"
			alt="A message from me in Slack. Originally the message said 'break' but I later edited it to cross that out, adding 'Break didn't help, still braindead, gonna call it a day'"
		/>
		<figcaption>I have assimilated...</figcaption>
	</figure>

	<h2>Joining TalkJS</h2>

	<p>
		The culture at TalkJS didn't come as a complete surprise to me. During my interviews, everyone
		had reinforced that this weird culture was legit. Speaking of interviews, my technical was on
		Slack, via text. That's how we communicate day-to-day, so that's what the interview should
		assess.
	</p>

	<p>
		On top of that, I'd just finished reading <a
			href="https://itrevolution.com/product/a-radical-enterprise/">A Radical Enterprise</a
		>. It's a case study of businesses like TalkJS that replaced their power-based management.
		Instead, they embrace a bottom-up culture, that's much more employee-led.
	</p>

	<p>
		I recognised a lot of those traits in TalkJS. Autonomous employees making decisions for
		themselves. Empowering people to create cultural change and resolve tensions. Caring about each
		other's human side and creating psychological safety. Making their ideas vulnerable to
		discussion and criticism.
	</p>

	<figure>
		<!-- svelte-ignore a11y-media-has-caption -->
		<img
			src="/assets/blog/onboarding-radical-enterprise/lost.jpg"
			alt="A man stands, silhouetted against a swirling oceanic background of rainbow colors, like pigments dropping into a pool of water"
		/>
		<figcaption>I can't really tell what's going on, but I like it</figcaption>
	</figure>

	<p>
		Company culture was one of the main reasons I agreed to come work here. So clearly, I was better
		prepared than most would've been. There was still a lot of things that surprised me, and bits I
		wasn't prepared for:
	</p>

	<h2>I had no idea what anyone did</h2>

	<p>
		Job titles aren't a big thing in TalkJS. I don't know mine and I don't know anyone else's job
		title. The only job title you <em>do</em> see is CEO. But we have two, and they do completely different
		things day-to-day.
	</p>

	<p>
		There's no org chart, nobody puts their job title on Slack, and everyone is active in all the
		Slack channels. I joined <code>#admin-finance</code> out of pure curiosity, because it was a public
		channel. I'm definitely not an accountant.
	</p>

	<p>
		Nobody is siloed based on their job title, which is great. But it did mean that I joined our
		first retro and had no idea what anyone's main focus was. Easily solved, but not something I'd
		anticipated!
	</p>

	<h2>Documentation is essential</h2>

	<p>
		In an async-first environment, you can never get an instant answer to a basic question. As a
		newcomer, if you have a question that isn't answered in the docs, or on Notion, then you risk
		getting blocked waiting for someone to answer.
	</p>

	<p>
		I can't lie, we're not great at this. On day 2, I found a page in the company handbook
		documenting a process we briefly tried a couple of years ago. You can't assume that the
		documentation is up-to-date.
	</p>

	<p>
		So, I got comfortable with <code>git blame</code>, reading through commit messages and pull
		request descriptions. I started using Slack's search - there's millions of messages going back
		years, and I'm probably not the first person to ask.
	</p>

	<p>
		More importantly, I started documenting things myself. I put more effort into my pull requests,
		and tried to fix the mistakes in out-of-date Notion pages. I learned to ask for help in open
		Slack channels, rather than DMing people. It's not a replacement for proper documentation, but
		it's better than nothing.
	</p>

	<h2>Just fix it</h2>

	<p>
		When I noticed a problem in the code, or a minor bug, I tried to find a backlog of issues that I
		could add it to. I couldn't find one. We have a '2022 Roadmap', but it's only 150 words long. A
		bit too high-level for my little bug.
	</p>

	<p>I asked around. Where do you document small bugs?</p>

	<p>You don't.</p>

	<p>
		If something's worth fixing, and it's a 10-minute job, then just fix it. Add it to whatever PR
		you're making. Point it out in the PR description, and move on.
	</p>

	<figure>
		<!-- svelte-ignore a11y-media-has-caption -->
		<img
			src="/assets/blog/onboarding-radical-enterprise/fix.jpg"
			alt="A cracked rainbow pigment background, with a silhouetted character hammering a human-sized nail into the ground"
		/>
		<figcaption>
			Thankfully, in real life the problems are a lot smaller and we're a lot bigger
		</figcaption>
	</figure>

	<p>
		I've worked at companies of all sizes, but that came as a shock. No long process, adding it to a
		backlog, waiting for it to be prioritised, including it in a sprint, and so on. Instead, you
		just fix it.
	</p>

	<p>We care about <em>being</em> agile, and not about <em>doing</em> scrum.</p>

	<h2>Dutch directness is real</h2>

	<p>
		I was prepared for <em>company</em>-culture shock. But I wasn't prepared for <em>real</em> culture
		shock. I'm working with people from all over Europe and Africa, but TalkJS is still a Dutch company
		at heart. With a Dutch communication style.
	</p>

	<p>
		I'm British, and I didn't realise how true the stereotypes were until joining TalkJS. Compared
		to other Brits, I'm very straightforward and logical in the way I communicate. But as a nation,
		we read between the lines and do things indirectly.
	</p>

	<p>
		So when the company's Dutch Directness collided with my timidness, I assumed people hated my
		ideas. I would suggest something and people just openly said they didn't like it! How could they
		be so rude? They must truly <em>despise</em> it, and me!
	</p>

	<p>
		It took a long time, a lot of private chats with people, and a whole lot of miscommunications
		before I figured out the reality. They didn't like the idea. That's why they said "I don't like
		that idea." How radical.
	</p>

	<p>
		Now that I'm used to it, the directness is quite nice. I <em>know</em> nobody here hates me. If
		they did, they'd probably just <em>tell</em> me.
	</p>

	<h2>The meetup was weird, but also wasn't</h2>

	<p>
		The company meetup was a couple of weeks ago. I got to meet almost everyone I work with, in the
		flesh. I'd worked with these people for months, but barely knew what they looked or sounded
		like. I thought it would be really weird.
	</p>

	<p>
		Instead, it felt like I already knew everyone. My mental image went from 2d to 3d, and I know
		them better now. But it wasn't a massive surprise meeting them for the first time. Which, in
		itself, was a surprise.
	</p>

	<p>
		There was one weird thing. Towards the end of the meetup, we all worked together in an office.
		We are <em>terrible</em> at working in person. It reminded me of onsite companies going remote at
		the start of COVID, without changing anything. You had people spending 6 hours a day in Zoom meetings.
	</p>

	<p>
		Instead, we were a fully-remote team, suddenly working in person without changing anything. We
		sat in a room together, typing away in complete silence. It was quieter than some libraries. At
		one point, I started getting into a heated debate with someone on Slack, while looking directly
		at him. We talked instead.
	</p>

	<figure>
		<!-- svelte-ignore a11y-media-has-caption -->
		<img
			src="/assets/blog/onboarding-radical-enterprise/together.jpg"
			alt="Stacked layers of grainy rainbow colors, with two men working, silhouetted against the background. They are facing each other but not interacting."
		/>
		<figcaption>Working alone, but together</figcaption>
	</figure>

	<h2>The new normal</h2>

	<p>
		While joining TalkJS was a shock, I think leaving would be even worse. Very quickly, I've got
		used to this way of working. It feels natural, and it just makes sense. I'm rapidly forgetting
		all the problems with normal companies.
	</p>

	<p>
		This feels right, like it's a work environment that's meant for human consumption. And I'm
		endlessly shocked that it's not the default.
	</p>

	<h2>Advice for the next person</h2>

	<p>
		What advice would I give to myself a couple of months ago, or to the next person that joins
		TalkJS?
	</p>

	<p>
		<em
			>(If this has sounded interesting to you, please do <a
				href="https://talkjs.notion.site/Come-work-at-TalkJS-a9bcd1d260af482db04aa087978dc76c"
				>come work with us</a
			>. I want co-workers that get excited about company culture with me)</em
		>
	</p>

	<p>
		The most important recommendation I have is that you need a mentor - someone you can ask for
		help, and get a quick answer. Don't be afraid to say when you're blocked by something, because
		it will happen <strong>a lot</strong>. If better documentation would've helped you avoid a
		problem, write it for the next person.
	</p>

	<p>
		You need to over-communicate. Write twice as much, three times as often. Working onsite, or at a
		more synchronous remote-first company, you instinctively know what people are getting up to. At
		TalkJS, we only know what you tell us. Consider reading <a
			href="https://www.karlsutt.com/articles/communicating-effectively-as-a-developer/"
			>this amazing blog post</a
		> about high-resolution communication.
	</p>

	<p>
		Try to be vulnerable. Share your thoughts, and be open with your emotions. Nobody will shame you
		for being stressed, or upset, but they <em>are</em> more likely to offer help and support. Share
		when things aren't going so well, and ask for help.
	</p>

	<p>
		I'd also suggest that you keep a list of all the things that went wrong. I'm writing this blog
		<em>way</em> too late, and I've forgotten a lot of the problems I had along the way. If we know
		what the problems with onboarding are, we can <em>just fix it</em>.
	</p>

	<p>And if you're joining TalkJS, call me when you arrive. Maybe I can help!</p>

	<figure>
		<!-- svelte-ignore a11y-media-has-caption -->
		<img
			src="/assets/blog/onboarding-radical-enterprise/call.jpg"
			alt="A man in the top-right, holding a phone. Towards the bottom, two much smaller people are reaching up towards him. A dark band of rainbow colors separates the two groups."
		/>
	</figure>
</BlogPost>
