import { describe, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
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
import { DataTable } from "./data-table";
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

  it("renders a neutral table shell with custom cells and empty states", () => {
    const rows = [
      { id: 1, name: "Ada", role: "Engineer" },
      { id: 2, name: "Grace", role: "Architect" },
    ];

    render(
      <DataTable
        aria-label="Team roster"
        caption="Team roster"
        columns={[
          { key: "name", header: "Name", accessor: (row) => row.name },
          {
            key: "role",
            header: "Role",
            render: (row) => `${row.role} (${row.name})`,
          },
        ]}
        data={rows}
        rowKey={(row) => row.id}
      />,
    );

    expect(
      screen.getByRole("table", { name: "Team roster" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: "Name" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Architect (Grace)")).toBeInTheDocument();

    render(
      <DataTable
        aria-label="No teams"
        columns={[{ key: "name", header: "Name" }]}
        data={[]}
        emptyState={<span>No teams available.</span>}
      />,
    );

    expect(screen.getByText("No teams available.")).toBeInTheDocument();
  });

  it("renders controlled row details only when provided", () => {
    const rows = [
      { id: 1, name: "Ada", role: "Engineer" },
      { id: 2, name: "Grace", role: "Architect" },
    ];
    const renderExpandedRow = vi.fn(
      (row: (typeof rows)[number], index: number) =>
        row.id === 2 ? (
          <span>
            {row.name} details at row {index}
          </span>
        ) : null,
    );

    render(
      <DataTable
        aria-label="Team roster with details"
        columns={[
          { key: "name", header: "Name", accessor: (row) => row.name },
          { key: "role", header: "Role", accessor: (row) => row.role },
        ]}
        data={rows}
        renderExpandedRow={renderExpandedRow}
        rowKey={(row) => row.id}
      />,
    );

    expect(screen.getByText("Grace details at row 1")).toBeInTheDocument();
    expect(screen.queryByText("Ada details at row 0")).not.toBeInTheDocument();
    expect(
      within(
        screen.getByRole("table", { name: "Team roster with details" }),
      ).getAllByRole("row"),
    ).toHaveLength(4);
    expect(
      screen.getByText("Grace details at row 1").closest("td"),
    ).toHaveAttribute("colspan", "2");
    expect(renderExpandedRow).toHaveBeenNthCalledWith(1, rows[0], 0);
    expect(renderExpandedRow).toHaveBeenNthCalledWith(2, rows[1], 1);
  });

  it("covers default row keys and conversion branches for non-string cell values", () => {
    render(
      <DataTable
        aria-label="Team schedule"
        columns={[
          { key: "name", header: "Name", accessor: (row) => row.name },
          { key: "count", header: "Count", accessor: (row) => row.count },
          { key: "marker", header: "Marker", accessor: (row) => row.marker },
          { key: "config", header: "Config", accessor: (row) => row.config },
          { key: "missing", header: "Missing", accessor: (row) => row.missing },
          {
            key: "status",
            header: "Status",
            render: () => <span>Ready</span>,
          },
        ]}
        data={[
          {
            name: "Ada",
            count: 2n,
            marker: Symbol("ready"),
            config: { region: "eu" },
            missing: undefined,
          },
          { name: "Grace" },
        ]}
      />,
    );

    expect(
      screen.getByRole("table", { name: "Team schedule" }),
    ).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("Symbol(ready)")).toBeInTheDocument();
    expect(screen.getByText('{"region":"eu"}')).toBeInTheDocument();
    expect(screen.getAllByText("—").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Ready").length).toBeGreaterThan(0);
    expect(
      screen.getByRole("columnheader", { name: "Status" }),
    ).toBeInTheDocument();
  });
});
