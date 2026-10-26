import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./button";
import { cn } from "../lib/cn";

export interface PaginationProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  "onChange"
> {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  labels?: { previous?: string; next?: string; page?: string };
}
export const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  ({ className, page, totalPages, onPageChange, labels, ...props }, ref) => {
    const pageCount = Math.max(1, Math.floor(totalPages));
    const currentPage = Math.min(pageCount, Math.max(1, Math.floor(page)));
    return (
      <nav
        ref={ref}
        aria-label="Pagination"
        className={cn("cs-pagination", className)}
        {...props}
      >
        <Button
          variant="outline"
          size="sm"
          aria-label={labels?.previous ?? "Previous page"}
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <ChevronLeft aria-hidden="true" />
          {labels?.previous ?? "Previous"}
        </Button>
        <span className="cs-pagination__status" aria-live="polite">
          {labels?.page ?? "Page"} {currentPage} of {pageCount}
        </span>
        <Button
          variant="outline"
          size="sm"
          aria-label={labels?.next ?? "Next page"}
          disabled={currentPage >= pageCount}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <ChevronRight aria-hidden="true" />
          {labels?.next ?? "Next"}
        </Button>
      </nav>
    );
  },
);
Pagination.displayName = "Pagination";
