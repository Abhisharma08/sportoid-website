import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
    // Suppress known cosmetic warning: Sanity's swr dependency has a
    // `react-server` export condition that Turbopack incorrectly traces
    // during SSR. The Studio still works fine in the browser.
    ignoreIssue: [
      {
        path: '**/sanity/lib/useActiveReleases*',
        title: "Export default doesn't exist in target module",
      },
      {
        path: '**/sanity/lib/validationUtils*',
        title: "Export default doesn't exist in target module",
      },
    ],
  },
};

export default nextConfig;
