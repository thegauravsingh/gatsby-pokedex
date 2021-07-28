/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

// You can delete this file if you're not using it
import React from "react"
import { DarkModeState } from "./src/components/UI/ThemeHandler"
import Layout from "./src/components/UI/Layout"

export function wrapPageElement({ element, props }) {
  return <Layout {...props}>{element}</Layout>
}

export function wrapRootElement({ element, props }) {
  return <DarkModeState {...props}>{element}</DarkModeState>
}
