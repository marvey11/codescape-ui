import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./badge";
import { Button } from "./button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import { Checkbox } from "./checkbox";
import { Input } from "./input";
import { Label } from "./label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  EmptyState,
  Skeleton,
} from "./feedback";
import { Pagination } from "./pagination";

const meta = {
  title: "Components/Examples",
  parameters: { layout: "padded" },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Buttons: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      {(
        ["primary", "secondary", "outline", "ghost", "destructive"] as const
      ).map((variant) => (
        <Button key={variant} variant={variant}>
          {variant}
        </Button>
      ))}
      <Button disabled>Disabled</Button>
      <Button size="sm">Small</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};
export const FormControls: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 12, maxWidth: 360 }}>
      <Label htmlFor="story-email">Email address</Label>
      <Input id="story-email" type="email" placeholder="you@example.com" />
      <Label htmlFor="story-error">Invalid example</Label>
      <Input
        id="story-error"
        error
        aria-describedby="story-error-help"
        defaultValue="not-an-email"
      />
      <small id="story-error-help">Enter a valid email address.</small>
      <Label>
        <Checkbox defaultChecked /> I agree to the terms
      </Label>
      <Label>
        <Checkbox checked="indeterminate" disabled /> Some items selected
      </Label>
    </div>
  ),
};
export const Badges: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {(
        [
          "default",
          "secondary",
          "success",
          "warning",
          "destructive",
          "outline",
        ] as const
      ).map((variant) => (
        <Badge key={variant} variant={variant}>
          {variant}
        </Badge>
      ))}
    </div>
  ),
};
export const CardExample: Story = {
  render: () => (
    <Card style={{ maxWidth: 420 }}>
      <CardHeader>
        <CardTitle>Project settings</CardTitle>
        <CardDescription>
          Manage the details for your workspace.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Label htmlFor="project-name">Project name</Label>
        <Input id="project-name" defaultValue="Codescape" />
      </CardContent>
      <CardFooter>
        <Button>Save changes</Button>
      </CardFooter>
    </Card>
  ),
};

export const SelectExample: Story = {
  render: () => (
    <div style={{ width: 280 }}>
      <Label htmlFor="story-region">Region</Label>
      <Select defaultValue="eu">
        <SelectTrigger id="story-region" aria-label="Region">
          <SelectValue placeholder="Choose a region" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="eu">Europe</SelectItem>
          <SelectItem value="na">North America</SelectItem>
          <SelectItem value="apac" disabled>
            Asia Pacific (unavailable)
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};

export const DropdownMenuExample: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Actions</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem>View details</DropdownMenuItem>
        <DropdownMenuItem>Duplicate</DropdownMenuItem>
        <DropdownMenuItem disabled>Archive</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const FeedbackAndPagination: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 16, maxWidth: 560 }}>
      <Alert variant="destructive">
        <AlertTitle>Unable to load data</AlertTitle>
        <AlertDescription>Please try again in a moment.</AlertDescription>
      </Alert>
      <EmptyState
        title="No results found"
        description="Try changing the filters to see more results."
      />
      <div style={{ display: "grid", gap: 8 }}>
        <Skeleton style={{ width: "100%" }} />
        <Skeleton style={{ width: "70%" }} />
      </div>
      <Pagination page={2} totalPages={5} onPageChange={() => undefined} />
    </div>
  ),
};
