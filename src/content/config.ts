import { defineCollection, z, type SchemaContext } from "astro:content";

const pages = defineCollection({
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

const publications = defineCollection({
  type: "content",
  schema: ({ image }: SchemaContext) =>
    z.object({
      kind: z.enum(["post", "part"]).default("post"),
      title: z.string(),
      author: z.string().optional(),
      publishedAt: z.date().optional(),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      topText: z.string().optional(),
      bottomText: z.string().optional(),
      leadTitle: z.string().optional(),
      leadText: z.string().optional(),
      excerpt: z.string().optional(),
      parentSlug: z.string().optional(),
      order: z.number().optional(),
      inlineImage: image().optional(),
      inlineImageAlt: z.string().optional(),
    }),
});

// Collection EVENTS avec tous les champs nécessaires
const events = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.date(),
    datetime: z.string(),
    location: z.string(),
    description: z.string(),
    image: z.string(),
    month: z.string(),
    day: z.string(),
    year: z.string(),
    // ⭐ NOUVEAUX CHAMPS
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

export const collections = { 
  pages, 
  publications, 
  events 
};
