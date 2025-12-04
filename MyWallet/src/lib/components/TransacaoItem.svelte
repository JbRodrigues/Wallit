<script>
    export let t;
    import { deletarTransacao } from "$lib/stores/transacoes";
    import { formatarMoeda, formatarData } from "$lib/utils/format";
</script>

<div class="transacao {t.tipo}">
    <div class="info">
        <p class="descricao">{t.descricao}</p>
        <p class="categ">{t.categ}</p>
        <p class="data">{formatarData(t.data)}</p>
    </div>

    <div class="acoes">
        <p class="valor-transacao">
            {t.tipo === "receita" ? "+" : "-"} {formatarMoeda(t.valor)}
        </p>
        <button class="btn-deletar" on:click={() => deletarTransacao(t.id)}>🗑️</button>
    </div>
</div>

<style>
    /* copie o estilo */
</style>
