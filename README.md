# Codescape UI

An accessible React component library and light theme for applications in the Codescape namespace. Components are published as compiled JavaScript and CSS, so consuming applications do not need to configure Tailwind to use the library's styling.

## Requirements

- React and React DOM 19 or later (peer dependencies)
- Node.js 22.22.2+, 24.15.0+, or 26+ for development (required by Storybook 10 and Vitest 5)

## Installation

```sh
npm install @codescape/ui react react-dom
```

Import the package stylesheet once in your application entry point, then use the typed components:

```tsx
import "@codescape/ui/style.css";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Label,
} from "@codescape/ui";

export function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
      </CardHeader>
      <CardContent>
        <Label htmlFor="name">Name</Label>
        <Input id="name" placeholder="Ada Lovelace" />
        <Button style={{ marginTop: 16 }}>Continue</Button>
      </CardContent>
    </Card>
  );
}
```

## Components

- **Button** — `primary`, `secondary`, `outline`, `ghost` and `destructive` variants; `sm`, `md`, `lg` and `icon` sizes. Defaults to `type="button"` to avoid accidental form submission.
- **Input** — native input attributes and an `error` state. Pair it with `Label` and an error message referenced by `aria-describedby`.
- **Label** — native label with shared typography; use `htmlFor` to associate it with a control.
- **Checkbox** — Radix UI checkbox with controlled, uncontrolled and indeterminate states, native keyboard interaction and accessible state announcements.
- **Card** — composable `CardHeader`, `CardTitle`, `CardDescription`, `CardContent` and `CardFooter` sections.
- **Badge** — `default`, `secondary`, `success`, `warning`, `destructive` and `outline` visual variants. Do not convey status by colour alone.
- **cn** — merges conditional class names and resolves Tailwind utility conflicts.

Components accept `className` for local styling overrides. Design tokens are defined in `styles/theme.css`; the current theme is light. The package includes Tailwind CSS 4 output and does not require a Tailwind plugin in consumer applications.

## Development

```sh
npm install
npm run typecheck
npm run lint
npm run format
npm run test
npm run build
npm run storybook
```

TypeScript uses strict checking, including unchecked-index and exact-optional-property checks. ESLint checks TypeScript, React hooks and accessibility; Prettier owns formatting, with formatting rules disabled in ESLint. Vitest and Testing Library cover variants, input behavior, keyboard interaction and accessibility states, with an 80% line, function and statement coverage threshold (75% branch threshold). Storybook contains component variants and key states; its accessibility addon reports accessibility violations during review. CI runs tests, coverage, the package build and Storybook build.
