/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

// Bulma Framework global scss
import "./src/styles/mystyles.scss"

// Anchorate packe for in-page anchoes
import { anchorate } from 'anchorate';

// Apollo client
export { wrapRootElement } from './src/apollo/wrap-root-element';

// Anchorate for in-page anchors
export const onRouteUpdate = () => {
  anchorate()
}
