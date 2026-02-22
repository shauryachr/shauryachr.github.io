document.getElementById('ask').addEventListener('click', async () => {
    const queryInput = document.getElementById('query');
    const query = queryInput.value.trim().toLowerCase();
    if (!query) return;

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '<div style="text-align:center; padding:30px;">Loading...</div>';
    resultDiv.classList.add('visible');

    // Special case: Who is Shaurya Chauhan
    if (
        query.includes('who is shaurya chauhan') ||
        query.includes('shaurya chauhan') && (query.includes('who') || query.includes('ceo') || query.includes('founder'))
    ) {
        resultDiv.innerHTML = `
            <h2>Shaurya Chauhan</h2>
            <p class="special-answer">Shaurya Chauhan is the CEO of Shaurya AI.</p>
            <p>He's leading the vision behind this very interface you're using right now!</p>
        `;
        queryInput.value = ''; // optional: clear input after special answer
        return;
    }

    // Normal Wikipedia flow
    try {
        const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(queryInput.value)}&format=json&origin=*`;
        const searchRes = await fetch(searchUrl);
        const searchData = await searchRes.json();

        if (searchData.query.search.length === 0) {
            resultDiv.innerHTML = '<p>No matching articles found on Wikipedia.</p>';
            return;
        }

        const title = searchData.query.search[0].title;

        const extractUrl = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&titles=${encodeURIComponent(title)}&format=json&origin=*`;
        const extractRes = await fetch(extractUrl);
        const extractData = await extractRes.json();
        const page = Object.values(extractData.query.pages)[0];

        resultDiv.innerHTML = `
            <h2>${title}</h2>
            <p>${page.extract || 'No summary available.'}</p>
            <small style="opacity:0.7;">Source: Wikipedia</small>
        `;
    } catch (err) {
        resultDiv.innerHTML = '<p style="color:#ff5555;">Failed to connect to Wikipedia. Try again!</p>';
    }
});