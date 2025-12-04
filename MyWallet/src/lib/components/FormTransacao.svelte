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
            data: new Date().toISOString().split("T")[0],
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
    .formulario {
        background: white;
        border-radius: 12px;
        padding: 1.5rem;
        margin-bottom: 2rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .formulario h2 {
        margin: 0 0 1.5rem 0;
        color: #333;
    }

    .campo {
        margin-bottom: 1rem;
    }

    .campos-linha {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
    }

    label {
        display: block;
        margin-bottom: 0.5rem;
        color: #333;
        font-weight: 500;
        font-size: 0.9rem;
    }

    input,
    select {
        width: 100%;
        padding: 0.75rem;
        border: 2px solid #e5e7eb;
        border-radius: 8px;
        font-size: 1rem;
        transition: border-color 0.2s;
        box-sizing: border-box;
    }

    input:focus,
    select:focus {
        outline: none;
        border-color: #667eea;
    }

    button {
        width: 100%;
        padding: 0.875rem;
        background: #667eea;
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.2s;
    }

    button:hover {
        background: #5568d3;
    }

    @media (max-width: 768px) {
        .campos-linha {
            grid-template-columns: 1fr;
        }
    }
</style>
