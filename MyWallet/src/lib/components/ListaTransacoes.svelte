<script>
    import { transacoes } from "$lib/stores/transacoes";
    import { TicketPlusIcon } from "lucide-svelte";
    import TransacaoItem from "./TransacaoItem.svelte";

    let filtro = "todas";
    let dataInicial = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        1,
    )
        .toISOString()
        .split("T")[0];
    let dataFinal = new Date().toISOString().split("T")[0];

    $: filtradas = $transacoes.filter((t) => {
        // Validação 1: Tipo
        const passaTipo = filtro === "todas" || t.tipo === filtro;

        // Validação 2: Data inicial
        const passaDataInicial = dataInicial === "" || t.data >= dataInicial;

        // Validação 3: Data final
        const passaDataFinal = dataFinal === "" || t.data <= dataFinal;

        // Retorna true SOMENTE se passar em TODAS
        return passaTipo && passaDataInicial && passaDataFinal;
    });

    console.log(filtradas);
</script>

<div class="lista">
    <div class="lista-header">
        <div class="transactions-header">
            <svg
                class="icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
            </svg>
            <h2>Transações</h2>
        </div>
        <select class="campo tipo" bind:value={filtro}>
            <option value="todas">Todas</option>
            <option value="receita">Receitas</option>
            <option value="despesa">Despesas</option>
        </select>
    </div>

    <div class="campos-linha">
        <div class="campo">
            <label for="dataInicial">Data Inicial:</label>
            <input
                class="data"
                id="dataInicial"
                type="date"
                bind:value={dataInicial}
            />
        </div>
        <div class="campo">
            <label for="dataFinal">Data Final:</label>
            <input
                class="data"
                id="dataFinal"
                type="date"
                bind:value={dataFinal}
            />
        </div>
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
    .data {
        width: 90%;
        padding: 0.75rem;
        border: 2px solid #e5e7eb;
        border-radius: 8px;
        font-size: 1rem;
        transition: border-color 0.2s;
        box-sizing: border-box;
    }
    .campos-linha {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
    }
    .campo {
        margin-bottom: 1rem;
    }

    .transactions-header {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 1.5rem;
        padding: 1rem 0;
    }

    .icon {
        width: 2rem;
        height: 2rem;
        color: #4f46e5;
        margin-right: 0.75rem;
    }

    h2 {
        font-size: 1.5rem;
        font-weight: bold;
        color: #1f2937;
        margin: 0;
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
        .transactions-header {
            margin-bottom: 1rem;
        }

        h2 {
            font-size: 1.25rem;
        }

        .icon {
            width: 1.75rem;
            height: 1.75rem;
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
