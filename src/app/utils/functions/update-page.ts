export const updateCurrentPage = (
  currentPage: number,
  totalItemsCount: number,
  pageSize: number
): number => {
  const totalPages = Math.ceil(totalItemsCount / pageSize);

  if (currentPage > totalPages) {
    return totalPages;
  }

  return currentPage;
};
