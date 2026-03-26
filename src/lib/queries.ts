import { groq } from "next-sanity";

export const allProjectsQuery = groq`
  *[_type == "project"] | order(publishedDate desc) {
    _id,
    title,
    slug,
    clientType,
    projectType,
    location,
    budget,
    role,
    status,
    summary,
    featuredImage,
    publishedDate,
    featured
  }
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    clientType,
    projectType,
    location,
    budget,
    role,
    status,
    summary,
    description,
    featuredImage,
    gallery,
    publishedDate,
    featured
  }
`;

export const featuredProjectsQuery = groq`
  *[_type == "project" && featured == true] | order(publishedDate desc) [0...3] {
    _id,
    title,
    slug,
    clientType,
    projectType,
    location,
    budget,
    status,
    summary,
    featuredImage
  }
`;
