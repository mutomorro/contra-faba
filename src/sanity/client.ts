import { createClient } from "next-sanity";
import { projectId, dataset, apiVersion } from "@/lib/sanity";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});
