import { defineCollection } from 'astro:content';
import { z } from 'zod';
import { glob, file } from 'astro/loaders';

const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    titleAccent: z.string(),
    eyebrow: z.string(),
    desc: z.string(),
    icon: z.enum(['web', 'google', 'meta', 'konsul']),
    features: z.array(z.object({
      icon: z.string(),
      title: z.string(),
      desc: z.string(),
    })),
    plans: z.array(z.object({
      name: z.string(),
      tagline: z.string(),
      price: z.string(),
      unit: z.string(),
      featured: z.boolean().optional(),
      features: z.array(z.string()),
    })),
    process: z.array(z.object({ title: z.string(), desc: z.string() })),
    faqs: z.array(z.object({ q: z.string(), a: z.string() })),
    seo: z.object({
      title: z.string(),
      description: z.string(),
    }),
  }),
});

const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/case-studies' }),
  schema: z.object({
    brand: z.string(),
    metric: z.string(),
    desc: z.string(),
    tags: z.array(z.string()),
    industry: z.string().optional(),
    period: z.string().optional(),
    cover: z.string().optional(),
    publishDate: z.coerce.date(),
  }),
});

const testimonials = defineCollection({
  loader: file('./src/content/testimonials.json'),
  schema: z.object({
    id: z.string(),
    stars: z.number().min(1).max(5),
    text: z.string(),
    name: z.string(),
    role: z.string(),
    initials: z.string(),
    avatar: z.string().optional(),
  }),
});

const faqs = defineCollection({
  loader: file('./src/content/faqs.json'),
  schema: z.object({
    id: z.string(),
    q: z.string(),
    a: z.string(),
  }),
});

const jobs = defineCollection({
  loader: file('./src/content/jobs.json'),
  schema: z.object({
    id: z.string(),
    slug: z.string(),
    title: z.string(),
    type: z.string(),
    location: z.string(),
    level: z.string(),
    tags: z.array(z.string()),
    summary: z.string(),
    requirements: z.array(z.string()),
  }),
});

export const collections = { services, caseStudies, testimonials, faqs, jobs };
