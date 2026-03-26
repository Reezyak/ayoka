// src/lib/supabaseServer.ts
import { createServerClient } from "@supabase/ssr";
import { cookies as nextCookies } from "next/headers";

export async function getSupabaseServer() {
  const cookieStore = await nextCookies(); // await if Promise, no await if sync

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name: string) => cookieStore.get(name)?.value ?? null,
        set: () => {},    // Supabase handles this internally
        remove: () => {}, // Supabase handles this internally
      },
    }
  );
}


