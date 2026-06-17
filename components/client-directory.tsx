"use client";

import type { ChangeEvent, FormEvent } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { Cliente, ClienteInput } from "@/lib/types";

type FormState = ClienteInput;
type Filters = ClienteInput & {
  df: string;
  dt: string;
};

const emptyForm: FormState = {
  nome: "",
  email: "",
  telefone: ""
};

const emptyFilters: Filters = {
  nome: "",
  email: "",
  telefone: "",
  df: "",
  dt: ""
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(value));
}

function toSearchParams(filters: Filters) {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(filters)) {
    if (value.trim()) {
      params.set(key, value.trim());
    }
  }

  return params;
}

export function ClientDirectory() {
  const [records, setRecords] = useState<Cliente[]>([]);
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const [draft, setDraft] = useState<FormState>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const total = records.length;
  const latest = useMemo(() => records[0]?.criado_em ?? null, [records]);

  const loadRecords = useCallback(
    async (nextFilters: Filters = filters) => {
      setIsLoading(true);
      setError(null);

      try {
        const params = toSearchParams(nextFilters);
        const queryString = params.toString();
        const response = await fetch(`/api/clientes${queryString ? `?${queryString}` : ""}`, {
          cache: "no-store"
        });

        const payload = (await response.json()) as
          | { data: Cliente[] }
          | { error: string };

        if (!response.ok) {
          throw new Error("error" in payload ? payload.error : "Falha ao carregar registros.");
        }

        setRecords("data" in payload ? payload.data : []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Falha ao carregar registros.");
      } finally {
        setIsLoading(false);
      }
    },
    [filters]
  );

  useEffect(() => {
    void loadRecords();
  }, [loadRecords]);

  function onFieldChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    target: "form" | "filters"
  ) {
    const { name, value } = event.target;

    if (target === "form") {
      const fieldName = name as keyof FormState;
      setDraft((current) => ({
        ...current,
        [fieldName]: value
      }));
      return;
    }

    const fieldName = name as keyof Filters;
    setFilters((current) => ({
      ...current,
      [fieldName]: value
    }));
  }

  function startEdit(record: Cliente) {
    setEditingId(record.id);
    setDraft({
      nome: record.nome,
      email: record.email,
      telefone: record.telefone
    });
    setNotice(`Editando o cliente #${record.id}.`);
  }

  function resetForm() {
    setEditingId(null);
    setDraft(emptyForm);
    setNotice(null);
  }

  function resetFormState() {
    setEditingId(null);
    setDraft(emptyForm);
  }

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setError(null);
    setNotice(null);

    try {
      const payload = {
        nome: draft.nome.trim(),
        email: draft.email.trim(),
        telefone: draft.telefone.trim()
      };

      if (!payload.nome || !payload.email || !payload.telefone) {
        throw new Error("Preencha nome, email e telefone.");
      }

      const response = await fetch(editingId ? `/api/clientes/${editingId}` : "/api/clientes", {
        method: editingId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const body = (await response.json()) as { data?: Cliente; error?: string };

      if (!response.ok) {
        throw new Error(body.error ?? "Falha ao salvar registro.");
      }

      const successMessage = editingId
        ? "Cliente atualizado com sucesso."
        : "Cliente cadastrado com sucesso.";
      resetFormState();
      await loadRecords();
      setNotice(successMessage);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao salvar registro.");
    } finally {
      setIsSaving(false);
    }
  }

  async function removeRecord(id: number) {
    const confirmed = window.confirm(`Remover o cliente #${id}?`);
    if (!confirmed) {
      return;
    }

    setIsSaving(true);
    setError(null);
    setNotice(null);

    try {
      const response = await fetch(`/api/clientes/${id}`, {
        method: "DELETE"
      });

      const body = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(body.error ?? "Falha ao excluir registro.");
      }

      if (editingId === id) {
        resetFormState();
      }
      await loadRecords();
      setNotice("Cliente removido com sucesso.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao excluir registro.");
    } finally {
      setIsSaving(false);
    }
  }

  async function applyFilters(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await loadRecords(filters);
  }

  function clearFilters() {
    setFilters(emptyFilters);
    void loadRecords(emptyFilters);
  }

  return (
    <div className="app-shell">
      <div className="page-rings" aria-hidden="true" />

      <header className="topbar">
        <div className="brand-lockup">
          <span className="brand-kicker">Supabase + Vercel</span>
          <strong>Cadastro de clientes</strong>
        </div>
        <div className="topbar-note">
          CRUD público com banco em nuvem, deploy contínuo e interface responsiva.
        </div>
      </header>

      <header className="masthead">
        <section className="hero panel">
          <div className="eyebrow">Sistema de clientes</div>
          <h1>Uma base de dados limpa, rápida e pronta para uso público.</h1>
          <p>
            Aplicação Next.js hospedada na Vercel, com persistência no Supabase e operações
            completas de cadastro, edição, pesquisa e exclusão.
          </p>
          <div className="hero-meta">
            <span className="chip">Tabela: dadoscliente</span>
            <span className="chip">Campos: nome, email, telefone, criado_em</span>
            <span className="chip">CRUD completo</span>
          </div>
        </section>

        <aside className="status-panel panel sticky">
          <div className="panel-header compact">
            <div>
              <h2>Status</h2>
              <p>Indicadores rápidos da base carregada na interface.</p>
            </div>
          </div>
          <div className="status-grid">
            <div className="stat-card">
              <span>Clientes carregados</span>
              <strong>{total}</strong>
            </div>
            <div className="stat-card">
              <span>Registro em edição</span>
              <strong>{editingId ?? "—"}</strong>
            </div>
            <div className="stat-card">
              <span>Último registro exibido</span>
              <strong>{latest ? formatDate(latest) : "—"}</strong>
            </div>
          </div>
        </aside>
      </header>

      <section className="workspace">
        <article className="panel filter-panel">
          <div className="panel-header">
            <div>
              <h2>Filtros</h2>
              <p>Busca por nome, email, telefone e intervalo de data.</p>
            </div>
          </div>

          <form className="form-stack" onSubmit={applyFilters}>
            <div className="field-grid filters-grid">
              <div className="field">
                <label htmlFor="filter-nome">Nome</label>
                <input
                  id="filter-nome"
                  name="nome"
                  value={filters.nome}
                  onChange={(event) => onFieldChange(event, "filters")}
                  placeholder="Filtrar por nome"
                />
              </div>
              <div className="field">
                <label htmlFor="filter-email">Email</label>
                <input
                  id="filter-email"
                  name="email"
                  type="email"
                  value={filters.email}
                  onChange={(event) => onFieldChange(event, "filters")}
                  placeholder="Filtrar por email"
                />
              </div>
              <div className="field">
                <label htmlFor="filter-telefone">Telefone</label>
                <input
                  id="filter-telefone"
                  name="telefone"
                  value={filters.telefone}
                  onChange={(event) => onFieldChange(event, "filters")}
                  placeholder="Filtrar por telefone"
                />
              </div>
              <div className="field">
                <label htmlFor="filter-df">Data inicial</label>
                <input
                  id="filter-df"
                  name="df"
                  type="date"
                  value={filters.df}
                  onChange={(event) => onFieldChange(event, "filters")}
                />
              </div>
              <div className="field">
                <label htmlFor="filter-dt">Data final</label>
                <input
                  id="filter-dt"
                  name="dt"
                  type="date"
                  value={filters.dt}
                  onChange={(event) => onFieldChange(event, "filters")}
                />
              </div>
            </div>

            <div className="button-row">
              <button className="button primary" type="submit" disabled={isLoading || isSaving}>
                Pesquisar
              </button>
              <button
                className="button ghost"
                type="button"
                onClick={clearFilters}
                disabled={isLoading || isSaving}
              >
                Limpar filtros
              </button>
            </div>
          </form>
        </article>

        <article className="panel form-panel">
          <div className="panel-header">
            <div>
              <h2>Cadastro</h2>
              <p>{editingId ? `Atualizando o registro #${editingId}.` : "Novo cliente."}</p>
            </div>
          </div>

          <form className="form-stack" onSubmit={submitForm}>
            <div className="field">
              <label htmlFor="nome">Nome do cliente</label>
              <input
                id="nome"
                name="nome"
                value={draft.nome}
                onChange={(event) => onFieldChange(event, "form")}
                placeholder="Digite o nome"
                autoComplete="name"
              />
            </div>
            <div className="field">
              <label htmlFor="email">Email do cliente</label>
              <input
                id="email"
                name="email"
                type="email"
                value={draft.email}
                onChange={(event) => onFieldChange(event, "form")}
                placeholder="Digite o email"
                autoComplete="email"
              />
            </div>
            <div className="field">
              <label htmlFor="telefone">Telefone do cliente</label>
              <input
                id="telefone"
                name="telefone"
                value={draft.telefone}
                onChange={(event) => onFieldChange(event, "form")}
                placeholder="Digite o telefone"
                autoComplete="tel"
              />
            </div>

            <div className="button-row">
              <button className="button primary" type="submit" disabled={isLoading || isSaving}>
                {editingId ? "Atualizar cliente" : "Cadastrar cliente"}
              </button>
              <button
                className="button danger"
                type="button"
                onClick={resetForm}
                disabled={isLoading || isSaving}
              >
                Cancelar edição
              </button>
            </div>
          </form>
        </article>
      </section>

      <section className="panel records-panel">
        <div className="panel-header records-header">
          <div>
            <h2>Registros</h2>
            <p>Lista principal do CRUD, com edição e exclusão por linha.</p>
          </div>
          <div className="helper mono">
            {isLoading ? "Carregando dados..." : `${records.length} registro(s) visível(is)`}
          </div>
        </div>

        <div className="table-wrap">
          {error ? <div className="notice error">{error}</div> : null}
          {notice ? <div className="notice success">{notice}</div> : null}

          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Email</th>
                <th>Telefone</th>
                <th>Data do registro</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {!isLoading && records.length === 0 ? (
                <tr>
                  <td colSpan={6}>
                    <div className="empty-state">Nenhum registro encontrado.</div>
                  </td>
                </tr>
              ) : null}

              {records.map((record) => (
                <tr key={record.id}>
                  <td className="mono">{record.id}</td>
                  <td>{record.nome}</td>
                  <td>{record.email}</td>
                  <td>{record.telefone}</td>
                  <td>{formatDate(record.criado_em)}</td>
                  <td>
                    <div className="row-actions">
                      <button className="edit" type="button" onClick={() => startEdit(record)}>
                        Editar
                      </button>
                      <button className="delete" type="button" onClick={() => removeRecord(record.id)}>
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
