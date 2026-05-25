import { makeRouteHandler } from "@keystatic/next/route-handler"

import config, { showAdminUI } from "../../../../../keystatic.config"

export const { GET, POST } = (() => {
  const notFoundRouteHandler = () =>
    new Response(null, {
      status: 404,
    })

  if (!showAdminUI) {
    return { GET: notFoundRouteHandler, POST: notFoundRouteHandler }
  }

  return makeRouteHandler({ config })
})()
