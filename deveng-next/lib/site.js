// Single source of truth for navigation, books and posts.
// The static build repeated all of this across 14 hand-edited HTML files.

export const site = {
  name: 'DevEng.org',
  title: 'Development Engineering',
  tagline: 'Engineering with Soul',
  email: 'bamadei@gmail.com',
  phone: '303-929-8167',
  phoneHref: '+13039298167',
  address: ['Bernard Amadei', 'Common Ground Solutions LLC', '2536 Columbine Circle', 'Lafayette, CO 80026'],
  website: 'https://www.deveng.org/',
};

export const books = [
  {
    slug: "engineering-for-sustainable-human-development",
    shelfTitle: "Engineering for Sustainable Human Development",
    title: "Engineering for Sustainable Human Development",
    subtitle: "A Guide to Successful Small-Scale Community Projects",
    cover: "/assets/images/books/book-1.png",
    blurb: "A framework for engineers working on small-scale projects in developing communities, combining development practice, engineering project management and systems thinking.",
    metaTitle: "Engineering for Sustainable Human Development | Development Engineering",
    meta: ["Bernard Amadei", "ASCE Press • 2014"],
    body: [
      "The book addresses the role of engineering in poverty reduction and human development. It presents an integrative framework for small-scale community projects that combines development practice, engineering project management and systems thinking.",
      "The framework is designed for projects that must be technically sound while also fitting their social, environmental and economic context.",
    ],
  },
  {
    slug: "modeling-community-development-projects",
    shelfTitle: "Modeling Community Development Projects",
    title: "A Systems Approach to Modeling Community Development Projects",
    subtitle: "Systems thinking for community-scale projects",
    cover: "/assets/images/books/book-2.png",
    blurb: "An introduction to systems thinking and system dynamics for conceptualizing communities and planning small-scale development projects in complex environments.",
    metaTitle: "A Systems Approach to Modeling Community Development Projects | Development Engineering",
    meta: ["Bernard Amadei", "Momentum Press • 2015"],
    body: [
      "This book makes the case for using systems thinking and system dynamics to understand communities as complex adaptive systems. It discusses how participation, reflection, uncertainty and contextual decision-making shape project work.",
      "Its project-management perspective emphasizes solutions that are technically sound, context-aware and developed for the right reasons.",
    ],
  },
  {
    slug: "water-energy-land-food-nexus",
    shelfTitle: "The Water-Energy-Land-Food Nexus",
    title: "A Systems Approach to Modeling the Water-Energy-Land-Food Nexus",
    subtitle: "Volumes I and II",
    cover: "/assets/images/books/book-3.png",
    blurb: "A two-volume systems-based methodology for managing and allocating community water, energy, land and food resources.",
    metaTitle: "A Systems Approach to Modeling the Water-Energy-Land-Food Nexus | Development Engineering",
    meta: ["Bernard Amadei", "Momentum Press • 2019"],
    body: [
      "Water, energy, land and food are treated as interdependent community resources rather than isolated sectors. The two-volume work develops a flexible systems-based methodology for understanding the nexus, modeling interactions and exploring intervention strategies.",
      "The approach is intended to support scientists, engineers, policymakers and decision-makers working with resource constraints and community development challenges.",
    ],
  },
  {
    slug: "peace-sustainability-climate-security",
    shelfTitle: "The Peace-Sustainability-Climate Security Nexus",
    title: "Navigating the complexity across the peace-sustainability-climate security nexus",
    subtitle: "A systems view of interdependent challenges",
    cover: "/assets/images/books/book-4.png",
    blurb: "A systems-oriented exploration of the relationships among peace, sustainability and climate security at community scale.",
    metaTitle: "Navigating the complexity across the peace-sustainability-climate security nexus | Development Engineering",
    meta: ["Bernard Amadei", "Routledge • 2023"],
    body: [
      "This book explores how peace, sustainability and climate security interact at community scale. It argues for integrated, systems-aware approaches to human development and security rather than treating these challenges independently.",
      "The proposed perspective embraces complexity, context and multiple “good-enough” states rather than assuming a single universal solution.",
    ],
  },
  {
    slug: "engineering-for-peace-and-diplomacy",
    shelfTitle: "Engineering for Peace and Diplomacy",
    title: "Engineering for Peace and Diplomacy",
    subtitle: "Engineering in peacebuilding and diplomatic efforts",
    cover: "/assets/images/books/book-5.png",
    blurb: "A 2025 book examining how the engineering profession can contribute to peacebuilding and diplomatic efforts in the 21st century.",
    metaTitle: "Engineering for Peace and Diplomacy | Development Engineering",
    meta: ["Bernard Amadei", "Stanford Publ. Pte Ltd. • 2025"],
    body: [
      "This book examines the engineering profession’s role in advancing human development and security and contributing to peacebuilding and diplomatic efforts in conflict-affected, conflict-sensitive and fragile environments.",
      "It raises questions about collaboration across disciplines, professional principles, lifelong training and engineering’s responsibility to the local and global public good.",
    ],
  },
];

export const posts = [
  {
    slug: "new-book-community-development",
    title: "New Book: A systems approach to modeling community development projects",
    date: "Sep 21, 2015",
    body: [
      "This book presents a systems approach to small-scale community development projects, using system dynamics to build conceptual models and examine issues at different scales. Communities are treated as complex adaptive systems whose people, institutions and infrastructure interact with each other and their environment. The approach emphasizes participation, continuous reflection, critical and creative tools, and context-aware project management.",
    ],
  },
  {
    slug: "science-technology-engineering-for-peace",
    title: "Science, Technology & Engineering for Peace",
    date: "Sep 20, 2014",
    body: [
      "What role can engineering play in peace-making? Rather than focusing only on preparation for conflict, this discussion asks whether engineers can reduce root causes of violence such as water scarcity, hunger and poverty through sustainable community development and human security.",
    ],
  },
  {
    slug: "role-of-engineers-in-development",
    title: "What is the role of engineers in development?",
    date: "Sep 13, 2014",
    body: [
      "Engineering has historically directed a large share of its effort toward a relatively small part of the global population. This post asks what might change if engineering focused more directly on people without safe water, sanitation and other basic services, and whether the profession has a responsibility to contribute to sustainable development and poverty reduction.",
    ],
  },
  {
    slug: "wash",
    title: "WASH Priorities & Approaches",
    date: "Sep 13, 2014",
    body: [
      "Water, sanitation and hygiene are deeply connected. This short discussion asks why water often receives more attention than sanitation and hygiene and invites consideration of the most cost-effective ways to address WASH priorities together.",
    ],
  },
];

export const nav = [
  { label: 'The Author', href: '/author' },
  { label: 'Books by B. Amadei', href: '/books', children: books.slice(0, 4).map((b) => ({ label: b.title, href: `/books/${b.slug}` })) },
  { label: 'Common Ground Solutions Center', href: '/common-ground-solutions-center' },
];

export const quickLinks = [
  { label: 'What is Development Engineering?', href: '/#what' },
  { label: 'Why Development Engineering?', href: '/#why' },
  { label: 'Books by Bernard Amadei', href: '/books' },
  { label: 'The Author', href: '/author' },
  { label: 'Common Ground Solutions Center', href: '/common-ground-solutions-center' },
];

export const socials = [
  { label: 'Skype', href: 'skype:bamadei', stroke: true, paths: [
    'M7.2 4.5A7 7 0 0 1 18.5 10a5 5 0 0 1-6.5 7.7A7 7 0 0 1 5.5 6.2a4 4 0 0 1 1.7-1.7Z',
    'M9 14.6c.8.7 1.8 1 3 1 1.7 0 2.8-.7 2.8-1.8 0-1.2-1-1.6-3-2-1.9-.4-3.2-1.1-3.2-2.6 0-1.5 1.4-2.6 3.3-2.6 1.2 0 2.2.3 3 .9' ] },
  { label: 'Facebook', href: 'https://www.deveng.org/', stroke: false, paths: [
    'M14 8h3V4h-3c-3 0-5 2-5 5v3H6v4h3v6h4v-6h3l1-4h-4V9c0-.7.3-1 1-1Z' ] },
  { label: 'Twitter', href: 'https://www.deveng.org/#bamadei', stroke: false, paths: [
    'M20 6.5c-.6.3-1.3.5-2 .6a3.5 3.5 0 0 0-6 3.2A10 10 0 0 1 4.8 6.7a3.5 3.5 0 0 0 1.1 4.7c-.5 0-1-.2-1.5-.4 0 1.7 1.2 3.1 2.8 3.4-.5.2-1 .2-1.5.1.5 1.4 1.8 2.4 3.3 2.4A7 7 0 0 1 4.6 18H4a9.9 9.9 0 0 0 5.4 1.6c6.5 0 10-5.4 10-10v-.5c.7-.5 1.3-1.1 1.8-1.8-.6.3-1.3.5-2 .6.7-.4 1.3-1.1 1.6-2-.7.4-1.4.7-2.2.8A3.5 3.5 0 0 0 20 6.5Z' ] },
];

export const heroSlides = [
  {
    src: '/assets/images/hero-development-engineering-v2.webp',
    alt: 'Women collaborating on a community planning activity',
    position: '68% center',
    label: 'People-Centered Solutions',
  },
  {
    src: '/assets/images/community-project-v2.webp',
    alt: 'Engineers and community members installing a water line together',
    position: '58% center',
    label: 'Sustainable Infrastructure',
  },
  {
    src: '/assets/images/bridge-kenya-v2.webp',
    alt: 'A community-built suspension bridge crossing a river valley',
    position: '58% center',
    label: 'Stronger Communities',
  },
  {
    src: '/assets/images/hero-slides/landscape-trees.webp',
    alt: 'Timber and woodland in a misty landscape',
    position: '64% center',
    label: 'A More Peaceful World',
  },
];

export const quotes = [
  'Engineering can and should be a force for a more just, sustainable and peaceful world.',
  'Real and lasting change happens when we work with people, not just for them.',
  'Development Engineering is about applying knowledge to serve people and the planet.',
];
