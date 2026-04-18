import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const projectId = process.env.REACT_APP_SANITY_PROJECT_ID;
const dataset = process.env.REACT_APP_SANITY_DATASET || "production";
const apiVersion = process.env.REACT_APP_SANITY_API_VERSION || "2024-01-01";
const configured = Boolean(projectId);

const client = configured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
    })
  : null;

const builder = client ? imageUrlBuilder(client) : null;

export function isSanityConfigured() {
  return Boolean(client);
}

export function sanityImage(source, options = {}) {
  if (!builder || !source) return null;

  let image = builder.image(source);

  if (options.width) image = image.width(options.width);
  if (options.height) image = image.height(options.height);
  if (options.fit) image = image.fit(options.fit);

  return image.auto("format").url();
}

export async function sanityFetch(query, params = {}, fallback = null) {
  if (!client) return fallback;

  try {
    const data = await client.fetch(query, params);
    return data ?? fallback;
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      // Keep the app resilient when Sanity is misconfigured or offline.
      console.warn("Sanity fetch failed:", error);
    }
    return fallback;
  }
}

export function splitHeadline(text) {
  if (!text) return "";
  if (text.includes("\n")) return text;

  const words = text.trim().split(/\s+/);
  if (words.length <= 1) return text;
  if (words.length === 2) return `${words[0]}\n${words[1]}`;

  const splitIndex = Math.ceil(words.length / 2);
  return `${words.slice(0, splitIndex).join(" ")}\n${words.slice(splitIndex).join(" ")}`;
}

