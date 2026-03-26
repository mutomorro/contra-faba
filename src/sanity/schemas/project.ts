import { defineField, defineType } from "sanity";

export default defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "clientType",
      title: "Client Type",
      type: "string",
      options: {
        list: [
          { title: "Architects", value: "architects" },
          { title: "Contractors", value: "contractors" },
          { title: "Homeowners", value: "homeowners" },
        ],
      },
    }),
    defineField({
      name: "projectType",
      title: "Project Type",
      type: "string",
      description: "e.g. Family Home, Spa, Couples Retreat",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      description: "e.g. London, Glasgow",
    }),
    defineField({
      name: "budget",
      title: "Budget",
      type: "string",
      description: "e.g. £1.5m, £900k",
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      description: "e.g. Pre/Post Contract QS/CA",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Pre-construction", value: "pre-construction" },
          { title: "In Progress", value: "in-progress" },
          { title: "Completed", value: "completed" },
        ],
      },
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "featuredImage",
      title: "Featured Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "publishedDate",
      title: "Published Date",
      type: "date",
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "status",
      media: "featuredImage",
    },
  },
});
