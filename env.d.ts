/// <reference types="@cloudflare/workers-types" />

import type { Runtime } from "@astrojs/cloudflare";

declare namespace App {
  interface Locals {
    runtime: Runtime;
  }
}
