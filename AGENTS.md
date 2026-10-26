# Repository guidance

- Keep the public API typed and components accessible by default.
- Use semantic HTML and Radix UI for interactive primitives that need managed keyboard and state behavior.
- Keep shared visual tokens in `styles/theme.css`; export the compiled stylesheet as `@marvey11/codescape-ui/style.css`.
- Write documentation in British/International English.
- Add component stories when introducing or changing public components.
- Keep lint rules focused on correctness and accessibility; Prettier owns code formatting.
- Keep TypeScript strict options enabled across source, tests, stories, and configuration.
- Use `npm run lint`, `npm run format:check`, `npm run typecheck`, `npm test`, and `npm run build` to validate changes when dependencies are available.
- Source components live in `src/components`, with the package API exported from `src/index.ts`; tests and Storybook stories are kept beside that source.
- `styles/theme.css` owns component styles and design tokens. `src/styles.ts` and the Vite library build produce the public `@marvey11/codescape-ui/style.css` entry.
- Use Radix primitives for composite interactive controls such as Select and DropdownMenu. Keep simple feedback patterns semantic and lightweight.
- Update README component documentation and add stories and behavior tests when changing public components.
- `npm test` runs Vitest with V8 coverage; the configured minimum is 80% lines, functions and statements, and 75% branches.
- This repository is a single-package React component library, not an application workspace. Keep package implementation in `src`, shared theme output in `styles`, and Storybook configuration in `.storybook`.
- The package owns reusable visual components, accessible interaction behavior, and design tokens; consumer-specific routing, API calls and business workflows belong in consuming applications.
- For local review, use `npm run storybook` for the component catalogue and `npm run build-storybook` to verify the production catalogue. `npm run build` creates JavaScript, declarations and the public stylesheet in `dist`.
