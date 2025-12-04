export function formatarMoeda(valor) {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    }).format(valor);
}

export function formatarData(dataStr) {
    const data = new Date(dataStr + "T00:00:00");
    return data.toLocaleDateString("pt-BR");
}
