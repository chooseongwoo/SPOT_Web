import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  let refresh_token: string | undefined;
  try {
    const body = await req.json();
    refresh_token = body.refresh_token;
  } catch {
    refresh_token = undefined;
  }

  if (!refresh_token) {
    return NextResponse.json({ error: "missing token" }, { status: 400 });
  }

  const { data, error } = await supabase.auth.refreshSession({ refresh_token });
  if (error || !data.session) {
    return NextResponse.json({ error: error?.message }, { status: 401 });
  }

  const { access_token, refresh_token: newRefresh } = data.session;
  return NextResponse.json({ access_token, refresh_token: newRefresh });
}
