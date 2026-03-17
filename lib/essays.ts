// Essays — TroyMichaelScott.com
// Add new essays to this array. Newest first.

export interface Essay {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  body: string;
}

export const essays: Essay[] = [
  {
    slug: 'economy-designed-for-tools',
    title: 'The Economy We Built Was Designed for Tools. AI Is Not a Tool Anymore.',
    date: 'March 16, 2026',
    category: 'Technology & AI',
    excerpt:
      'For most of the past decade, artificial intelligence was something you used. That is no longer an accurate description of what AI is becoming — and our economic system was not designed for what comes next.',
    body: `\u201cEvery previous invention in human history was a tool. Now we are creating agents\u2026 introducing a different species to Earth. In the history of biology, it usually doesn\u2019t end well for the less intelligent species when the more intelligent species comes along.\u201d

\u2014 Yuval Noah Harari

Physicist Max Tegmark put it even more bluntly in the Bloomberg interview:

\u201cThey check all the boxes of being a species. The default outcome, is the smartest species takes control because intelligence gives power.\u201d

Those two statements are easy to have a laugh at, dismiss as science fiction. Until you realize something uncomfortable.

The economy we built assumes that humans will always be the most capable agents inside the system.

What happens if that assumption stops being true?

For most of the past decade, artificial intelligence was something you used.

You typed a prompt and it responded.
You uploaded a document and it summarized.
You described a problem and it suggested solutions.

The human remained at the center \u2014 deciding, directing, evaluating.
The AI was sophisticated, often remarkable, but structurally it belonged in the same category as a calculator or a search engine.

It was an instrument of human intention.

That is no longer an accurate description of what AI is becoming.

\u22ef \u22ef \u22ef

The shift happening now \u2014 the one that much of the public conversation has not fully absorbed \u2014 is the transition from AI as a tool to AI as an agent.

A tool waits.
An agent acts.
A tool requires instruction.
An agent can pursue goals across time.

An agent does not simply answer a question.
It can browse the internet, write and deploy code, conduct research, manage communications, coordinate tasks, and complete multi-step projects with minimal human supervision.

\u2014 \u2014 \u2014

In many professional environments today, the human is no longer the operator of an AI system. The human is the supervisor. In some cases, the client.

This is not an incremental improvement in software. It is a structural shift.

And our economic system was not designed for it.

\u2014 \u2014 \u2014\u2014 \u2014 \u2014

Our Economy

\u2014 \u2014 \u2014\u2014 \u2014 \u2014

The economy we live inside was built around a relatively stable assumption: that human labor, in some form, would remain the primary mechanism through which value is created and distributed.

Wages, taxes, social insurance, consumer spending \u2014 all of these ultimately depend on people being economically necessary.

The entire architecture of how money moves through a society rests on that foundation.

When AI was a tool, that foundation still held.

A worker using AI was still a worker. The tool made the worker more productive. Companies sometimes needed fewer people to produce the same output, but the relationship between human contribution and economic participation remained intact.

AI agents introduce a different dynamic.

If an agent can perform the work of a knowledge worker autonomously, at a fraction of the cost, the incentive to employ the human disappears.

And here is where the design of our system becomes the real issue.

The system does not merely permit this substitution.

It rewards it.

\u22ef \u22ef \u22ef

In most advanced economies, labor income is taxed more heavily than capital income. A company that replaces employees with AI agents eliminates payroll obligations, reduces operational costs, and often sees its stock price rise.

There is no equivalent cost for the displacement created.

The workers lose income.
Communities lose spending power.
Local economies weaken.

But the firm records higher margins, and by the metrics our system uses to measure success, the economy appears healthier than ever.

This is not a conspiracy.

It is an incentive structure.
And incentive structures are not natural phenomena.

They are designs.

\u22ef \u22ef \u22ef

They were written into law by people, at specific moments in history, for specific purposes.

And what was designed can be redesigned.

There is a deeper problem beneath this.

We are measuring the wrong things.

\u2014 \u2014 \u2014\u2014 \u2014 \u2014

Gross Domestic Product \u2014 GDP \u2014 is the primary instrument governments use to evaluate economic health. It measures the monetary value of goods and services produced.

But GDP does not measure whether people feel secure.
It does not measure psychological wellbeing.
It does not measure social trust.
It does not measure meaningful work, human dignity, or stable communities.

An economy could replace millions of workers with autonomous systems and still report strong GDP growth.

Productivity rises.
Costs fall.
Profits increase.

From the perspective of GDP, the system looks healthy.

From the perspective of human life, the story may be very different.

Robert F. Kennedy understood this as early as 1968, when he observed that GDP \u201cmeasures everything, in short, except that which makes life worthwhile.\u201d

That critique is nearly sixty years old.
The measurement system has not changed.
And in a world of AI agents, the gap between what GDP counts and what actually matters to human beings is about to widen dramatically.

So what would it mean to close that gap?

What would it mean to design an economy not for maximum output, but for human flourishing?

This is what I have been calling an
Alignment Economy.

The term comes from artificial intelligence research, where \u201calignment\u201d refers to the challenge of ensuring that powerful AI systems pursue goals compatible with human wellbeing rather than goals that are merely efficient.

The economic version of that problem is simpler to state but no less important:

What are our institutions actually optimizing for?

And are those goals still compatible with the kind of society we want to live in?

An alignment economy would measure success differently.
It would track wellbeing, health, agency, and social stability alongside production.

It would redesign incentives so that the productivity gains created by AI flow broadly across society rather than concentrating exclusively in the hands of those who own the systems.

It would build stability mechanisms \u2014 income floors, education systems designed for adaptability, support for caregiving and community infrastructure \u2014 so that the speed of technological change does not outpace the ability of society to absorb it.

This is very possible.

None of this requires stopping technological progress.
It requires updating the rules that govern how the benefits of that progress are distributed.

The question this raises is ultimately a philosophical one.

What is an economy for?

Economies are often discussed as if they were natural systems \u2014 forces of nature to be managed, predicted, or reacted to.

But economies are not natural systems.

They are designed systems.
They run on rules.

Tax codes.
Property rights.
Corporate governance laws.
Financial regulations.
Measurement frameworks.

These rules determine who benefits when technology changes the world.

And those rules can change.

\u2014 \u2014 \u2014

The real challenge of the AI age is not building the technology.

We are already doing that.

The challenge is deciding whether we will redesign the institutions that technology operates inside.

Because if we do not redesign them intentionally, the old rules will still apply.

And the old rules were written for a world where machines were tools.

Not agents.

The technology is changing.

The question is whether our institutions will change with it \u2014 or whether we will wait until the consequences force us to.

And by then, the design choices may already have been made.`,
  },
];

export function getEssayBySlug(slug: string): Essay | undefined {
  return essays.find((e) => e.slug === slug);
}

export function getAllEssays(): Essay[] {
  return essays;
}
