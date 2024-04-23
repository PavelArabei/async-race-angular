import { PAGE_SIZE } from '@utils/constants/variables';

export const updateCurrentPage = (currentPage: number, totalItemsCount: number) => {
  const totalPages = Math.ceil(totalItemsCount / PAGE_SIZE);

  if (currentPage > totalPages) {
    return totalPages;
  }

  return currentPage;
};
