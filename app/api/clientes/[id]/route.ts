import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import type { ClienteInput } from "@/lib/types";

type Params = {
  params: {
    id: string;
  };
};

export async function PUT(request: Request, { params }: Params) {
  try {
    const { id } = params;
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
      .update({ nome, email, telefone })
      .eq("id", Number(id))
      .select("id,nome,email,telefone,dt")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erro inesperado.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: Params) {
  try {
    const { id } = params;
    const supabase = createSupabaseServerClient();
    const { error } = await supabase.from("dadoscliente").delete().eq("id", Number(id));

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erro inesperado.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
