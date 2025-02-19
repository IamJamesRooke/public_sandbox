document.addEventListener('DOMContentLoaded', () => {
    const h1 = document.createElement('h1');
    document.body.appendChild(h1);

    console.log('Fetching Bitcoin price...');
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd')
        .then(response => {
            console.log('Response received:', response);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Data received:', data);
            const price = data.bitcoin.usd;
            h1.textContent = `Bitcoin Price: $${price}`;
        })
        .catch(error => {
            if (error instanceof TypeError) {
                console.error('Network error or invalid URL:', error);
            } else {
                console.error('Error fetching Bitcoin price:', error);
            }
            h1.textContent = 'Error fetching Bitcoin price';
        });
});
