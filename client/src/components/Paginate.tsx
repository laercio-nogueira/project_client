import React from "react";
import styled from "styled-components";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0;
  padding: 1rem;
`;

const PageButton = styled.button<{ $actived?: boolean }>`
  padding: 0.5rem 0.5rem;
  border: none;
  background-color: ${({ $actived }) =>
    $actived ? "var(--primary-color)" : "transparent"};
  color: ${({ $actived }) => ($actived ? "#fff" : "#333")};
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: ${({ $actived }) =>
      $actived ? "var(--primary-color)" : "transparent"};
  }

  &:disabled {
    cursor: not-allowed;
    background-color: #ccc;
  }
`;

const Paginate: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePageClick = (page: number) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const startDots = (page: number) => {
    if (currentPage > totalPages - 4) {
      return page === totalPages - 4;
    }

    return page > 1 && currentPage - 1 === page && currentPage - 2 !== 1;
  };

  const endDots = (page: number) => {
    if (currentPage < 3) {
      return page === 4;
    }

    return (
      currentPage + 1 === page &&
      page < totalPages &&
      currentPage + 2 !== totalPages
    );
  };

  const calculePage = (page: number) => {
    if (currentPage < 3) {
      return page <= 4 || page === totalPages;
    }

    if (currentPage > totalPages - 3) {
      return page >= totalPages - 3 || page === 1;
    }

    return (
      page === 1 ||
      page === currentPage - 1 ||
      page === totalPages ||
      page === currentPage ||
      page === currentPage + 1
    );
  };

  return (
    totalPages > 0 && (
      <PaginationContainer>
        {[...Array(totalPages)].map((_, i) => {
          const page = i + 1;
          const isActive = page === currentPage;

          return (
            <React.Fragment key={page}>
              {startDots(page) && <>...</>}
              {calculePage(page) && (
                <PageButton
                  $actived={isActive}
                  onClick={() => handlePageClick(page)}
                >
                  {page}
                </PageButton>
              )}
              {endDots(page) && <>...</>}
            </React.Fragment>
          );
        })}
      </PaginationContainer>
    )
  );
};

export default Paginate;
