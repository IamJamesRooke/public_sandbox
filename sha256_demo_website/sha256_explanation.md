# SHA-256 Algorithm Explanation

## Step 1: Padding the Message
The message is padded so that its length is congruent to 448 modulo 512. This involves appending a single '1' bit followed by '0' bits, and then appending the length of the original message as a 64-bit integer.

## Step 2: Parsing the Padded Message
The padded message is parsed into 512-bit blocks. Each block is then processed separately.

## Step 3: Setting the Initial Hash Value
Eight 32-bit words are used as the initial hash value. These words are derived from the fractional parts of the square roots of the first eight prime numbers.

## Step 4: Processing the Message in Blocks
Each 512-bit block is processed using the SHA-256 compression function. This involves a series of bitwise operations, modular additions, and logical functions.

## Step 5: Producing the Final Hash Value
The final hash value is produced by concatenating the hash values of all blocks. This results in a 256-bit (32-byte) hash value.

## Detailed Steps
1. **Padding the Message**: Append a single '1' bit to the message, followed by '0' bits, and then append the length of the original message as a 64-bit integer.
2. **Parsing the Padded Message**: Divide the padded message into 512-bit blocks.
3. **Setting the Initial Hash Value**: Use eight 32-bit words derived from the fractional parts of the square roots of the first eight prime numbers.
4. **Processing the Message in Blocks**: Process each 512-bit block using the SHA-256 compression function.
5. **Producing the Final Hash Value**: Concatenate the hash values of all blocks to produce the final 256-bit hash value.
