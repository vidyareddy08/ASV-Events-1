
'use server';

/**
 * @fileOverview A simple AI flow for answering questions about venues.
 *
 * - askVenueAssistant: A function that takes a user query and returns an AI-generated answer.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { venues } from '@/lib/venue-data';
import { concerts } from '@/lib/concert-data';
import { workshops } from '@/lib/workshop-data';
import { eventManagers } from '@/lib/event-manager-data';

const VenueAssistantInputSchema = z.object({
  query: z.string(),
});

export type VenueAssistantInput = z.infer<typeof VenueAssistantInputSchema>;

const venueContext = JSON.stringify(
  venues.map(v => ({
    name: v.name,
    location: v.location,
    hallType: v.hallType,
    baseCost: v.baseCost,
    supportedEvents: v.supportedEvents,
    capacity: (v as any).capacity,
  }))
);

const concertContext = JSON.stringify(
  concerts.map(c => ({
    name: c.name,
    artist: c.artist,
    date: c.date,
    venue: c.venue,
  }))
);

const workshopContext = JSON.stringify(
  workshops.map(w => ({
    title: w.title,
    instructor: w.instructor,
    date: w.date,
  }))
);

const eventManagerContext = JSON.stringify(
  eventManagers.map(em => ({
    name: em.name,
    specializations: em.specializations,
  }))
);

const faq = `
**Frequently Asked Questions (FAQ):**

*   **Q: What payment methods are accepted?**
    *   A: We accept all major Credit Cards, UPI, and Net Banking. You can select your preferred method during the final booking step.

*   **Q: Are there discounts for booking in advance?**
    *   A: Yes! We offer an "Early Bird" discount of 20% for bookings made over a month in advance, and a "Super Early Bird" discount of 30% for bookings made 2-12 months in advance.

*   **Q: Can I hire an event manager?**
    *   A: Absolutely. We have a team of professional event managers you can hire to ensure your event runs smoothly. You can select one during the booking process on the venue's detail page.

*   **Q: What is the booking process?**
    *   A: Find a venue you like, go to its page, select an available date, fill in your event details, choose a payment method, and confirm your booking. It's that simple!

*   **Q: What is your cancellation policy?**
    *   A: Bookings can be cancelled up to 14 days before the event date for a full refund. Please contact our support team to initiate a cancellation.
`;

const aboutUsContext = `
**About ASV Events:**

*   **History:** Founded in 2023, ASV Events started as a project to simplify finding the perfect spot for local events. We are passionate about connecting people with the best halls, lawns, and spaces our city has to offer.
*   **Vision:** Our vision is to be the go-to platform for booking event venues in Hyderabad. We aim to provide a seamless booking experience that makes event planning a pleasure, not a chore.
`;

const careersContext = `
**Careers at ASV Events:**

We are currently hiring for the following roles:
*   **Senior Frontend Engineer:** Location: Hyderabad, IN. Package: ₹18-25 LPA.
*   **Business Development Manager:** Location: Hyderabad, IN. Package: ₹15-22 LPA + Incentives.
*   **Customer Support Specialist:** Location: Remote (Hyderabad-based). Package: ₹6-9 LPA.
Users interested in applying should visit the careers page on our website.
`;

const featuresContext = `
**Platform Features:**

*   **Simple Search & Filter:** Easily find the perfect venue with our intuitive search and location-based filters, designed specifically for Hyderabad.
*   **Instant Availability Check:** View real-time availability for venues with our clear and simple booking calendar. No more back-and-forth calls.
*   **Transparent Pricing:** Get instant cost estimates including all taxes. What you see is what you pay, with no hidden fees.
`;

const venueAssistantPrompt = ai.definePrompt({
    name: 'venueAssistantPrompt',
    input: { schema: VenueAssistantInputSchema },
    prompt: `You are a friendly and helpful AI assistant for 'ASV Events', a company that rents out event spaces and provides other services.
    Your goal is to answer user questions accurately and concisely based on the information provided below.
    If the user says 'hi' or a similar greeting, respond with a friendly welcome message.
    If a user asks for a venue suggestion, ask for the type of event and expected number of guests to provide a better recommendation.
    When providing venue details, always include the name, location, hall type, capacity, and base cost.
    Do not make up information. If the answer is not in the data, say that you don't have that information.
    Be friendly and professional.

    First, use the FAQ section to answer common questions. If the question is not in the FAQ, use the other provided data.

    ${faq}

    ${aboutUsContext}

    ${featuresContext}

    Here is the list of available venues. We have a total of ${venues.length} venues.
    ${venueContext}

    Here is the list of upcoming concerts:
    ${concertContext}

    Here is the list of available workshops:
    ${workshopContext}

    Here is our team of event managers:
    ${eventManagerContext}
    
    ${careersContext}

    User's question: {{{query}}}
    `,
});

const venueChatFlow = ai.defineFlow(
  {
    name: 'venueChatFlow',
    inputSchema: VenueAssistantInputSchema,
    outputSchema: z.string(),
  },
  async (input) => {
    const llmResponse = await venueAssistantPrompt(input);
    return llmResponse.text;
  }
);

export async function askVenueAssistant(input: VenueAssistantInput): Promise<string> {
    return await venueChatFlow(input);
}
