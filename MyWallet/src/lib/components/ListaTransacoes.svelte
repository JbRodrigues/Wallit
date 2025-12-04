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
        <h2>Transações</h2>
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
