/* eslint-disable no-shadow */
import { useEffect, useState } from 'react';
import { useMedia } from '@dsplay/react-template-utils';

const ItemList = ({ items }) => {
  const media = useMedia();
  const { itemsPerPage, durationPerPage } = media;

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const [count, setCount] = useState(0);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  function countingTime() {
    const interval = setTimeout(() => {
      setCount((prevCount) => count + 1);
    }, 1000);

    if (count >= durationPerPage) {
      setCount(0);
      clearTimeout(interval);

      handlePageChange(currentPage + 1);
    }
    if (currentPage > totalPages) {
      handlePageChange(1);
    }
  }

  useEffect(() => {
    if (totalPages > 1) {
      countingTime();
    }
  }, [count]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  return currentItems.map((item) => (item));
};

export default ItemList;
