
'use server';

/**
 * @fileOverview A simple AI flow for answering questions about venues.
 *
 * - askVenueAssistant: A function that takes a user query and returns an AI-generated answer.
 * - VenueAssistantInput: The Zod schema for the input.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { venues } from '@/lib/venue-data';

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

const venueAssistantPrompt = ai.definePrompt({
    name: 'venueAssistantPrompt',
    input: { schema: VenueAssistantInputSchema },
    prompt: `You are a friendly and helpful AI assistant for 'Hyderabad Venues', a company that rents out event spaces.
    Your goal is to answer user questions accurately and concisely.
    
    First, use the FAQ section to answer common questions. If the user's question is not in the FAQ, use the provided venue data.
    Do not make up information. If the answer is not in the data, say that you don't have that information.
    Be friendly and professional.

    ${faq}

    Here is the list of available venues:
    ${venueContext}

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
    const { text } = await ai.generate({
        prompt: venueAssistantPrompt.prompt,
        input: input,
        model: 'googleai/gemini-2.5-flash',
    });
    return text;
  }
);

export async function askVenueAssistant(input: VenueAssistantInput): Promise<string> {
    return await venueChatFlow(input);
}
