import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const redirectUrl = request.nextUrl.clone();

  redirectUrl.pathname = "/workspace";
  redirectUrl.search = "";

  if (tokenHash && type) {
    const supabase = await createClient();
    const { error } = await supabase.auth.verifyOtp({ type, token_hash: tokenHash });
    if (!error) {
      redirectUrl.searchParams.set("verified", "1");
      return NextResponse.redirect(redirectUrl);
    }
  }

  redirectUrl.pathname = "/sign-in";
  redirectUrl.searchParams.set("error", "That confirmation link is invalid or has expired.");
  return NextResponse.redirect(redirectUrl);
}
