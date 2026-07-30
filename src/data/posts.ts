export type FaqItem = { q: string; a: string }
export type Section = { heading: string; paragraphs: string[] }

export type Post = {
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  cover: string
  /** A single-sentence direct answer, shown prominently under the title —
   *  written so an answer engine (or a skimming human) can lift it verbatim. */
  keyTakeaway: string
  pullQuote: string
  intro: string[]
  sections: Section[]
  faq: FaqItem[]
}

export const POSTS: Post[] = [
  {
    slug: "what-is-ai-video-generation",
    title: "What is AI video generation? A practical guide for brands",
    excerpt:
      "AI video generation creates footage from a text prompt or reference image instead of a camera and crew. Here's what it actually replaces, what it doesn't, and how brands are using it in 2026.",
    category: "Guide",
    date: "2026-05-04",
    readTime: "8 min",
    cover: "/media/ai-video-explainer.jpg",
    keyTakeaway:
      "AI video generation is the use of generative models to produce moving footage from a text prompt, image, or reference clip — replacing the camera, crew, and location, but not the direction.",
    pullQuote: "The model replaces the camera. It doesn't replace the director.",
    intro: [
      "AI video generation is the process of producing moving footage — a shot, a scene, a full spot — from a text prompt, a reference image, or an existing clip, using a generative model instead of a camera, a crew, and a location. In practical terms: you describe or reference what you want, and the model renders footage that didn't exist a minute earlier.",
      "The category has moved fast. Early text-to-video was a novelty — a few seconds of dreamlike, physically inconsistent motion. The models brands actually use for production today generate coherent, controllable, broadcast-resolution footage with consistent subjects across shots, camera moves that respect a scene's geometry, and enough fidelity to sit next to traditionally shot footage in the same cut.",
    ],
    sections: [
      {
        heading: "How AI video generation actually works",
        paragraphs: [
          "Most production-grade AI video models today work off one of two starting points: a text prompt describing the shot, or a reference image/video that anchors the subject, style, or camera move. The model has been trained on enormous volumes of real footage, so it has learned an internal sense of how light behaves, how fabric moves, how a camera racking focus looks — and it applies that learned sense to generate new frames that didn't come from a physical set.",
          "This is why prompting for AI video is closer to directing than to typing a search query. A prompt that just names a subject ('a woman drinking coffee') gives the model too much freedom and it fills the gaps with its own defaults — generic lighting, a generic room, a generic take. A prompt that specifies the lens, the light source, the framing, and what's deliberately out of frame gives the model a much narrower, much more directed space to generate into. The craft is in the constraint, not the description.",
          "Most workflows also layer in reference material: a still photo to lock a product's exact shape and label, a short reference clip to transfer a specific camera move or performance style, or a start/end frame pair to control exactly how a shot begins and lands. The prompt sets the intent; the references keep the model honest to the brief.",
        ],
      },
      {
        heading: "What it replaces — and what it doesn't",
        paragraphs: [
          "AI video generation replaces the physical production layer: the camera, the crew, the location scout, the shoot day, the reshoot if the light changed. It does not replace the creative layer — the idea, the brief, the edit, the judgment about what's actually worth putting in front of an audience. A generated clip with no direction behind it looks exactly like what it is: an impressive demo with nothing to say.",
          "It's also not yet a replacement for every kind of shot. Extremely long, continuous, physically complex sequences and precise, repeatable brand choreography (a specific dance move, a signature product interaction) are still often faster or more reliable to shoot practically, sometimes as a hybrid — a real plate with AI-extended or AI-enhanced elements around it. The honest framing is that AI video is a new production method, not a strictly superior one; it wins on speed, iteration volume, and cost per variant, and a traditional shoot still wins on certain kinds of precision.",
        ],
      },
      {
        heading: "Where brands are actually using it",
        paragraphs: [
          "In 2026, the highest-leverage use case isn't 'make one ad cheaper.' It's making many ads possible at all — generating a real batch of creative variants off a single brief, in different formats and hooks, and testing them against real audiences before committing media spend to any one of them. That volume was never economically possible with a traditional shoot day, where one concept was usually the entire budget.",
          "Beyond variant testing, brands are using AI video for TVC-style hero spots that need broadcast polish but a fast turnaround, film-style brand pieces that trade a product pitch for mood and story, and UGC-style social content that's built to blend into a feed rather than announce itself as an ad. Format follows objective — which is the whole subject of the next question people usually ask.",
        ],
      },
    ],
    faq: [
      {
        q: "Is AI-generated video the same as deepfake technology?",
        a: "No. Deepfakes specifically swap a real person's likeness into footage without consent, usually to deceive. AI video generation for advertising creates original scenes, products, and performers from a brief — nothing is impersonated, and legitimate production always discloses AI use where it's material to the audience.",
      },
      {
        q: "Can AI video generation match the quality of a traditional TVC shoot?",
        a: "For most commercial formats, yes — current models produce broadcast-resolution footage with consistent lighting, camera movement, and subject continuity. The gap that remains is in extremely long continuous takes and highly specific practical effects, where a hybrid of real plates and AI enhancement is often the better call.",
      },
      {
        q: "Do I need to know how to write AI prompts to use this for my brand?",
        a: "No — that's the production team's job, the same way you wouldn't be expected to operate a camera on a traditional shoot. What you need is a clear brief: what you're selling, who has to believe it, and what's non-negotiable. The team turns that into the prompts, references, and shot list.",
      },
    ],
  },
  {
    slug: "why-ai-ads-still-look-like-ai-ads",
    title: "Why most AI ads still look like AI ads",
    excerpt:
      "The tell isn't the faces or the motion. It's that every shot is trying to prove it's impressive instead of trying to sell something — and there's a specific production fix for it.",
    category: "Craft",
    date: "2026-06-18",
    readTime: "7 min",
    cover: "/media/funnel-1.jpg",
    keyTakeaway:
      "AI ads look artificial because they're generated without the constraints of a real production — a fixed lens, a real light source, a directed take — not because the underlying model isn't capable of believable footage.",
    pullQuote: "If a viewer can name the tool you used, the ad already failed.",
    intro: [
      "Most AI-generated ads share the same fingerprint: hyperreal lighting with nowhere to land, camera moves that exist to show off the camera move, and a subject that's technically flawless but says nothing. None of that is a technology problem. It's a production problem wearing a technology costume.",
      "Traditional production earns believability through constraint — a real lens, a real room, a real budget for one take instead of a hundred. AI production has the opposite failure mode: infinite takes with no constraint at all, so the model optimizes for 'impressive' instead of 'true.' The fix isn't a better model. It's treating every generation like a shot list, not a slot machine.",
    ],
    sections: [
      {
        heading: "The three tells of an obviously-AI ad",
        paragraphs: [
          "The first tell is lighting with no source. Real light comes from somewhere — a window, a practical lamp, a sunset — and it falls off, casts shadow, and interacts with the room. Unconstrained generation tends to produce an even, flattering glow from nowhere in particular, which reads as synthetic even to viewers who couldn't articulate why.",
          "The second is camera movement with no motivation. A push-in should mean something — a reveal, a beat of tension. When a camera drifts or orbits just because the model can render it, the motion becomes decoration, and decoration is one of the fastest ways an audience clocks that nothing was actually being directed.",
          "The third is a subject with no imperfection. Real footage has micro-flaws — a stray hair, an asymmetric smile, a slightly off focus pull — that read as authenticity precisely because they weren't designed. Default generations tend toward symmetric, flawless output, which is exactly the plastic quality most people mean when they say something 'looks AI.'",
        ],
      },
      {
        heading: "The production fix: write the brief like a director, not a prompt",
        paragraphs: [
          "In practice this means naming the lens, the light source, and — just as important — the thing the camera is deliberately not showing, before a single frame gets generated. A brief that says 'a 35mm lens, hard afternoon light through a half-closed blind, camera locked off' gives the model almost no room to default into generic. A brief that just says 'a modern kitchen' gives it every room in the world to choose from, and it will choose the most average one.",
          "It also means grading every variant in a batch to one consistent look instead of letting each generation invent its own palette, so the batch reads as one campaign shot by one team rather than a pile of disconnected demos. And it means being willing to kill the most technically impressive cut in a batch if it reads as a showreel moment instead of an ad — the goal was never to prove the tool works, it was to sell something.",
        ],
      },
    ],
    faq: [
      {
        q: "Why do AI-generated videos look fake even when the resolution is high?",
        a: "High resolution isn't the issue — the tell is usually unmotivated lighting, decorative camera movement, and a subject that's too symmetric and flawless to read as real. Those are directing problems, and they're fixed with a more constrained brief, not a bigger model.",
      },
      {
        q: "Can AI-generated ads pass as real footage to most viewers?",
        a: "Yes, when they're briefed and graded like a real production — with a motivated light source, a purposeful camera move, and consistent color grading across every shot in the batch. The failure mode is almost always a lack of creative constraint, not a limitation of the underlying model.",
      },
    ],
  },
  {
    slug: "the-variant-funnel",
    title: "How does AI ad testing work? The variant funnel, explained",
    excerpt:
      "We don't pitch a concept and hope. We generate a real batch, let audience data eliminate the weak ones, and put the entire budget behind whatever survives.",
    category: "Method",
    date: "2026-06-25",
    readTime: "7 min",
    cover: "/media/variant-6.jpg",
    keyTakeaway:
      "AI ad testing works by generating a real batch of creative variants off one brief, running all of them against live audience signal, and putting media budget entirely behind whichever cut the data proves — rather than betting the whole budget on a single pre-approved concept.",
    pullQuote: "Data doesn't have taste. That's exactly why we trust it.",
    intro: [
      "A traditional agency pitch is a single bet dressed up as a sure thing: one concept, one board, one director's note explaining why this is the idea. It's a good process for winning a pitch. It's a bad process for winning attention, because attention is decided by an audience that was never in the room.",
      "Our process starts from the opposite assumption — that nobody, including us, can reliably predict which cut wins before real people see it. So instead of committing to one concept, we generate a batch: the same brief expressed through different hooks, different pacing, different formats.",
    ],
    sections: [
      {
        heading: "Stage one: generate wide",
        paragraphs: [
          "A dozen cuts isn't a lack of conviction — it's where conviction is supposed to come from. Each variant in the batch shares the brief's non-negotiables (the claim, the tone, the product truth) but is free to differ everywhere the brief left open: the hook in the first two seconds, the pacing, whether it's shot as a TVC, a film, or UGC. That range is deliberate. A batch where every variant looks the same isn't really testing anything — it's the same bet with extra steps.",
          "This is the stage where AI production earns its structural advantage over traditional shoots: generating twelve genuinely different cuts costs a fraction of what one traditional shoot day costs, which means the batch can be wide enough to actually surface a surprise instead of just confirming what the team already assumed would win.",
        ],
      },
      {
        heading: "Stage two: test hard",
        paragraphs: [
          "Every cut in the batch runs against real audience data before a dollar of media spend is committed. Most of them die there, and that's the point — a variant that doesn't survive contact with a real feed was never going to survive contact with a real campaign. Signal, not opinion, decides what happens next.",
          "What's left after this stage isn't the cut the team liked best in the room. It's the one the data already proved — which means the argument for scaling it has already been made before anyone has to make it in a meeting.",
        ],
      },
      {
        heading: "Stage three: scale narrow",
        paragraphs: [
          "Budget moves last, and it moves in one direction: entirely behind the surviving cut, not split evenly across a portfolio of guesses to hedge against being wrong. Concentrating spend behind a data-confirmed winner produces a materially different return than spreading the same budget thin across several unconfirmed concepts.",
          "That's the whole method in three stages: generate wide, test hard, scale narrow. It's less exciting to describe than 'a big creative idea,' but it consistently outperforms a single bet — because it never actually asks anyone to bet.",
        ],
      },
    ],
    faq: [
      {
        q: "How is testing AI-generated ad variants different from A/B testing a single ad?",
        a: "Standard A/B testing usually compares small variations of one existing creative — a different headline or thumbnail. Variant-funnel testing generates a genuinely different batch of full creative concepts off the same brief before any of them run, then lets real audience data decide which concept — not just which detail — gets the budget.",
      },
      {
        q: "How many variants should a first batch include?",
        a: "Most first batches we scope land between eight and twenty-four variants, depending on how many formats and hooks the brief can reasonably support. Fewer than that and the batch risks converging on the same idea from slightly different angles instead of genuinely testing different bets.",
      },
      {
        q: "What happens to the variants that don't win?",
        a: "They're not wasted — a variant that under-performs still tells you something concrete about what didn't land, which sharpens the brief for the next batch. But no further budget goes into producing or promoting them once the data has made the call.",
      },
    ],
  },
  {
    slug: "tvc-film-or-ugc",
    title: "AI TVC vs. AI film vs. AI UGC: how to pick the right format",
    excerpt:
      "The three formats aren't tiers of quality. They're three different bets on how attention actually gets earned — and most briefs need more than one running at once.",
    category: "Strategy",
    date: "2026-07-01",
    readTime: "7 min",
    cover: "/media/variant-1.jpg",
    keyTakeaway:
      "AI TVC is the right call when the brand needs to be the visible hero and production value itself signals trust; AI film works when the brand can afford to be a supporting character in a mood or story; AI UGC works when the goal is to disappear into a feed and earn trust through plausibility rather than polish.",
    pullQuote: "The format is the argument. Choose it before you choose the shot.",
    intro: [
      "AI TVC, AI film, and AI UGC get lumped together as 'AI video' because they share a production method, but they're not interchangeable creative choices — they're three different bets on how attention actually gets earned. Picking the wrong one for the objective is a more common mistake than any technical failure in the generation itself.",
    ],
    sections: [
      {
        heading: "AI TVC: when the brand is the hero",
        paragraphs: [
          "AI TVC works when the audience already expects to be sold to and the brand needs to be the visible subject — broadcast-grade polish, deliberate pacing, a look that says 'this cost something.' It's the right call for launches, for categories where trust is the barrier to purchase, and for anywhere the production value itself is part of the message, not just the delivery mechanism.",
          "The tradeoff is that TVC asks the most of the audience's patience for the least emotional payoff if it isn't executed well — it's the format most likely to be scrolled past if the first two seconds don't earn attention on their own.",
        ],
      },
      {
        heading: "AI film: when the brand can wait",
        paragraphs: [
          "AI film earns something TVC can't: a few extra seconds of patience from the viewer. It works when the brand can afford to be a supporting character in a story instead of the subject of a pitch — a mood, a world, a feeling the product sits inside rather than announces. It's slower to land and it asks more of the viewer, so it only pays off when there's something genuinely worth being patient for.",
          "Film-format AI video is generally the wrong choice for a hard performance objective (immediate conversion) and the right choice for brand-building objectives where the goal is being remembered, not being clicked on immediately.",
        ],
      },
      {
        heading: "AI UGC: when the brand needs to disappear",
        paragraphs: [
          "AI UGC trades polish for plausibility. It's built to disappear into a feed, to look like it wasn't made by a brand at all — which is exactly the point when the goal is trust at scale rather than spectacle. It's also the format that tests fastest and cheapest, which makes it the best first move in a batch when you genuinely don't know what's going to land.",
          "The risk with UGC-format AI video is authenticity failure: if it reads as an ad trying to look like it isn't an ad, it can do more damage to trust than an openly polished TVC would have. This is the format that most rewards a tight, honest brief over an impressive one.",
        ],
      },
    ],
    faq: [
      {
        q: "What's the main difference between AI TVC and AI UGC?",
        a: "AI TVC is built to look like a professionally produced commercial — broadcast polish, deliberate pacing, the brand visibly front and center. AI UGC is built to look like it wasn't made by a brand at all, trading production polish for the plausibility of a real person's post in a feed.",
      },
      {
        q: "Which AI video format performs best for direct-response advertising?",
        a: "AI UGC and short TVC-style hooks tend to perform best for direct response, since both are optimized to earn attention and a click within the first few seconds. AI film generally serves brand and awareness objectives better than immediate conversion.",
      },
      {
        q: "Do I have to choose only one format for a campaign?",
        a: "No — most briefs we scope actually run two or three formats in parallel within the same variant batch, letting audience data decide which format performs rather than committing to one format in the creative brief itself.",
      },
    ],
  },
  {
    slug: "test-before-you-spend",
    title: "Should you test creative before spending the media budget?",
    excerpt:
      "Most teams optimize media spend after the creative is locked. The bigger lever is upstream — testing which cut deserves the budget in the first place, before a dollar is committed.",
    category: "Performance",
    date: "2026-07-08",
    readTime: "6 min",
    cover: "/media/variant-3.jpg",
    keyTakeaway:
      "Yes — testing creative variants against real audience signal before committing media spend consistently produces a larger performance lift than optimizing bids and audiences after a single, unvalidated creative goes live.",
    pullQuote: "Optimizing a bad cut is just an expensive way to confirm it's bad.",
    intro: [
      "Performance teams are very good at optimizing what happens after a creative goes live — bid strategy, audience segments, budget pacing across channels. All of that assumes the creative itself was the right one to run, and that assumption is rarely tested with the same rigor applied everywhere else in the funnel.",
    ],
    sections: [
      {
        heading: "The filter a hero cut actually survives",
        paragraphs: [
          "By the time a single hero cut reaches a media plan, it's usually already survived a much softer filter than a real audience: a boardroom of people who are paid to have opinions about it. That's a different test than the one that actually matters, which is whether a stranger scrolling a feed stops for it, and it's a test creative teams almost never get to run before spend is committed.",
          "The gap between 'the room liked it' and 'the audience stopped for it' is exactly where most underperforming media budgets are quietly lost — not in the bid strategy, but three steps earlier, in a decision nobody thought to test.",
        ],
      },
      {
        heading: "Why the leverage is bigger earlier in the funnel",
        paragraphs: [
          "Running variants against real audience signal before spend is committed moves the optimization earlier, where it's both cheaper and higher-leverage. A meaningful lift from picking the right cut up front is worth more than months of incremental bid-tuning on the wrong one — and unlike bid-tuning, it's a lift you only have to find once per campaign, not manage continuously across its entire flight.",
          "Teams that adopt pre-spend creative testing fastest tend to be the ones who already trust data everywhere else in the funnel — attribution, bidding, audience targeting. Creative was usually just the last place in the funnel they hadn't gotten around to applying the same standard.",
        ],
      },
    ],
    faq: [
      {
        q: "Isn't creative testing just A/B testing with extra steps?",
        a: "Not quite — traditional A/B testing usually happens after launch and compares minor variations. Pre-spend creative testing happens before any media budget is committed and compares genuinely different concepts, so the decision it informs is which idea to fund, not just which detail to tweak.",
      },
      {
        q: "How much of a performance lift can testing creative before spend actually produce?",
        a: "It varies by category and audience, but a validated winning cut consistently outperforms an unvalidated single concept by a wide margin — often more than what teams gain from months of downstream bid and audience optimization on a creative that was never tested to begin with.",
      },
    ],
  },
  {
    slug: "ai-tvc-cost-vs-traditional-production",
    title: "How much does an AI-generated TVC cost vs. traditional production?",
    excerpt:
      "A traditional TVC shoot is priced around a single concept and a single shoot day. AI production is priced around a batch — which changes the real comparison more than the per-clip number does.",
    category: "Cost",
    date: "2026-07-15",
    readTime: "7 min",
    cover: "/media/poster-car.jpg",
    keyTakeaway:
      "AI-generated TVCs typically cost a fraction of a traditional shoot per finished cut, but the more important difference is that the same budget produces a tested batch of variants instead of a single unvalidated concept.",
    pullQuote: "You're not paying for a cheaper ad. You're paying for the option to be wrong twelve times before you have to be right once.",
    intro: [
      "The honest way to compare AI TVC cost to traditional production isn't per-clip — it's per decision. A traditional shoot day locks in one concept and prices everything (location, crew, talent, equipment, contingency) around getting that one concept right on the day. AI production reallocates that same budget toward generating and testing a batch, which changes what you're actually buying.",
    ],
    sections: [
      {
        heading: "What traditional TVC production actually costs",
        paragraphs: [
          "A broadcast-quality traditional commercial typically involves location fees, a full crew, talent and usage rights, equipment rental, and a post-production pass — costs that are largely fixed regardless of how the final spot performs. Most of that spend is committed before a single frame of footage exists, on the basis of a board and a director's pitch, not audience evidence.",
          "Reshoots, when the concept doesn't land after launch, are rarely cheap or fast — they usually mean re-booking the same fixed costs a second time, weeks or months later, after the campaign window that mattered has already partly passed.",
        ],
      },
      {
        heading: "What changes with AI production",
        paragraphs: [
          "AI production removes most of the fixed physical costs — no location, no full crew, no equipment rental — and replaces them with generation and direction time. The practical effect is that the same budget that funded one traditional concept can fund a real batch of variants, tested against audience data, with the winner identified before broader media spend is committed.",
          "This doesn't make AI production free, and it isn't the right comparison to frame as 'cheap.' The more accurate frame is that it changes what a given budget buys: instead of one expensive bet, it buys several tested bets and a data-backed answer about which one to scale.",
        ],
      },
    ],
    faq: [
      {
        q: "Is AI video production always cheaper than a traditional shoot?",
        a: "Per finished clip, almost always. But the more meaningful comparison is that the same total budget typically funds a full tested batch of variants in AI production, versus a single unvalidated concept in traditional production.",
      },
      {
        q: "Are there hidden costs in AI video production?",
        a: "The main cost beyond generation itself is direction and iteration time — writing and refining prompts and references to get a cut that reads as intentional rather than generic. Budgeting for that creative direction time, not just raw generation, is what separates a strong batch from a forgettable one.",
      },
      {
        q: "Does AI production replace the need for a creative agency?",
        a: "No — it replaces the physical production layer, not the creative and strategic layer. The brief, the direction, the grading, and the judgment about what's worth scaling still require the same expertise a strong agency brings to a traditional shoot.",
      },
    ],
  },
  {
    slug: "ai-ugc-vs-real-creator-ugc",
    title: "Is AI UGC as effective as real creator UGC?",
    excerpt:
      "AI UGC can match real creator content on authenticity signals when it's briefed well — but the two aren't interchangeable, and each has a use case the other doesn't cover.",
    category: "Comparison",
    date: "2026-07-22",
    readTime: "6 min",
    cover: "/media/poster-ugc.jpg",
    keyTakeaway:
      "AI UGC can perform as well as real creator UGC when it's briefed and graded to look unpolished and specific rather than generic, but it doesn't replace the relationship equity and platform-native trust a real creator's existing audience brings.",
    pullQuote: "Nobody trusts UGC because it's real. They trust it because it's specific.",
    intro: [
      "AI UGC and real creator UGC are often compared as if one is a drop-in replacement for the other. They're closer to two different tools that happen to produce visually similar output — and the difference matters more for what each is good at than for which one 'wins' on quality.",
    ],
    sections: [
      {
        heading: "What real creator UGC has that AI UGC doesn't",
        paragraphs: [
          "A real creator brings an existing audience relationship into the post — followers who already trust their taste, which transfers some of that trust to whatever they're showing. That relationship equity is not something a generated clip can replicate, no matter how convincing the footage itself is.",
          "Real creators also bring genuine, sometimes surprising product reactions — the specific detail a brand didn't think to brief because it only shows up in actual use. That kind of unscripted specificity is the hardest thing for a generated clip to fake convincingly.",
        ],
      },
      {
        heading: "Where AI UGC wins",
        paragraphs: [
          "AI UGC wins on speed, volume, and control. A real creator campaign takes time to source, brief, shoot, and approve — often weeks per creator. AI UGC can generate a wide batch of format-matched variants in days, across different hooks and personas, and test all of them before any media spend is committed. That volume is what makes variant testing economically possible at all.",
          "It also removes the unpredictability of relying on a third party's schedule, mood, and off-brand ad-libs on the day of filming — for better or worse, the brand keeps creative control over every frame.",
        ],
      },
      {
        heading: "The tell that separates good AI UGC from bad AI UGC",
        paragraphs: [
          "The single biggest driver of whether AI UGC performs is whether it looks unpolished on purpose. UGC-format content that's accidentally too smooth, too well-lit, or too symmetrically framed reads as an ad wearing a UGC costume — which can actively damage trust more than an openly polished TVC would have, because the audience feels tricked rather than sold to.",
          "The brief for AI UGC should specify handheld camera movement, a real (not staged-looking) location, and a performance style that includes small imperfections — because those are exactly the details that signal 'not an ad' to a scrolling audience.",
        ],
      },
    ],
    faq: [
      {
        q: "Can AI UGC pass as real content to viewers?",
        a: "When it's briefed with handheld camera movement, natural (not studio) lighting, and a performance style with small imperfections, yes — most viewers can't reliably distinguish well-briefed AI UGC from real creator content in a scrolling feed context.",
      },
      {
        q: "Should brands stop working with real creators and switch entirely to AI UGC?",
        a: "No — real creators still bring audience relationship equity and unscripted product reactions that AI UGC can't replicate. The stronger approach for most brands is using AI UGC for fast, wide variant testing, then investing in real creator partnerships once a winning angle is confirmed.",
      },
      {
        q: "Does AI UGC need to disclose that it's AI-generated?",
        a: "Where AI use is material to how an audience would interpret the content — such as implying a real person's personal experience or endorsement — it should be disclosed. Good production practice treats disclosure as part of the brief, not an afterthought.",
      },
    ],
  },
  {
    slug: "how-long-does-ai-video-production-take",
    title: "How long does it take to produce an AI TVC or film?",
    excerpt:
      "A single AI-generated cut can be ready in hours. A tested, scoped, brand-ready batch takes days — and that timeline is the actual number that matters for planning a launch.",
    category: "Timeline",
    date: "2026-07-29",
    readTime: "6 min",
    cover: "/media/variant-5.jpg",
    keyTakeaway:
      "A scoped first batch of AI-generated variants — briefed, generated, graded, and ready for audience testing — typically takes about a week, compared to several weeks to months for a traditional TVC shoot from brief to delivery.",
    pullQuote: "The fast part was never the rendering. It's not having to wait for a shoot day.",
    intro: [
      "The honest answer to 'how fast is AI video' depends on which number you're asking about — raw generation time, or the time to a brand-ready, tested batch. The first number is almost irrelevantly small. The second is the one that actually matters for planning a launch.",
    ],
    sections: [
      {
        heading: "Raw generation is fast — and mostly beside the point",
        paragraphs: [
          "A single AI-generated clip can render in minutes to a few hours depending on length, resolution, and complexity. That speed is real, but treating it as the headline number misses what actually takes time in a production that's ready to represent a brand.",
          "The time that matters is spent before and after generation: writing and refining the brief and references until the output is directed rather than default, and grading every variant in a batch to one consistent look so it reads as a single campaign instead of a pile of disconnected clips.",
        ],
      },
      {
        heading: "What a realistic week-one timeline looks like",
        paragraphs: [
          "A tight brief (what's being sold, who has to believe it, what's non-negotiable) usually turns into a scoped first batch of variants within about a week — covering brief refinement, generation across multiple hooks and formats, grading for a consistent look, and packaging the batch for audience testing.",
          "That week produces something a traditional shoot almost never can on the same timeline: not one finished spot, but a full tested batch with a data-backed answer about which cut is worth scaling. The traditional equivalent — location scouting, crew booking, a shoot day, post-production — routinely runs from several weeks to a few months before a single concept is ready to launch, let alone tested.",
        ],
      },
    ],
    faq: [
      {
        q: "How fast can an AI-generated ad be ready to launch?",
        a: "A single directed, graded cut can realistically be ready within days. A full tested batch — the version we'd actually recommend running media spend against — typically takes about a week from a clear brief.",
      },
      {
        q: "Why does AI video production take days if the generation itself is fast?",
        a: "Most of the time isn't spent waiting on the model — it's spent on brief refinement, directing the prompt and references toward a specific look, and grading the batch to a consistent style so it's ready to represent the brand rather than read as a raw demo.",
      },
      {
        q: "Is a rushed AI-generated ad noticeably worse than one given more time?",
        a: "Usually, yes — the quality difference in AI video production shows up almost entirely in direction time, not generation time. A rushed brief produces generic default output regardless of how capable the underlying model is.",
      },
    ],
  },
  {
    slug: "what-makes-an-ai-video-ad-go-viral",
    title: "What makes an AI-generated video ad go viral?",
    excerpt:
      "Virality isn't a production quality — it's a testing outcome. The ads that go viral are usually the ones that survived a real batch, not the ones that were designed to be viral from the start.",
    category: "Performance",
    date: "2026-08-05",
    readTime: "6 min",
    cover: "/media/variant-2.jpg",
    keyTakeaway:
      "Viral video ads are less often the product of a single brilliant creative idea and more often the surviving winner of a wide, tested batch of variants — virality is a testing outcome, not a production technique.",
    pullQuote: "Nobody sets out to make the twenty-third-best version of an idea. That's usually what makes the first one great.",
    intro: [
      "Every brand that's had a genuinely viral ad has been asked the same question afterward: what did you do differently? The uncomfortable honest answer, most of the time, is less 'we had a brilliant idea' and more 'we tested a lot of ideas and this happened to be the one that worked.'",
    ],
    sections: [
      {
        heading: "Virality is a testing outcome, not a production technique",
        paragraphs: [
          "No production method, AI or traditional, reliably produces a viral hit on command — anyone claiming otherwise is selling something. What a real testing process does is dramatically increase the odds of finding a hit by making it economically possible to try far more genuinely different ideas than a single-concept production budget ever could.",
          "This reframes the goal from 'invent the viral idea' — nearly impossible to do reliably — to 'generate a wide enough batch that the viral idea, if it exists in the brief's space, actually gets made and gets a chance to prove itself against real audience signal.'",
        ],
      },
      {
        heading: "What surviving cuts tend to have in common",
        paragraphs: [
          "Across the batches that have produced real breakout performance, a few patterns show up more than others: a hook that creates a question in the first two seconds instead of announcing the product, a specific and slightly unexpected detail rather than a polished generality, and a format choice (often UGC or a film-style beat) that doesn't announce itself as an ad before it's earned the viewer's attention.",
          "None of those patterns are things a team can reliably plan for in advance with certainty — which is exactly the argument for testing a genuinely wide batch instead of trying to intellectually reason your way to the one correct idea before any audience has seen it.",
        ],
      },
      {
        heading: "The uncomfortable part: most variants won't go viral, and that's fine",
        paragraphs: [
          "In a batch of a dozen or two dozen variants, the overwhelming majority perform normally or fail outright. That's not a flaw in the process — it's the process working correctly, because it means the batch was actually wide enough to include some genuinely different bets rather than a dozen safe variations on the same idea.",
          "The teams that get uncomfortable with that ratio and narrow the batch to 'safer' concepts tend to see fewer breakout results, not more — because narrowing the batch is exactly what reduces the odds of a genuine surprise surviving the test.",
        ],
      },
    ],
    faq: [
      {
        q: "Can you predict in advance which ad variant will go viral?",
        a: "Not reliably — that unpredictability is exactly why testing a wide batch against real audience data outperforms trying to design one 'correct' viral concept up front.",
      },
      {
        q: "Do viral ads need a big production budget?",
        a: "No — production polish and virality aren't strongly correlated. Some of the best-performing variants in a tested batch are the least polished, UGC-style cuts, because they read as authentic rather than as an ad.",
      },
      {
        q: "What's the biggest mistake brands make when trying to create a viral ad?",
        a: "Committing to a single concept before testing, based on which idea the room liked best. That approach removes the one mechanism — a wide, genuinely tested batch — that actually improves the odds of a breakout result.",
      },
    ],
  },
  {
    slug: "anatomy-of-a-week-one-brief",
    title: "What a week-one brief actually needs to say",
    excerpt:
      "The briefs that produce the strongest batches are shorter than people expect — and specific about exactly three things, leaving everything else for the batch itself to test.",
    category: "Method",
    date: "2026-08-12",
    readTime: "6 min",
    cover: "/media/funnel-11.jpg",
    keyTakeaway:
      "A strong first-week brief for AI video production needs exactly three things — a one-sentence statement of what's being sold, a specific audience who has to believe it, and the non-negotiable constraints — with everything else left open for the batch to test.",
    pullQuote: "A brief's job is to remove decisions, not describe a scene.",
    intro: [
      "The instinct with a new format is to over-specify — describing the shot, the mood, the exact line of dialogue, as if more detail always produces a better result. In practice, the briefs that produce the strongest first batch are the ones that nail three things and leave the rest to the batch itself.",
    ],
    sections: [
      {
        heading: "The three things a brief has to say",
        paragraphs: [
          "First: what is actually being sold, in one sentence a stranger could repeat back. Not the brand positioning deck — the thing a person would say to a friend about why it's worth their attention.",
          "Second: who has to believe it, specific enough that a variant could plausibly fail to reach them. 'Everyone' isn't an audience — it's the absence of one, and a brief written for everyone tends to land with no one in particular.",
          "Third: what's non-negotiable — the one or two constraints (a claim that must appear, a tone that can't be used, a regulatory line that can't be crossed) that every variant in the batch has to respect no matter how different they are otherwise.",
        ],
      },
      {
        heading: "Everything else should stay open — on purpose",
        paragraphs: [
          "Past those three things, more specificity isn't more helpful — it's a way of quietly narrowing the batch back down to the single-concept bet the whole method exists to avoid. The hook, the pacing, the exact format: those are precisely the variables the batch is built to test, and pre-deciding them in the brief removes the thing that makes testing worth doing.",
          "A brief that nails the three essentials and leaves the rest open usually turns into a scoped first batch within the week — not because the work is rushed, but because a good brief doesn't leave much to deliberate over before generation can start.",
        ],
      },
    ],
    faq: [
      {
        q: "How detailed should a brief be for AI video production?",
        a: "Detailed on exactly three things — what's being sold, who has to believe it, and what's non-negotiable — and deliberately open everywhere else, so the batch itself can test the hook, pacing, and format rather than the brief pre-deciding them.",
      },
      {
        q: "What's the most common mistake in briefs for AI-generated ads?",
        a: "Over-specifying the shot itself — describing a scene in detail instead of stating the sales objective, audience, and constraints. That approach collapses a testable batch back down to a single bet, which defeats the purpose of generating variants at all.",
      },
      {
        q: "How long does it take to turn a brief into a scoped batch?",
        a: "For a brief that hits the three essentials clearly, about a week — covering brief refinement, generation across formats and hooks, and grading the batch for a consistent look ahead of audience testing.",
      },
    ],
  },
]

export function getPost(slug: string) {
  return POSTS.find((p) => p.slug === slug)
}
