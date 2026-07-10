import fs from "fs";
import path from "path";
import { loadEnvConfig } from "@next/env";

let envLoaded = false;

function ensureServerEnv(): void {
  if (envLoaded || typeof window !== "undefined") return;
  loadEnvConfig(process.cwd());
  envLoaded = true;
}

function readEnvLocalSecret(): string | null {
  try {
    const file = path.join(process.cwd(), ".env.local");
    if (!fs.existsSync(file)) return null;
    const text = fs.readFileSync(file, "utf8");
    for (const line of text.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const match = trimmed.match(
        /^(?:export\s+)?(?:BASE44_SHARED_SECRET|GOLFCOACHOS_API_SECRET)=(.*)$/,
      );
      if (!match?.[1]) continue;
      const value = match[1].trim().replace(/^["']|["']$/g, "");
      return value || null;
    }
  } catch {
    // production uses platform env
  }
  return null;
}

/** Server-only — never import from client components. */
export function serverApiSecret(): string | null {
  ensureServerEnv();
  return (
    process.env.BASE44_SHARED_SECRET?.trim() ||
    process.env.GOLFCOACHOS_API_SECRET?.trim() ||
    readEnvLocalSecret() ||
    null
  );
}
