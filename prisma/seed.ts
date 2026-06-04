import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // --- Site Settings ---
  await prisma.siteSettings.upsert({
    where: { id: 1 },
    create: {
      id: 1,
      siteName: "Event Fusion",
      tagline: "Bespoke occasions, delivered with discretion",
      contactEmail: "charlottewb@eventfusion.co.uk",
      formspreeId: "mlgkrypl",
      footerText: `© ${new Date().getFullYear()} Charlotte Wolseley Brinton / Event Fusion. All rights reserved.`,
    },
    update: {},
  });

  // --- Services ---
  const services = [
    {
      slug: "private-celebrations",
      title: "Private Celebrations",
      subtitle: "Weddings, milestone birthdays, anniversaries, intimate gatherings",
      description:
        "From an intimate dinner for twenty to a landmark celebration for hundreds, every private occasion is treated with the same meticulous attention to detail. Charlotte has been trusted by royal households, celebrated artists and private families for over 25 years to create events that feel deeply personal and utterly flawless.",
      icon: "heart",
      order: 1,
    },
    {
      slug: "cultural-arts-events",
      title: "Cultural & Arts Events",
      subtitle: "Gallery openings, pavilion curation, cultural programmes",
      description:
        "With deep roots in London's cultural world -- from Serpentine Summer Parties to Venice Biennale pavilions -- Charlotte brings curatorial sensitivity and logistical precision to events that sit at the intersection of art and occasion.",
      icon: "palette",
      order: 2,
    },
    {
      slug: "corporate-events",
      title: "Corporate Events",
      subtitle: "Product launches, conferences, awards, client entertainment",
      description:
        "Corporate events done properly. Charlotte understands that every gathering carries your brand -- and your reputation. From product launches to awards evenings, she ensures your guests leave with the right impression.",
      icon: "briefcase",
      order: 3,
    },
    {
      slug: "government-diplomatic",
      title: "Government & Diplomatic",
      subtitle: "Foreign & Commonwealth Office events, high commissioner engagements",
      description:
        "Protocol matters. Charlotte has planned and delivered events at the highest levels of government, including Foreign & Commonwealth Office events and high commissioner engagements, where discretion is not optional -- it is essential.",
      icon: "landmark",
      order: 4,
    },
    {
      slug: "charity-galas-fundraisers",
      title: "Charity Galas & Fundraisers",
      subtitle: "From The Prince's Trust to major international charities",
      description:
        "Charlotte has raised millions for charity through events that are both moving and memorable. Working with The Prince's Trust and a wide range of international charities, she understands how to balance impact with elegance.",
      icon: "star",
      order: 5,
    },
    {
      slug: "consultancy",
      title: "Consultancy",
      subtitle: "Event department development, team training",
      description:
        "Drawing on 25+ years of experience, Charlotte offers consultancy to organisations looking to build or improve their events function -- from department structure and supplier selection to team training and process design.",
      icon: "lightbulb",
      order: 6,
    },
  ];

  for (const svc of services) {
    await prisma.service.upsert({
      where: { slug: svc.slug },
      create: svc,
      update: {},
    });
  }

  // --- Testimonials ---
  const testimonials = [
    {
      quote:
        "You are a SUPERSTAR, Charlotte. You pulled it off, and how! We know we cannot thank you enough for your herculean efforts in mounting the first Cork Street party in over 3 decades in just 3 weeks, but do know that all thanks comes from the depths of our hearts, and we are indebted to you. Your team was beyond fabulous; please extend huge thanks from us for their brilliant work.",
      author: "The Pollen Estate",
      event: "Cork Street 100 Years",
      featured: true,
      order: 0,
    },
    {
      quote:
        "Your ability to quickly size up our needs, point us to the right resources, track every detail, gently redirect where needed and follow through on every point to the finish just touches the surface.",
      author: "Private Client",
      event: "Private Wedding",
      featured: true,
      order: 1,
    },
    {
      quote:
        "We are extremely grateful for all of your efforts. Miraculous really. All done remotely -- unbelievable. The quality of vendors and team is truly a credit to you. A class act all the way.",
      author: "Private Client",
      event: "Dinner During Covid",
      featured: false,
      order: 2,
    },
    {
      quote:
        "Getting married is probably one of the most precious memories you'll have after having your children, of course! So having Charlotte share her love and expertise, making our ideas come true, inspiring, and adding to them is why she will forever be family. Thank you, Charlotte.",
      author: "Sharleen Spiteri",
      event: "Private Wedding",
      featured: true,
      order: 3,
    },
    {
      quote:
        "I must thank you personally for being so easy to work with and for taking such immense trouble over the smallest detail.",
      author: "Private Client",
      event: "G8 Summit Dinner",
      featured: false,
      order: 4,
    },
    {
      quote:
        "You did an absolute brilliant job masterminding The Summer Party and lots of people say it was the best one yet, which is a huge feather in your cap for achieving this brilliant result.",
      author: "Serpentine Gallery",
      event: "Serpentine Summer Party",
      featured: true,
      order: 5,
    },
    {
      quote:
        "How can we ever thank you enough for all your magnificent work on our 100th -- a smashing success that completely surpassed all expectation. Every detail was perfect.",
      author: "Private Clients",
      event: "Joint 50th Birthday",
      featured: false,
      order: 6,
    },
    {
      quote:
        "You and your amazing team were seriously impressive -- having met you, I was full of confidence. It was a triumph in every way.",
      author: "Private Client",
      event: "Charity Dinner",
      featured: false,
      order: 7,
    },
  ];

  for (const [i, t] of testimonials.entries()) {
    const existing = await prisma.testimonial.findFirst({ where: { quote: t.quote } });
    if (!existing) {
      await prisma.testimonial.create({ data: { ...t, order: i } });
    }
  }

  // --- Homepage Page + Sections ---
  const homePage = await prisma.page.upsert({
    where: { slug: "home" },
    create: {
      slug: "home",
      title: "Home",
      metaTitle: "Charlotte Wolseley Brinton -- Event Fusion | Bespoke Event Planning",
      metaDescription:
        "Bespoke occasions, delivered with discretion. Trusted by royalty, cultural institutions and private clients for over 25 years. Private celebrations, weddings, corporate events and cultural moments.",
    },
    update: {},
  });

  const sections = [
    {
      type: "hero",
      order: 0,
      content: {
        headline: "Trusted by royalty, cultural institutions & private clients for over 25 years",
        subheadline: "Bespoke occasions, delivered with discretion",
        ctaText: "Discuss Your Event",
        ctaLink: "/contact",
        backgroundImage: "/images/Homepage hero1.jpeg",
      },
    },
    {
      type: "marquee",
      order: 1,
      content: {
        items: [
          "Mayor's Office for Culture",
          "Foreign & Commonwealth Office",
          "Serpentine Gallery",
          "Venice Biennale",
          "The Prince's Trust",
          "Royal Exchange",
          "Tate",
          "Royal Institution",
          "Lisson Gallery",
        ],
      },
    },
    {
      type: "about",
      order: 2,
      content: {
        headline: "An exceptional eye for detail, built over a quarter century",
        bio: "Charlotte Wolseley Brinton has spent 25 years at the heart of London's most distinguished events -- from royal occasions to Foreign & Commonwealth Office dinners, Venice Biennale pavilions to Serpentine Summer Parties.\n\nShe founded Event Fusion to bring that level of experience and discretion to every client, regardless of scale. Her approach is deeply personal: she listens first, then builds.",
        image: "/images/Charlotte.webp",
        highlights: [
          "25+ years experience",
          "Royalty & heads of state",
          "Cultural institutions",
          "International charity galas",
        ],
      },
    },
    {
      type: "services",
      order: 3,
      content: {
        headline: "What we do",
        intro:
          "Every event is unique. Charlotte works across private celebrations, cultural moments, corporate occasions, government engagements and charity galas -- always with the same standard of excellence.",
      },
    },
    {
      type: "portfolio",
      order: 4,
      content: {
        headline: "Selected events",
      },
    },
    {
      type: "process",
      order: 5,
      content: {
        headline: "How we work",
        steps: [
          {
            title: "Getting Started",
            description:
              "Initial consultation to understand your vision, requirements and budget. No obligation -- just an honest conversation.",
          },
          {
            title: "Building Your Team",
            description:
              "Handpicking trusted suppliers from 25+ years of relationships. We know who delivers and who to avoid.",
          },
          {
            title: "The Journey",
            description:
              "Hands-on management from concept through to flawless delivery. You enjoy the event; we handle everything else.",
          },
        ],
      },
    },
    {
      type: "clients",
      order: 6,
      content: {
        headline: "Trusted by",
        items: [
          "Mayor's Office for Culture",
          "Foreign & Commonwealth Office",
          "Serpentine Gallery",
          "Venice Biennale",
          "The Prince's Trust",
          "Royal Exchange",
          "Tate",
          "Royal Institution",
          "Lisson Gallery",
          "Cork Street Galleries",
          "G8 Summit",
          "Serpentine Summer Party",
        ],
      },
    },
    {
      type: "testimonials",
      order: 7,
      content: {
        headline: "In their own words",
      },
    },
  ];

  for (const section of sections) {
    const existing = await prisma.section.findFirst({
      where: { pageId: homePage.id, type: section.type },
    });
    if (!existing) {
      await prisma.section.create({
        data: { ...section, pageId: homePage.id },
      });
    }
  }

  // --- Portfolio Items ---
  const portfolioItems = [
    {
      title: "50th Birthday Party",
      category: "Private Celebrations",
      imageUrl: "/images/50th birthday party.webp",
      imageAlt: "Elegant 50th birthday celebration",
      order: 0,
    },
    {
      title: "AA Party",
      category: "Private Celebrations",
      imageUrl: "/images/AA Party.webp",
      imageAlt: "Private party event",
      order: 1,
    },
    {
      title: "Beach Dinner",
      category: "Private Celebrations",
      imageUrl: "/images/Beach dinner.webp",
      imageAlt: "Intimate beach dinner setting",
      order: 2,
    },
    {
      title: "Mauritius Wedding",
      category: "Private Celebrations",
      imageUrl: "/images/Mauritius wedding party.webp",
      imageAlt: "Wedding celebration in Mauritius",
      order: 3,
    },
  ];

  for (const item of portfolioItems) {
    const existing = await prisma.portfolioItem.findFirst({ where: { title: item.title } });
    if (!existing) {
      await prisma.portfolioItem.create({ data: { ...item, enabled: true } });
    }
  }

  // --- Other Pages ---
  const otherPages = [
    {
      slug: "about",
      title: "About",
      metaTitle: "About Charlotte Wolseley Brinton | Event Fusion",
      metaDescription:
        "25 years planning extraordinary events for royalty, cultural institutions, governments and private clients. Meet Charlotte Wolseley Brinton.",
    },
    {
      slug: "services",
      title: "Services",
      metaTitle: "Event Planning Services | Charlotte Wolseley Brinton",
      metaDescription:
        "Bespoke event planning across private celebrations, cultural events, corporate occasions, government engagements and charity galas.",
    },
    {
      slug: "contact",
      title: "Contact",
      metaTitle: "Discuss Your Event | Charlotte Wolseley Brinton",
      metaDescription:
        "Get in touch to discuss your event. Charlotte works with a limited number of clients each year to ensure every occasion receives the attention it deserves.",
    },
  ];

  for (const page of otherPages) {
    await prisma.page.upsert({
      where: { slug: page.slug },
      create: page,
      update: {},
    });
  }

  // --- Admin Users ---
  const adminUsers = [
    { name: "Jim Chetwode", email: "jim@okapiandco.co.uk" },
    { name: "Charlotte Wolseley Brinton", email: "charlottewb@eventfusion.co.uk" },
  ];

  for (const user of adminUsers) {
    await prisma.user.upsert({
      where: { email: user.email },
      create: { name: user.name, email: user.email },
      update: {},
    });
  }

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
