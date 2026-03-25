import { client } from "./sanity";
import type { PortableTextBlock } from "next-sanity";

export interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  clientType: "architect" | "contractor" | "homeowner";
  summary: string;
  description: PortableTextBlock[];
  featuredImage: {
    asset: { _ref: string };
    alt?: string;
  };
  gallery?: {
    asset: { _ref: string };
    alt?: string;
  }[];
  publishedAt: string;
  featured: boolean;
}

export async function getProjects(): Promise<Project[]> {
  return client.fetch(
    `*[_type == "project"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      clientType,
      summary,
      featuredImage,
      publishedAt,
      featured
    }`
  );
}

export async function getFeaturedProjects(): Promise<Project[]> {
  return client.fetch(
    `*[_type == "project" && featured == true] | order(publishedAt desc)[0...3] {
      _id,
      title,
      slug,
      clientType,
      summary,
      featuredImage,
      publishedAt
    }`
  );
}

export async function getProject(slug: string): Promise<Project | null> {
  return client.fetch(
    `*[_type == "project" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      clientType,
      summary,
      description,
      featuredImage,
      gallery,
      publishedAt,
      featured
    }`,
    { slug }
  );
}

export async function getProjectSlugs(): Promise<{ slug: { current: string } }[]> {
  return client.fetch(
    `*[_type == "project"] { slug }`
  );
}
