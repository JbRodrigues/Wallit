<script>
    import { saldo, totalReceitas, totalDespesas } from "$lib/stores/transacoes";
    import { formatarMoeda } from "$lib/utils/format";
</script>

<div class="resumo">
    <div class="card saldo">
        <p class="label">Saldo Total</p>
        <p class="valor" class:positivo={$saldo >= 0} class:negativo={$saldo < 0}>
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
    /* pode copiar o estilo original */
</style>
