import type { APIRoute } from "astro";



import event1Img from "../../../assets/events/event1.jpg";
import event2Img from "../../../assets/events/event2.jpg";
import event3Img from "../../../assets/events/event3.jpg";
import event4Img from "../../../assets/events/event4.jpg";
import event5Img from "../../../assets/events/event5.jpg";
import event6Img from "../../../assets/events/event6.jpg";

const eventImages: Record<string, string> = {
  "musica-mundo": event1Img,
  "architecture-mutation": event2Img,
  "dia-internacional": event3Img,
  "invitation-ceremonie-signature": event4Img,
  "rencontres-by-me": event5Img,
  "la-diplomatie-culturelle": event6Img,
};

export const GET: APIRoute = async ({ params, site }) => {
  const slug = params.slug;

  if (!slug) {
    return new Response("Not Found", { status: 404 });
  }

  const image = eventImages[slug];
  if (!image) {
    return new Response("Not Found", { status: 404 });
  }

  const ogUrl = new URL(image, site).href;
  return Response.redirect(ogUrl, 302);
};