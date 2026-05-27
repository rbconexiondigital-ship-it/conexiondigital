import path from "path";
import { fileURLToPath } from "url";

/** @type {import('next').NextConfig} */

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

// Project Pages: https://<user>.github.io/<repo>/
// Set BASE_PATH=/your-repo when building locally to match production.
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const basePath =
  process.env.BASE_PATH ?? (repoName ? `/${repoName}` : "");

const nextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  outputFileTracingRoot: projectRoot,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
