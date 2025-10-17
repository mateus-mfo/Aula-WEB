// Função que busca os dados na API
async function obterDadosUsuario(nomeUsuario) {
    const url = `https://api.github.com/users/${nomeUsuario}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Erro ao obter dados do usuário');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Falha na busca:', error);
        return null;
    }
}

// Função que exibe os dados na tabela HTML
function exibirDadosUsuario(usuario) {
    const tableBody = document.querySelector('#dados-table tbody');
    tableBody.innerHTML = '';

    const row = document.createElement('tr');
    const nomeCell = document.createElement('td');
    const reposCell = document.createElement('td');
    const seguidoresCell = document.createElement('td');

    nomeCell.textContent = usuario.name || 'Sem nome';
    reposCell.textContent = usuario.public_repos;
    seguidoresCell.textContent = usuario.followers;

    row.appendChild(nomeCell);
    row.appendChild(reposCell);
    row.appendChild(seguidoresCell);

    tableBody.appendChild(row);
}

// Função principal
async function iniciar() {
    const tableBody = document.querySelector('#dados-table tbody');
    tableBody.innerHTML = '<tr><td colspan="3">Carregando...</td></tr>';

    const usuario = await obterDadosUsuario('mateus-mfo');

    if (usuario) {
        exibirDadosUsuario(usuario);
    } else {
        tableBody.innerHTML = '<tr><td colspan="3">Não foi possível carregar os dados.</td></tr>';
    }
}

iniciar();

