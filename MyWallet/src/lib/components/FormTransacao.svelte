<script>
    import { adicionarTransacao } from "$lib/stores/transacoes";

    let descricao = "";
    let valor = "";
    let tipo = "receita";
    let categ = "geral";

    // Categorias de despesas
    const categoriasGastos = [
        { value: "geral", label: "Geral" },
        { value: "alimentacao", label: "🍽️ Alimentação" },
        { value: "moradia", label: "🏠 Moradia" },
        { value: "transporte", label: "🚗 Transporte" },
        { value: "saude", label: "🏥 Saúde" },
        { value: "educacao", label: "📚 Educação" },
        { value: "lazer", label: "🎮 Lazer" },
        { value: "vestuario", label: "👔 Vestuário" },
        { value: "contas", label: "💡 Contas" },
        { value: "tecnologia", label: "💻 Tecnologia" },
        { value: "cuidados_pessoais", label: "💇 Cuidados Pessoais" },
        { value: "pets", label: "🐕 Pets" },
        { value: "investimentos", label: "📈 Investimentos" },
        { value: "impostos", label: "📋 Impostos" },
        { value: "seguros", label: "🛡️ Seguros" },
        { value: "dividas", label: "💳 Dívidas" },
        { value: "doacao", label: "🤝 Doação" },
        { value: "outros", label: "📦 Outros" },
    ];

    // Categorias de receitas
    const categoriasReceitas = [
        { value: "geral", label: "Geral" },
        { value: "salario", label: "💼 Salário" },
        { value: "freelance", label: "🎨 Freelance" },
        { value: "negocios", label: "🏢 Negócios" },
        { value: "investimentos_renda", label: "📊 Investimentos" },
        { value: "pensao", label: "👴 Pensão/Aposentadoria" },
        { value: "restituicao", label: "💰 Restituição" },
        { value: "premios", label: "🎁 Prêmios" },
        { value: "venda_bens", label: "🏷️ Venda de Bens" },
        { value: "outros_renda", label: "➕ Outros" },
    ];

    $: categoriasDisponiveis =
        tipo === "despesa" ? categoriasGastos : categoriasReceitas;

    // Resetar categoria quando mudar o tipo
    $: if (tipo) {
        categ = "geral";
    }

    function enviar() {
        if (!valor || parseFloat(valor) <= 0) {
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
    <div class="header">
        <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
        </svg>
        <h1>Nova Transação</h1>
    </div>

    <div class="campos-linha">
        <div class="campo">
            <!-- svelte-ignore a11y_label_has_associated_control -->
            <label>Tipo</label>
            <select bind:value={tipo}>
                <option value="receita">💰 Receita</option>
                <option value="despesa">💸 Despesa</option>
            </select>
        </div>

        <div class="campo">
            <!-- svelte-ignore a11y_label_has_associated_control -->
            <label>Valor (R$)</label>
            <input
                type="number"
                bind:value={valor}
                step="0.01"
                placeholder="0,00"
            />
        </div>
    </div>

    <!-- categoria -->
    <div class="campo">
        <!-- svelte-ignore a11y_label_has_associated_control -->
        <label>Categoria</label>
        <select bind:value={categ}>
            {#each categoriasDisponiveis as categoria}
                <option value={categoria.value}>{categoria.label}</option>
            {/each}
        </select>
    </div>

    <div class="campo">
        <!-- svelte-ignore a11y_label_has_associated_control -->
        <label>Descrição (opcional)</label>
        <input
            type="text"
            placeholder="Ex: Supermercado, Salário..."
            bind:value={descricao}
        />
    </div>

    <button
        on:click={enviar}
        class:despesa={tipo === "despesa"}
        class:receita={tipo === "receita"}
    >
        {tipo === "despesa" ? "Adicionar Despesa" : "Adicionar Receita"}
    </button>
</div>

<style>
    .header {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 1.5rem;
    }

    .icon {
        width: 2.5rem;
        height: 2.5rem;
        color: #4f46e5;
        margin-right: 0.75rem;
    }

    h1 {
        font-size: 1.875rem;
        font-weight: bold;
        color: #1f2937;
        margin: 0;
    }
    .formulario {
        background: white;
        border-radius: 12px;
        padding: 1.5rem;
        margin-bottom: 2rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;
    }

    button.despesa {
        background: #ef4444;
    }

    button.despesa:hover {
        background: #dc2626;
    }

    button.receita {
        background: #10b981;
    }

    button.receita:hover {
        background: #059669;
    }

    @media (max-width: 768px) {
        .campos-linha {
            grid-template-columns: 1fr;
        }
        h1 {
            font-size: 1.5rem;
        }

        .icon {
            width: 2rem;
            height: 2rem;
        }
    }
</style>
