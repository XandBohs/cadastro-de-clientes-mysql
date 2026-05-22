import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import type { ClienteInput } from "@/lib/types";

type SearchParams = {
  nome?: string;
  email?: string;
  telefone?: string;
  df?: string;
  dt?: string;
};

function buildQuery(searchParams: URLSearchParams) {
  const nome = searchParams.get("nome")?.trim() ?? "";
  const email = searchParams.get("email")?.trim() ?? "";
  const telefone = searchParams.get("telefone")?.trim() ?? "";
  const df = searchParams.get("df")?.trim() ?? "";
  const dt = searchParams.get("dt")?.trim() ?? "";

  return {
    nome,
    email,
    telefone,
    df,
    dt
  } satisfies SearchParams;
}

export async function GET(request: Request) {
  try {
    const supabase = createSupabaseServerClient();
    const { searchParams } = new URL(request.url);
    const filters = buildQuery(searchParams);

    let query = supabase.from("dadoscliente").select("id,nome,email,telefone,dt").order("id", {
      ascending: false
    });

    if (filters.nome) {
      query = query.ilike("nome", `%${filters.nome}%`);
    }

    if (filters.email) {
      query = query.ilike("email", `%${filters.email}%`);
    }

    if (filters.telefone) {
      query = query.ilike("telefone", `%${filters.telefone}%`);
    }

    if (filters.df) {
      query = query.gte("dt", `${filters.df}T00:00:00`);
    }

    if (filters.dt) {
      query = query.lte("dt", `${filters.dt}T23:59:59.999`);
    }

    const { data, error } = await query.limit(500);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erro inesperado.";
    const status = message.includes("not configured") ? 503 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}

export async function POST(request: Request) {
  try {
    const supabase = createSupabaseServerClient();
    const body = (await request.json()) as Partial<ClienteInput>;
    const nome = body.nome?.trim();
    const email = body.email?.trim();
    const telefone = body.telefone?.trim();

    if (!nome || !email || !telefone) {
      return NextResponse.json(
        { error: "Os campos nome, email e telefone são obrigatórios." },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("dadoscliente")
      .insert({ nome, email, telefone })
      .select("id,nome,email,telefone,dt")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erro inesperado.";
    const status = message.includes("not configured") ? 503 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
