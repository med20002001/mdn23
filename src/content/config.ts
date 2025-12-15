import { defineCollection, z, type SchemaContext } from "astro:content";
const publicationsCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    kind: z.literal("post"),
    title: z.string(),
    author: z.string().optional(),
    publishedAt: z.date().optional(),
    cover: image().optional(),
    coverAlt: z.string().optional(),
    leadTitle: z.string().optional(),
    leadText: z.string().optional(),
    excerpt: z.string().optional(),
  }),
});
const events = defineCollection({
  type: "content",
   schema: ({ image }) => z.object({
    title: z.string(),
    date: z.date(),
    datetime: z.string(),
    location: z.string(),
    description: z.string(),
    image: image(),
    organizer: z.string().optional(),
    organizerEmail: z.string().optional(),
    organizerWebsite: z.string().optional(),
    phone: z.string().optional(),
    venueWebsite: z.string().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    postalCode: z.string().optional(),
    country: z.string().optional(),
    googleMapsUrl: z.string().optional(),
  }),
});
const equipeCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    members: z.array(z.object({
      name: z.string(),
      role: z.string(),
      location: z.string(),
      image: image(), 
    })),
  }),
});
const mission = defineCollection({
  type: "content",
  schema: ({ image }: SchemaContext) =>
    z.object({
      title: z.string(),
      intro: z.string(),
      sections: z.array(
        z.object({
          text: z.string(),
          layout: z.enum(["textLeft", "imageLeft"]).default("textLeft"),
          image: image(),
          alt: z.string(),
          imageHeightClass: z.string().optional(),
        })
      ),
      conclusion: z.string(),
    }),
});

const articlesCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    date: z.string(),
    image: image(),
    imageAlt: z.string(),
    description : z.string(),
  }),
});
const contactCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    image: image(),
    imageAlt: z.string(),
  }),
});

export const collections = { 
  mission, 
  events,
  'equipe': equipeCollection,
  articles: articlesCollection,
  publications: publicationsCollection,
  'contact': contactCollection,
};
