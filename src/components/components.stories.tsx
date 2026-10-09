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
