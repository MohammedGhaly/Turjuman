import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import createSublistAroundIndex from "@/utils/subListAroundIndex";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  count: number;
  currentPage: number;
  isLoading: boolean;
  switchPage: (n: number) => void;
  itemsPerPage: number;
}

function PageSelector({
  count,
  currentPage,
  switchPage,
  isLoading,
  itemsPerPage,
}: Props) {
  const totalPages = Math.ceil(count / itemsPerPage);

  function renderPageButtons() {
    if (isLoading) {
      <PaginationButton order={1} switchPage={switchPage} isSelected={false} />;
    }
    let pageButtons = [];
    const pageButtonsOrders = createSublistAroundIndex(
      Array.from({ length: totalPages }, (_, index) => index + 1),
      currentPage
    );
    console.log(pageButtonsOrders);
    for (const i of pageButtonsOrders) {
      pageButtons.push(
        <PaginationButton
          order={i}
          switchPage={switchPage}
          key={i}
          isSelected={i === currentPage}
        />
      );
    }
    if (!pageButtonsOrders.includes(totalPages)) {
      pageButtons.push(
        <button
          className="w-8 h-8 rounded-full hover:bg-[var(--pagination-glow)]"
          key="...n"
          disabled={true}
        >
          ...
        </button>
      );
    }
    if (totalPages - currentPage <= 2 && !pageButtonsOrders.includes(1)) {
      pageButtons = [
        <button
          className="w-8 h-8 rounded-full hover:bg-[var(--pagination-glow)]"
          key="...p"
          disabled={true}
        >
          ...
        </button>,
        ...pageButtons,
      ];
    }
    return pageButtons;
  }

  return (
    <Pagination>
      <PaginationContent className="flex gap-5 items-center">
        <PaginationItem>
          <button
            className="w-8 h-8 rounded-full hover:bg-[var(--pagination-glow)] flex items-center pl-[1px]"
            onClick={() => {
              if (currentPage > 1) switchPage(currentPage - 1);
            }}
          >
            <ChevronLeft />
          </button>
        </PaginationItem>

        {renderPageButtons()}

        <PaginationItem>
          <button
            className="w-8 h-8 rounded-full hover:bg-[var(--pagination-glow)] flex items-center pl-1"
            onClick={() => {
              if (currentPage < totalPages) switchPage(currentPage + 1);
            }}
          >
            <ChevronRight />
          </button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

interface PageBtnProps {
  order: number;
  switchPage: (clickedPage: number) => void;
  isSelected: boolean;
}

function PaginationButton({ order, switchPage, isSelected }: PageBtnProps) {
  return (
    <PaginationItem>
      <button
        className={`w-8 h-8 rounded-full hover:bg-[var(--pagination-glow)] ${
          isSelected
            ? "text-[var(--pagination-active-btn)] font-bold"
            : "text-[var(--pagination-inactive-btn)]"
        }`}
        key={order}
        value={order}
        onClick={() => switchPage(order)}
      >
        {order}
      </button>
    </PaginationItem>
  );
}

export default PageSelector;
