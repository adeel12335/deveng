/** @type {import('next').NextConfig} */
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const here = dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  // There is a lockfile further up the tree; pin the root to this project so
  // the build stops guessing.
  outputFileTracingRoot: here,
  // Static export: `npm run build` writes plain HTML into out/, which can be
  // uploaded to any host exactly like the old static site.
  output: 'export',
  // `next dev` and `next build` share .next by default; a production build run
  // while the dev server is up corrupts it. Keep them apart.
  distDir: process.env.NODE_ENV === 'development' ? '.next-dev' : '.next',
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
