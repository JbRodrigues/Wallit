<script>
    import { transacoes } from "$lib/stores/transacoes";
    import TransacaoItem from "./TransacaoItem.svelte";

    let filtro = "todas";

    $: filtradas =
        filtro === "todas"
            ? $transacoes
            : $transacoes.filter((t) => t.tipo === filtro);
</script>

<div class="lista">
    <div class="lista-header">
        <div class="transactions-header">
            <svg
                class="icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
            </svg>
            <h2>Transações</h2>
        </div>
        <select bind:value={filtro}>
            <option value="todas">Todas</option>
            <option value="receita">Receitas</option>
            <option value="despesa">Despesas</option>
        </select>
    </div>

    {#if filtradas.length === 0}
        <p class="vazio">Nenhuma transação encontrada</p>
    {:else}
        <div class="transacoes">
            {#each filtradas as t (t.id)}
                <TransacaoItem {t} />
            {/each}
        </div>
    {/if}
</div>

<style>
    .transactions-header {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 1.5rem;
        padding: 1rem 0;
    }

    .icon {
        width: 2rem;
        height: 2rem;
        color: #4f46e5;
        margin-right: 0.75rem;
    }

    h2 {
        font-size: 1.5rem;
        font-weight: bold;
        color: #1f2937;
        margin: 0;
    }
    .lista {
        background: white;
        border-radius: 12px;
        padding: 1.5rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .lista-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
    }

    .lista-header h2 {
        margin: 0;
        color: #333;
    }

    .lista-header select {
        width: auto;
        padding: 0.5rem 1rem;
    }

    .vazio {
        text-align: center;
        color: #999;
        padding: 2rem;
    }

    .transacoes {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }

    select {
        width: 100%;
        padding: 0.75rem;
        border: 2px solid #e5e7eb;
        border-radius: 8px;
        font-size: 1rem;
        transition: border-color 0.2s;
        box-sizing: border-box;
    }
    select:focus {
        outline: none;
        border-color: #667eea;
    }

    @media (max-width: 768px) {
        .transactions-header {
            margin-bottom: 1rem;
        }

        h2 {
            font-size: 1.25rem;
        }

        .icon {
            width: 1.75rem;
            height: 1.75rem;
        }
        .lista-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
        }

        .lista-header select {
            width: 100%;
        }
    }
</style>
