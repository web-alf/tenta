import { defineCollection } from 'astro:content';
import { z } from 'zod';
import { glob, file } from 'astro/loaders';

const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    title_en: z.string().optional(),
    titleAccent: z.string(),
    titleAccent_en: z.string().optional(),
    eyebrow: z.string(),
    eyebrow_en: z.string().optional(),
    desc: z.string(),
    desc_en: z.string().optional(),
    icon: z.enum(['web', 'google', 'meta', 'konsul']),
    features: z.array(z.object({
      icon: z.string().optional(),
      iconId: z.string().optional(),
      title: z.string(),
      desc: z.string(),
    })),
    features_en: z.array(z.object({
      icon: z.string().optional(),
      iconId: z.string().optional(),
      title: z.string(),
      desc: z.string(),
    })).optional(),
    plans: z.array(z.object({
      name: z.string(),
      tagline: z.string(),
      price: z.string(),
      unit: z.string(),
      featured: z.boolean().optional(),
      features: z.array(z.string()),
    })),
    plans_en: z.array(z.object({
      name: z.string(),
      tagline: z.string(),
      price: z.string(),
      unit: z.string(),
      featured: z.boolean().optional(),
      features: z.array(z.string()),
    })).optional(),
    process: z.array(z.object({ title: z.string(), desc: z.string() })),
    process_en: z.array(z.object({ title: z.string(), desc: z.string() })).optional(),
    faqs: z.array(z.object({ q: z.string(), a: z.string() })),
    faqs_en: z.array(z.object({ q: z.string(), a: z.string() })).optional(),
    seo: z.object({
      title: z.string(),
      title_en: z.string().optional(),
      description: z.string(),
      description_en: z.string().optional(),
    }),
  }),
});

const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/case-studies' }),
  schema: z.object({
    brand: z.string(),
    brand_en: z.string().optional(),
    metric: z.string(),
    metric_en: z.string().optional(),
    desc: z.string(),
    desc_en: z.string().optional(),
    tags: z.array(z.string()),
    tags_en: z.array(z.string()).optional(),
    industry: z.string().optional(),
    industry_en: z.string().optional(),
    period: z.string().optional(),
    period_en: z.string().optional(),
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
    text_en: z.string().optional(),
    name: z.string(),
    role: z.string(),
    role_en: z.string().optional(),
    initials: z.string(),
    avatar: z.string().optional(),
  }),
});

const faqs = defineCollection({
  loader: file('./src/content/faqs.json'),
  schema: z.object({
    id: z.string(),
    q: z.string(),
    q_en: z.string().optional(),
    a: z.string(),
    a_en: z.string().optional(),
  }),
});

const jobs = defineCollection({
  loader: file('./src/content/jobs.json'),
  schema: z.object({
    id: z.string(),
    slug: z.string(),
    title: z.string(),
    title_en: z.string().optional(),
    type: z.string(),
    type_en: z.string().optional(),
    location: z.string(),
    location_en: z.string().optional(),
    level: z.string(),
    tags: z.array(z.string()),
    summary: z.string(),
    summary_en: z.string().optional(),
    requirements: z.array(z.string()),
    requirements_en: z.array(z.string()).optional(),
  }),
});

export const collections = { services, caseStudies, testimonials, faqs, jobs };
