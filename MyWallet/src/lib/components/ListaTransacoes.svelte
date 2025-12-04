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
    /* copie estilo */
</style>
