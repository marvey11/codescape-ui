# Codescape UI

An accessible React component library and light theme for applications in the Codescape namespace. Components are published as compiled JavaScript and CSS, so consuming applications do not need to configure Tailwind to use the library's styling.

## Requirements

- React and React DOM 19 or later (peer dependencies)
- Node.js 22.22.2+, 24.15.0+, or 26+ for development (required by Storybook 10 and Vitest 5)

## Installation

```sh
npm install @marvey11/codescape-ui react react-dom
```

Import the package stylesheet once in your application entry point, then use the typed components:

```tsx
import "@marvey11/codescape-ui/style.css";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Label,
} from "@marvey11/codescape-ui";

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

## Installing from GitHub Packages

The package is published to GitHub Packages as `@marvey11/codescape-ui`. GitHub Actions publishes releases from this repository using its built-in `GITHUB_TOKEN`; no personal access token secret is needed for publishing.

In a consuming application, map the scope to GitHub Packages in the project `.npmrc`:

```ini
@marvey11:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

Then install the package and its React peer dependencies:

```sh
npm install @marvey11/codescape-ui react react-dom
```

GitHub Packages' npm registry requires authentication for downloads, including public packages. For local development, create a personal access token (classic) with `read:packages`, set it as `NODE_AUTH_TOKEN` in your shell, and do not commit the token. In a consuming GitHub Actions workflow, use that workflow's `GITHUB_TOKEN` with `packages: read` permission instead. The package must have public visibility enabled in its GitHub Packages settings for general public access.

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
