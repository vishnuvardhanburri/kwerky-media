import { createClient as createPreviewClient } from "@sanity/preview-kit/client";
import imageUrlBuilder from "@sanity/image-url";

const projectId = process.env.REACT_APP_SANITY_PROJECT_ID || process.env.VITE_SANITY_PROJECT_ID;
const dataset = process.env.REACT_APP_SANITY_DATASET || "production";
const apiVersion = process.env.REACT_APP_SANITY_API_VERSION || "2024-01-01";
const token = process.env.REACT_APP_SANITY_API_TOKEN || process.env.VITE_SANITY_API_TOKEN || "";
const previewEnabled = typeof window !== "undefined" && window.location.search.includes("preview=true");
const configured = Boolean(projectId);

const baseClient = configured
  ? createPreviewClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
    })
  : null;

const previewClient = configured && token
  ? baseClient.withConfig({
      token,
      useCdn: false,
      perspective: "drafts",
      ignoreBrowserTokenWarning: true,
    })
  : baseClient;

const builder = baseClient ? imageUrlBuilder(baseClient) : null;

export const sanityClient = previewEnabled && previewClient ? previewClient : baseClient;
export const sanityToken = token;
export const isPreviewMode = previewEnabled && Boolean(token);

export function isSanityConfigured() {
  return Boolean(baseClient);
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
  if (!sanityClient) return fallback;

  try {
    const data = await sanityClient.fetch(query, params);
    return data ?? fallback;
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
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
