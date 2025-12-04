<script>
    import { adicionarTransacao } from "$lib/stores/transacoes";

    let descricao = "";
    let valor = "";
    let tipo = "despesa";
    let categ = "geral";

    function enviar() {
        if (!descricao.trim() || !valor || parseFloat(valor) <= 0) {
            alert("Preencha corretamente!");
            return;
        }

        adicionarTransacao({
            id: Date.now(),
            descricao: descricao.trim(),
            valor: parseFloat(valor),
            tipo,
            categ,
            data: new Date().toISOString().split("T")[0]
        });

        descricao = "";
        valor = "";
    }
</script>

<div class="formulario">
    <h2>Nova Transação</h2>

    <!-- categoria -->
    <div class="campo">
        <label>Categoria</label>
        <select bind:value={categ}>
            <option value="geral">Geral</option>
            <option value="academia">Academia</option>
            <option value="saude">Saúde</option>
            <option value="alimentacao">Alimentação</option>
            <option value="transporte">Transporte</option>
            <option value="lazer">Lazer</option>
            <option value="despesa-fixa">Despesa Fixa</option>
            <option value="receita-fixa">Receita Fixa</option>
        </select>
    </div>

    <div class="campos-linha">
        <div class="campo">
            <label>Valor (R$)</label>
            <input type="number" bind:value={valor} step="0.01" />
        </div>

        <div class="campo">
            <label>Tipo</label>
            <select bind:value={tipo}>
                <option value="despesa">Despesa</option>
                <option value="receita">Receita</option>
            </select>
        </div>
    </div>

    <div class="campo">
        <label>Descrição</label>
        <input type="text" bind:value={descricao} />
    </div>

    <button on:click={enviar}>Adicionar Transação</button>
</div>

<style>
    /* copie o estilo do original */
</style>
