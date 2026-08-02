import type { Plugin } from 'vite'

export interface AeoPrerenderOptions {
  /** Routes to prerender, e.g. ['/', '/blog', '/blog/some-post']. */
  routes?: string[]
  /** Absolute site origin, used to emit rel=canonical. */
  origin?: string
  /** Selector for the app mount node. */
  rootSelector?: string
  /** How long to wait after networkidle before snapshotting. */
  settleMs?: number
  /**
   * Directory of generated JSON-LD, keyed by route slug. Only used for routes
   * that render no JSON-LD of their own.
   */
  jsonLdDir?: string | null
}

export function aeoPrerender(options?: AeoPrerenderOptions): Plugin
export default aeoPrerender
