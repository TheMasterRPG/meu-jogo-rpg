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

    function atualizarResultadoPersonagem() {
        const resultado = document.getElementById("resultado-criacao");
        if (personagemAtual) {
            resultado.innerHTML = `
                <p><strong>Nome:</strong> ${personagemAtual.nome}</p>
                <p><strong>Nível:</strong> ${personagemAtual.nivel}</p>
                <p><strong>Vida:</strong> ${personagemAtual.vida}</p>
                <p><strong>Ataque:</strong> ${personagemAtual.ataque}</p>
            `;
        } else {
            resultado.innerHTML = "";
        }
    }

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

    function atualizarListaInventario() {
        const lista = document.getElementById("lista-inventario");
        lista.innerHTML = inventario.map((item, index) => `
            <div>
                <strong>${index + 1}. ${item.nome}</strong><br>
                <em>${item.descricao}</em>
            </div>
        `).join("");
    }

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

    window.rolarDado = (faces) => {
        const resultado = Math.floor(Math.random() * faces) + 1;
        document.getElementById(`resultado-d${faces}`).innerText = `Resultado: ${resultado}`;
    };

    document.getElementById("redefinir-button").onclick = () => {
        personagemAtual = null;
        inventario = [];
        atualizarResultadoPersonagem();
        atualizarListaInventario();
        localStorage.removeItem("personagem");
        localStorage.removeItem("inventario");
        alert("Tudo redefinido!");
    };

    window.toggleCard = (cardId) => {
        const card = document.getElementById(cardId);
        const content = card.querySelector('.card-content');
        content.style.display = content.style.display === 'none' ? 'block' : 'none';
    };
});
