document.addEventListener('DOMContentLoaded', () => {
    const inputText = document.getElementById('inputText');
    const visualization = document.getElementById('visualization');

    inputText.addEventListener('input', () => {
        const text = inputText.value;
        visualizePadding(text);
    });

    function visualizePadding(text) {
        visualization.innerHTML = ''; // Clear previous visualization

        // Convert text to binary
        const binaryMessage = text.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join('');

        // Calculate padding
        const messageLength = binaryMessage.length;
        const paddingLength = (448 - (messageLength + 1) % 512 + 512) % 512;
        const paddedMessage = binaryMessage + '1' + '0'.repeat(paddingLength) + messageLength.toString(2).padStart(64, '0');

        // Divide into 512-bit blocks
        for (let i = 0; i < paddedMessage.length; i += 512) {
            const block = paddedMessage.slice(i, i + 512);
            const blockContainer = document.createElement('div');
            blockContainer.className = 'block-container';

            for (let j = 0; j < block.length; j += 32) {
                const row = document.createElement('div');
                row.className = 'row';

                const segment = block.slice(j, j + 32);
                const segmentBlock = document.createElement('div');
                segmentBlock.className = 'visualization-block';

                if (j < messageLength) {
                    segmentBlock.classList.add('message');
                } else if (j >= block.length - 64) {
                    segmentBlock.classList.add('length');
                } else {
                    segmentBlock.classList.add('padding');
                }

                segmentBlock.textContent = segment;
                row.appendChild(segmentBlock);
                blockContainer.appendChild(row);

                // Add equivalent text below the bits
                if (j < messageLength) {
                    const textRow = document.createElement('div');
                    textRow.className = 'row';

                    const textBlock = document.createElement('div');
                    textBlock.className = 'text-block';
                    const charIndex = Math.floor(j / 8);
                    textBlock.textContent = text[charIndex] || '';

                    textRow.appendChild(textBlock);
                    blockContainer.appendChild(textRow);
                }
            }

            visualization.appendChild(blockContainer);
        }
    }
});
