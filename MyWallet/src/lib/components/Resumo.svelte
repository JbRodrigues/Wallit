<script>
    import {
        saldo,
        totalReceitas,
        totalDespesas,
    } from "$lib/stores/transacoes";
    import { formatarMoeda } from "$lib/utils/format";
</script>

<div class="resumo">
    <div class="card saldo">
        <p class="label">Saldo Total</p>
        <p
            class="valor"
            class:positivo={$saldo >= 0}
            class:negativo={$saldo < 0}
        >
            {formatarMoeda($saldo)}
        </p>
    </div>

    <div class="card receitas">
        <p class="label">Receitas</p>
        <p class="valor positivo">{formatarMoeda($totalReceitas)}</p>
    </div>

    <div class="card despesas">
        <p class="label">Despesas</p>
        <p class="valor negativo">{formatarMoeda($totalDespesas)}</p>
    </div>
</div>

<style>
    .resumo {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1rem;
        margin-bottom: 2rem;
    }

    .card {
        background: white;
        border-radius: 12px;
        padding: 1.5rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .label {
        color: #666;
        font-size: 0.9rem;
        margin: 0 0 0.5rem 0;
    }

    .valor {
        font-size: 1.8rem;
        font-weight: bold;
        margin: 0;
    }

    .positivo {
        color: #10b981;
    }

    .negativo {
        color: #ef4444;
    }
</style>
