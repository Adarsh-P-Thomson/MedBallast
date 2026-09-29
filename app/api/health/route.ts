import { getSupabaseConfig, hasSupabaseConfig } from "@/lib/supabase/public";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const noStoreHeaders = { "Cache-Control": "no-store" };

export async function GET() {
  const checkedAt = new Date().toISOString();

  if (!hasSupabaseConfig()) {
    return Response.json(
      {
        status: "not_configured",
        service: "supabase",
        checkedAt,
        checks: { environment: "missing" },
        message: "Add the Supabase URL and publishable key to the local environment.",
      },
      { status: 503, headers: noStoreHeaders },
    );
  }

  try {
    const { url, publishableKey } = getSupabaseConfig();
    const response = await fetch(`${url}/auth/v1/settings`, {
      headers: { apikey: publishableKey },
      cache: "no-store",
    });

    if (!response.ok) {
      return Response.json(
        {
          status: "error",
          service: "supabase",
          checkedAt,
          checks: { environment: "ok", authApi: "failed" },
          message: `Supabase Auth responded with HTTP ${response.status}.`,
        },
        { status: 503, headers: noStoreHeaders },
      );
    }

    return Response.json(
      {
        status: "ok",
        service: "supabase",
        checkedAt,
        checks: { environment: "ok", authApi: "ok", keyMode: "publishable" },
      },
      { headers: noStoreHeaders },
    );
  } catch (error) {
    return Response.json(
      {
        status: "error",
        service: "supabase",
        checkedAt,
        checks: { environment: "ok", authApi: "unreachable" },
        message: error instanceof Error ? error.message : "Supabase health check failed.",
      },
      { status: 503, headers: noStoreHeaders },
    );
  }
}
