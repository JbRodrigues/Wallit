import { writable, derived } from "svelte/store";

export const transacoes = writable([]);

export const saldo = derived(transacoes, ($t) =>
    $t.reduce((acc, t) => (t.tipo === "receita" ? acc + t.valor : acc - t.valor), 0)
);

export const totalReceitas = derived(transacoes, ($t) =>
    $t.filter((t) => t.tipo === "receita")
        .reduce((acc, t) => acc + t.valor, 0)
);

export const totalDespesas = derived(transacoes, ($t) =>
    $t.filter((t) => t.tipo === "despesa")
        .reduce((acc, t) => acc + t.valor, 0)
);

export function adicionarTransacao(t) {
    transacoes.update((lista) => [t, ...lista]);
}

export function deletarTransacao(id) {
    transacoes.update((lista) => lista.filter((t) => t.id !== id));
}
