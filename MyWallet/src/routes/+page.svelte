<script>
  import Resumo from "$lib/components/Resumo.svelte";
  import FormTransacao from "$lib/components/FormTransacao.svelte";
  import ListaTransacoes from "$lib/components/ListaTransacoes.svelte";
</script>

<main>
  <header>
    <h1>💰 Controle de Gastos</h1>
    <p>Gerencie suas finanças de forma simples</p>
  </header>

  <Resumo />
  <FormTransacao />
  <ListaTransacoes />
</main>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, sans-serif;
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
</style>
