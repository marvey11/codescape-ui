# Repository guidance

- Keep the public API typed and components accessible by default.
- Use semantic HTML and Radix UI for interactive primitives that need managed keyboard and state behavior.
- Keep shared visual tokens in `styles/theme.css`; export the compiled stylesheet as `@marvey11/codescape-ui/style.css`.
- Write documentation in British/International English.
- Add component stories when introducing or changing public components.
- Keep lint rules focused on correctness and accessibility; Prettier owns code formatting.
- Keep TypeScript strict options enabled across source, tests, stories, and configuration.
- Use `npm run lint`, `npm run format:check`, `npm run typecheck`, `npm test`, and `npm run build` to validate changes when dependencies are available.
