/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Override the LeetCode stats API base URL (defaults to the public mirror). */
  readonly VITE_LEETCODE_API?: string;
}
