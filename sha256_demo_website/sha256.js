function updateSteps() {
    const stepsContainer = document.getElementById('steps-container');
    stepsContainer.innerHTML = `
        <div class="step">
            <div class="step-title">Step 1: Padding the Message</div>
            <div class="step-description">The message is padded so that its length is congruent to 448 modulo 512.</div>
        </div>
        <div class="step">
            <div class="step-title">Step 2: Parsing the Padded Message</div>
            <div class="step-description">The padded message is parsed into 512-bit blocks.</div>
        </div>
        <div class="step">
            <div class="step-title">Step 3: Setting the Initial Hash Value</div>
            <div class="step-description">Eight 32-bit words are used as the initial hash value.</div>
        </div>
        <div class="step">
            <div class="step-title">Step 4: Processing the Message in Blocks</div>
            <div class="step-description">Each 512-bit block is processed using the SHA-256 compression function.</div>
        </div>
        <div class="step">
            <div class="step-title">Step 5: Producing the Final Hash Value</div>
            <div class="step-description">The final hash value is produced by concatenating the hash values of all blocks.</div>
        </div>
    `;
}

// Call updateSteps function after the page loads
window.onload = updateSteps;
