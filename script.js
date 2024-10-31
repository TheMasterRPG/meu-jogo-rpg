let personagemAtual = null; // Variável para armazenar o personagem atual
let inventario = []; // Variável para armazenar o inventário

document.addEventListener("DOMContentLoaded", () => {
    const criarPersonagemButton = document.getElementById("criar-personagem-button");
    const editarPersonagemButton = document.getElementById("editar-personagem-button");
    const salvarPersonagemButton = document.getElementById("salvar-personagem-button");
    const carregarPersonagemButton = document.getElementById("carregar-personagem-button");
    
    const adicionarItemButton = document.getElementById("adicionar-item-button");
    const editarInventarioButton = document.getElementById("editar-inventario-button");
    const salvarInventarioButton = document.getElementById("salvar-inventario-button");
    const carregarInventarioButton = document.getElementById("carregar-inventario-button");

    // Funções do Personagem
    criarPersonagemButton.onclick = () => {
        const nome = prompt("Nome do personagem:");
        const nivel = parseInt(prompt("Nível do personagem:"));
        const vida = parseInt(prompt("Vida do personagem:"));
        const ataque = parseInt(prompt("Ataque do personagem:"));

        personagemAtual = {
            nome: nome,
            nivel: nivel,
            vida: vida,
            ataque: ataque
        };

        atualizarResultadoPersonagem();
    };

    // Função para editar o personagem atual
    editarPersonagemButton.onclick = () => {
        if (personagemAtual) {
            const nome = prompt("Novo nome do personagem:", personagemAtual.nome);
            const nivel = parseInt(prompt("Novo nível do personagem:", personagemAtual.nivel));
            const vida = parseInt(prompt("Nova vida do personagem:", personagemAtual.vida));
            const ataque = parseInt(prompt("Novo ataque do personagem:", personagemAtual.ataque));
    
            personagemAtual.nome = nome;
            personagemAtual.nivel = nivel;
            personagemAtual.vida = vida;
            personagemAtual.ataque = ataque;
    
            atualizarResultadoPersonagem();
        } else {
            alert("Nenhum personagem criado.");
        }
    };
    
    // Função para atualizar a exibição do personagem
    function atualizarResultadoPersonagem() {
        const resultado = document.getElementById("resultado-criacao");
        if (personagemAtual) {
            resultado.innerHTML = `
                <p><strong>Nome:</strong> ${personagemAtual.nome}</p>
                <p><strong>Nível:</strong> ${personagemAtual.nivel}</p>
                <p><strong>Vida:</strong> ${personagemAtual.vida}</p>
                <p><strong>Ataque:</strong> ${personagemAtual.ataque}</p>
            `;
            resultado.style.display = 'block'; // Exibe o resultado
        } else {
            resultado.innerHTML = "";
            resultado.style.display = 'none'; // Oculta o resultado se não houver personagem
        }
    }
    
    // Funções para salvar e carregar o personagem
    salvarPersonagemButton.onclick = () => {
        if (personagemAtual) {
            localStorage.setItem("personagem", JSON.stringify(personagemAtual));
            alert("Personagem salvo!");
        } else {
            alert("Nenhum personagem para salvar.");
        }
    };
    
    carregarPersonagemButton.onclick = () => {
        const personagemSalvo = localStorage.getItem("personagem");
        if (personagemSalvo) {
            personagemAtual = JSON.parse(personagemSalvo);
            atualizarResultadoPersonagem();
            alert("Personagem carregado!");
        } else {
            alert("Nenhum personagem salvo.");
        }
    };
    
    // Funções do Inventário
    adicionarItemButton.onclick = () => {
        const nomeItem = prompt("Nome do item:");
        const descricaoItem = prompt("Descrição do item:");
        inventario.push({ nome: nomeItem, descricao: descricaoItem });
        atualizarListaInventario();
    };
    
    editarInventarioButton.onclick = () => {
        const index = parseInt(prompt("Índice do item para editar (0 a " + (inventario.length - 1) + "):"));
        if (index >= 0 && index < inventario.length) {
            const nomeItem = prompt("Novo nome do item:", inventario[index].nome);
            const descricaoItem = prompt("Nova descrição do item:", inventario[index].descricao);
            inventario[index] = { nome: nomeItem, descricao: descricaoItem };
            atualizarListaInventario();
        } else {
            alert("Índice inválido.");
        }
    };
    
    salvarInventarioButton.onclick = () => {
        localStorage.setItem("inventario", JSON.stringify(inventario));
        alert("Inventário salvo!");
    };
    
    carregarInventarioButton.onclick = () => {
        const inventarioSalvo = localStorage.getItem("inventario");
        if (inventarioSalvo) {
            inventario = JSON.parse(inventarioSalvo);
            atualizarListaInventario();
            alert("Inventário carregado!");
        } else {
            alert("Nenhum inventário salvo.");
        }
    };

    // Função para atualizar a lista de itens do inventário
    function atualizarListaInventario() {
        const lista = document.getElementById("lista-inventario");
        lista.innerHTML = "";
        inventario.forEach((item, index) => {
            lista.innerHTML += `<p><strong>${index}:</strong> ${item.nome} - ${item.descricao}</p>`;
        });
        lista.style.display = inventario.length ? 'block' : 'none'; // Exibe a lista apenas se houver itens
    }

    // Função para rolar dados
    window.rolarDado = function (sides) {
        const resultado = Math.floor(Math.random() * sides) + 1;
        document.getElementById(`resultado-d${sides}`).innerText = `Resultado: ${resultado}`;
    };

    // Função para alternar a visibilidade dos cards
    window.toggleCard = function (cardId) {
        const cardContent = document.querySelector(`#${cardId} .card-content`);
        cardContent.style.display = cardContent.style.display === 'none' ? 'block' : 'none';
    };

    // Funções para anotações
    document.getElementById("salvar-anotacoes-button").onclick = () => {
        const anotacoesInput = document.getElementById("anotacoes-input").value;
        localStorage.setItem("anotacoes", anotacoesInput);
        alert("Anotações salvas!");
    };

    document.getElementById("carregar-anotacoes-button").onclick = () => {
        const anotacoesSalvas = localStorage.getItem("anotacoes");
        if (anotacoesSalvas) {
            document.getElementById("anotacoes-input").value = anotacoesSalvas;
            alert("Anotações carregadas!");
        } else {
            alert("Nenhuma anotação salva.");
        }
    };
});
