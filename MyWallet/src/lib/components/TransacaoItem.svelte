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
            {t.tipo === "receita" ? "+" : "-"}
            {formatarMoeda(t.valor)}
        </p>
        <button class="btn-deletar" on:click={() => deletarTransacao(t.id)}
            >🗑️</button
        >
    </div>
</div>

<style>
    .transacao {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        border-radius: 8px;
        border-left: 4px solid;
    }

    .transacao.receita {
        background: #f0fdf4;
        border-color: #10b981;
    }

    .transacao.despesa {
        background: #fef2f2;
        border-color: #ef4444;
    }

    .info {
        flex: 1;
    }

    .descricao {
        margin: 0 0 0.25rem 0;
        font-weight: 600;
        color: #333;
    }

    .categ {
        margin: 0 0 0.25rem 0;
        font-size: 0.9rem;
        color: #555;
    }

    .data {
        margin: 0;
        font-size: 0.85rem;
        color: #666;
    }

    .acoes {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .valor-transacao {
        font-size: 1.1rem;
        font-weight: bold;
        margin: 0;
    }

    .transacao.receita .valor-transacao {
        color: #10b981;
    }

    .transacao.despesa .valor-transacao {
        color: #ef4444;
    }

    .btn-deletar {
        width: auto;
        padding: 0.5rem;
        background: transparent;
        border: none;
        font-size: 1.2rem;
        cursor: pointer;
        transition: transform 0.2s;
    }

    .btn-deletar:hover {
        transform: scale(1.2);
    }
</style>
