import "server-only"

import * as runtime from "react/jsx-runtime"
import { evaluate } from "@mdx-js/mdx"

import { AlertBox } from "@/components/mdx/alert-box"
import { GrilaTest, Intrebare } from "@/components/tests/grila-test"
import { PDFViewer } from "@/components/mdx/pdf-viewer"
import { Rezolvare } from "@/components/mdx/rezolvare"

const sharedMdxComponents = {
  Atenție: AlertBox,
  GrilaTest,
  Intrebare,
  PDFViewer,
  Rezolvare,
}

export const renderMdx = async (source: string) => {
  const remarkMathRemoveEscapes = () => async (tree: any) => {
    const { visit } = await import("unist-util-visit")
    
    const unescapeNode = (node: any) => {
      if (node && typeof node.value === "string") {
        node.value = node.value.replaceAll("\\{", "{").replaceAll("\\}", "}")
      }
      if (node && node.children) {
        node.children.forEach(unescapeNode)
      }
    }

    visit(tree, ["math", "inlineMath"], (node: any) => {
      if (typeof node.value === "string") {
        node.value = node.value.replaceAll("\\{", "{").replaceAll("\\}", "}")
      }
      if (node.data?.hChildren) {
        node.data.hChildren.forEach(unescapeNode)
      }
    })
  }

  const evaluated = await evaluate(source, {
    ...runtime,
    remarkPlugins: [
      await import("remark-math").then((mod) => mod.default),
      remarkMathRemoveEscapes
    ],
    rehypePlugins: [[await import("rehype-katex").then((mod) => mod.default), { strict: false }]],
  })

  const Content = evaluated.default

  return <Content components={sharedMdxComponents} />
}
