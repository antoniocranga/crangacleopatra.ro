import createMDX from "@next/mdx"

const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-math"],
    rehypePlugins: [["rehype-katex", { strict: false }]],
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
}

export default withMDX(nextConfig)
