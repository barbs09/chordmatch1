// Configurações da Google Custom Search API
const apiKey = "SUA_CHAVE_DE_API"; // Substitua pela sua chave de API
const cx = "SEU_ID_DO_CUSTOM_SEARCH_ENGINE"; // Substitua pelo seu CSE ID

// Função para buscar músicas pelo Google API
async function searchMusicByChords(chords) {
  const query = `${chords} chords song`;
  const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&key=${apiKey}&cx=${cx}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error("Erro ao buscar músicas:", error);
    return [];
  }
}

// Função para exibir resultados no site
async function displayResults(userChords) {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = ""; // Limpar resultados anteriores
  
  const results = await searchMusicByChords(userChords);
  
  if (results.length === 0) {
    resultsDiv.textContent = "Nenhuma música encontrada para essa sequência.";
    return;
  }

  results.forEach(item => {
    const link = document.createElement("a");
    link.href = item.link;
    link.textContent = item.title;
    link.target = "_blank";
    const paragraph = document.createElement("p");
    paragraph.appendChild(link);
    resultsDiv.appendChild(paragraph);
  });
}

// Ligando a funcionalidade ao botão de pesquisa
document.getElementById("search-button").addEventListener("click", () => {
  const userInput = document.getElementById("chord-input").value;
  if (userInput.trim()) {
    displayResults(userInput);
  } else {
    alert("Por favor, insira uma sequência de acordes.");
  }
});
