<script>
    let transacoes = [];

    let descricao = "";
    let valor = "";
    let tipo = "despesa";
    let filtro = "todas";
    let categ = "all";

    // Cálculos reativos (a mágica do Svelte!)
    $: saldo = transacoes.reduce((acc, t) => {
        return t.tipo === "receita" ? acc + t.valor : acc - t.valor;
    }, 0);

    $: totalReceitas = transacoes
        .filter((t) => t.tipo === "receita")
        .reduce((acc, t) => acc + t.valor, 0);

    $: totalDespesas = transacoes
        .filter((t) => t.tipo === "despesa")
        .reduce((acc, t) => acc + t.valor, 0);

    $: transacoesFiltradas =
        filtro === "todas"
            ? transacoes
            : transacoes.filter((t) => t.tipo === filtro);

    function adicionarTransacao() {
        if (!descricao.trim() || !valor || parseFloat(valor) <= 0) {
            alert("Por favor, preencha todos os campos corretamente");
            return;
        }

        const novaTransacao = {
            id: Date.now(),
            descricao: descricao.trim(),
            valor: parseFloat(valor),
            tipo,
            categ,
            data: new Date().toISOString().split("T")[0],
        };

        transacoes = [novaTransacao, ...transacoes];
        descricao = "";
        valor = "";
    }

    function deletarTransacao(id) {
        transacoes = transacoes.filter((t) => t.id !== id);
    }

    function formatarMoeda(valor) {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(valor);
    }

    function formatarData(dataStr) {
        const data = new Date(dataStr + "T00:00:00");
        return data.toLocaleDateString("pt-BR");
    }
</script>

<main>
    <header>
        <h1>💰 Controle de Gastos</h1>
        <p>Gerencie suas finanças de forma simples</p>
    </header>

    <!-- Cards de Resumo -->
    <div class="resumo">
        <div class="card saldo">
            <p class="label">Saldo Total</p>
            <p
                class="valor"
                class:positivo={saldo >= 0}
                class:negativo={saldo < 0}
            >
                {formatarMoeda(saldo)}
            </p>
        </div>

        <div class="card receitas">
            <p class="label">Receitas</p>
            <p class="valor positivo">{formatarMoeda(totalReceitas)}</p>
        </div>

        <div class="card despesas">
            <p class="label">Despesas</p>
            <p class="valor negativo">{formatarMoeda(totalDespesas)}</p>
        </div>
    </div>

    <!-- Formulário -->
    <div class="formulario">
        <h2>Nova Transação</h2>

        <div class="campo">
            <label for="descricao">Descrição</label>
            <input
                id="descricao"
                type="text"
                bind:value={descricao}
                placeholder="Ex: Supermercado, Salário..."
                on:keypress={(e) => e.key === "Enter" && adicionarTransacao()}
            />
        </div>

            <div class="campo">
                <label for="tipo">Categoria</label>
                <select id="categ" bind:value={categ}>
                    <option value="all">Geral</option>
                    <option value="gym">Academia</option>
                    <option value="health">Saúde</option>
                    <option value="food">Alimentação</option>
                    <option value="transport">Transporte</option>
                    <option value="leisure">Lazer</option>
                    <option value="outcome-fixed">Despesa Fixa</option>
                    <option value="income-fixed">Receita Fixa</option>
                </select>
            </div>


        <div class="campos-linha">
            <div class="campo">
                <label for="valor">Valor (R$)</label>
                <input
                    id="valor"
                    type="number"
                    step="0.01"
                    bind:value={valor}
                    placeholder="0.00"
                    on:keypress={(e) =>
                        e.key === "Enter" && adicionarTransacao()}
                />
            </div>

            <div class="campo">
                <label for="tipo">Tipo</label>
                <select id="tipo" bind:value={tipo}>
                    <option value="despesa">Despesa</option>
                    <option value="receita">Receita</option>
                </select>
            </div>
        </div>

        <button on:click={adicionarTransacao}>Adicionar Transação</button>
    </div>

    <!-- Lista de Transações -->
    <div class="lista">
        <div class="lista-header">
            <h2>Transações</h2>
            <select bind:value={filtro}>
                <option value="todas">Todas</option>
                <option value="receita">Receitas</option>
                <option value="despesa">Despesas</option>
            </select>
        </div>

        {#if transacoesFiltradas.length === 0}
            <p class="vazio">Nenhuma transação encontrada</p>
        {:else}
            <div class="transacoes">
                {#each transacoesFiltradas as transacao (transacao.id)}
                    <div class="transacao {transacao.tipo}">
                        <div class="info">
                            <p class="descricao">{transacao.descricao}</p>
                            <p class="data">{formatarData(transacao.data)}</p>
                        </div>
                        <div class="acoes">
                            <p class="valor-transacao">
                                {transacao.tipo === "receita" ? "+" : "-"}
                                {formatarMoeda(transacao.valor)}
                            </p>
                            <button
                                class="btn-deletar"
                                on:click={() => deletarTransacao(transacao.id)}
                                aria-label="Deletar transação"
                            >
                                🗑️
                            </button>
                        </div>
                    </div>
                {/each}
            </div>
        {/if}
    </div>
</main>

<style>
    :global(body) {
        margin: 0;
        padding: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Oxygen, Ubuntu, Cantarell, sans-serif;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        min-height: 100vh;
    }

    main {
        max-width: 900px;
        margin: 0 auto;
        padding: 2rem 1rem;
    }

    header {
        text-align: center;
        color: white;
        margin-bottom: 2rem;
    }

    h1 {
        font-size: 2.5rem;
        margin: 0 0 0.5rem 0;
    }

    header p {
        margin: 0;
        opacity: 0.9;
    }

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

    @media (max-width: 768px) {
        .campos-linha {
            grid-template-columns: 1fr;
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
