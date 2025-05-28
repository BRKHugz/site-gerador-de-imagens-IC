// Função para gerar a imagem com a descrição inserida pelo usuário
async function gerarImagemComIA(descricao) {
    const API_KEY = 'sua-chave-da-api-aqui'; // Coloque sua chave de API aqui
    const endpoint = 'https://api.openai.com/v1/images/generations';
    
    const data = {
        prompt: descricao, // A descrição da imagem que o usuário fornece
        n: 1,              // Número de imagens a serem geradas
        size: "1024x1024"  // Tamanho da imagem (pode ser 256x256, 512x512, ou 1024x1024)
    };
    
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
    };
    
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        });

        const result = await response.json();
        
        // Verifica se houve sucesso na geração
        if (response.ok) {
            const imageUrl = result.data[0].url; // URL da imagem gerada
            return imageUrl;
        } else {
            throw new Error('Erro ao gerar a imagem');
        }
    } catch (error) {
        console.error('Erro na API:', error);
        return null;
    }
}

// Função chamada quando o formulário for enviado
document.getElementById('gerar-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const descricao = document.getElementById('descricao').value;
    
    if (descricao) {
        // Chama a função para gerar a imagem com a descrição fornecida
        const imageUrl = await gerarImagemComIA(descricao);

        if (imageUrl) {
            // Exibe a imagem gerada na página
            document.getElementById('imagem-gerada').innerHTML = `
                <h3>Sua imagem gerada:</h3>
                <img src="${imageUrl}" alt="Imagem gerada" />
                <p>Descrição: ${descricao}</p>
            `;
        } else {
            alert('Erro ao gerar a imagem!');
        }
    } else {
        alert('Por favor, descreva a imagem!');
    }
});
