
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

const venueAssistantPrompt = ai.definePrompt({
    name: 'venueAssistantPrompt',
    input: { schema: VenueAssistantInputSchema },
    prompt: `You are a helpful AI assistant for 'Hyderabad Venues', a company that rents out event spaces.
    Your goal is to answer user questions accurately and concisely based ONLY on the provided venue data.
    Do not make up information. If the answer is not in the data, say that you don't have that information.
    Be friendly and professional.

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
