import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
  Alert,
  AlertDescription,
  AlertTitle,
  EmptyState,
  Skeleton,
} from "./feedback";
import { Pagination } from "./pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "./select";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";

describe("Button", () => {
  it("applies variant and size and defaults to a safe button type", () => {
    render(
      <Button variant="outline" size="lg">
        Save
      </Button>,
    );
    expect(screen.getByRole("button", { name: "Save" })).toHaveClass(
      "cs-button--outline",
      "cs-button--lg",
    );
    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });
  it("supports keyboard activation and disabled state", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <>
        <Button onClick={onClick}>Run</Button>
        <Button disabled>Unavailable</Button>
      </>,
    );
    screen.getByRole("button", { name: "Run" }).focus();
    await user.keyboard("{Enter}");
    expect(onClick).toHaveBeenCalledOnce();
    expect(screen.getByRole("button", { name: "Unavailable" })).toBeDisabled();
  });
});

describe("Input and Label", () => {
  it("associates a label and exposes validation state", () => {
    render(
      <>
        <Label htmlFor="email">Email</Label>
        <Input id="email" error aria-describedby="email-error" />
        <span id="email-error">Required</span>
      </>,
    );
    expect(screen.getByLabelText("Email")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    expect(screen.getByLabelText("Email")).toHaveAttribute(
      "aria-describedby",
      "email-error",
    );
  });
  it("accepts user input", async () => {
    const user = userEvent.setup();
    render(
      <>
        <Label htmlFor="name">Name</Label>
        <Input id="name" />
      </>,
    );
    await user.type(screen.getByLabelText("Name"), "Ada");
    expect(screen.getByLabelText("Name")).toHaveValue("Ada");
  });
});

describe("Checkbox", () => {
  it("toggles from the keyboard and exposes a checked state", async () => {
    const user = userEvent.setup();
    render(<Checkbox aria-label="Accept terms" />);
    const checkbox = screen.getByRole("checkbox", { name: "Accept terms" });
    checkbox.focus();
    await user.keyboard(" ");
    expect(checkbox).toBeChecked();
  });
  it("supports the indeterminate accessibility state", () => {
    render(<Checkbox aria-label="Select all" checked="indeterminate" />);
    expect(
      screen.getByRole("checkbox", { name: "Select all" }),
    ).toHaveAttribute("data-state", "indeterminate");
  });
});

describe("Badge and Card", () => {
  it("renders semantic content and variants", () => {
    render(
      <>
        <Badge variant="success">Complete</Badge>
        <Card>
          <CardHeader>
            <CardTitle>Title</CardTitle>
            <CardDescription>Summary</CardDescription>
          </CardHeader>
          <CardContent>Details</CardContent>
          <CardFooter>Actions</CardFooter>
        </Card>
      </>,
    );
    expect(screen.getByText("Complete")).toHaveClass("cs-badge--success");
    expect(screen.getByRole("heading", { name: "Title" })).toBeInTheDocument();
    expect(screen.getByText("Summary")).toBeInTheDocument();
    expect(screen.getByText("Details")).toBeInTheDocument();
    expect(screen.getByText("Actions")).toBeInTheDocument();
  });
});

describe("Select", () => {
  it("opens with keyboard and selects an option", async () => {
    const user = userEvent.setup();
    render(
      <Select>
        <SelectTrigger aria-label="Region">
          <SelectValue placeholder="Choose" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Regions</SelectLabel>
            <SelectItem value="eu">Europe</SelectItem>
            <SelectItem value="na">North America</SelectItem>
          </SelectGroup>
          <SelectSeparator />
        </SelectContent>
      </Select>,
    );
    const trigger = screen.getByRole("combobox", { name: "Region" });
    trigger.focus();
    await user.keyboard("{Enter}");
    await user.keyboard("{Enter}");
    expect(trigger).toHaveTextContent("Europe");
  });
});

describe("DropdownMenu", () => {
  it("opens and activates an item with keyboard interaction", async () => {
    const user = userEvent.setup();
    const action = vi.fn();
    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>Actions</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Record</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={action}>Edit</DropdownMenuItem>
          <DropdownMenuCheckboxItem
            checked={false}
            onCheckedChange={() => undefined}
          >
            Pin
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );
    await user.click(screen.getByRole("button", { name: "Actions" }));
    await user.click(screen.getByRole("menuitem", { name: "Edit" }));
    expect(action).toHaveBeenCalledOnce();
  });
});

describe("Feedback and pagination", () => {
  it("uses status semantics and renders an empty state and skeleton", () => {
    render(
      <>
        <Alert>
          <AlertTitle>Saved</AlertTitle>
          <AlertDescription>Your changes were saved.</AlertDescription>
        </Alert>
        <EmptyState title="Nothing here" description="Add a record to begin." />
        <Skeleton data-testid="loading" />
      </>,
    );
    expect(screen.getByRole("status")).toHaveTextContent(
      "Your changes were saved.",
    );
    expect(
      screen.getByRole("heading", { name: "Nothing here" }),
    ).toBeInTheDocument();
    expect(screen.getByTestId("loading")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });
  it("disables unavailable page actions and reports page changes", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    render(<Pagination page={1} totalPages={3} onPageChange={onPageChange} />);
    expect(screen.getByText("Page 1 of 3")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Previous page" }),
    ).toBeDisabled();
    await user.click(screen.getByRole("button", { name: "Next page" }));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });
});
