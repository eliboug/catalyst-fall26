import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// One file per participant: members/<netid>.json, with the photo next to it
// as members/<netid>.jpg (or .png). Files starting with "_" are templates.
const members = defineCollection({
  loader: glob({ pattern: ['*.json', '!_*.json'], base: './members' }),
  schema: z.object({
    name: z.string().min(1).max(60),
    bio: z.string().min(1).max(120),
    github: z.string().regex(/^[A-Za-z0-9-]{1,39}$/).optional(),
    website: z.string().url().optional(),
    // Set by leads only. Participants leave it out.
    role: z.enum(['Lead', 'Instructor']).optional(),
  }),
});

export const collections = { members };
