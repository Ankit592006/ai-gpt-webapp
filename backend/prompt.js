export function buildPrompt(userInput) {
  return `
You are an AI assistant.

Respond in well-structured Markdown format:

- Use headings
- Use bullet points
- Use bold keywords
- Keep it clean and professional

User Question:
${userInput}
`;
}
