import {
    ChevronLeftIcon,
    ChevronRightIcon,
    DotsHorizontalIcon,
  } from '@heroicons/react/solid'
  import React from 'react'
  import { DOTS, usePagination } from '../../hooks/usePagination'
  
  const pagination_item =
    'text-center my-auto mx-2 flex text-gray-700 items-center '
  
  interface Props {
    onPageChange: any
    totalCount: number
    siblingCount?: number
    currentPage: number
    pageSize: number
    className?: string
  }
  
  function Pagination({
    onPageChange,
    totalCount,
    siblingCount,
    currentPage,
    pageSize,
    className,
  }: Props) {
    const paginationRange = usePagination({
      currentPage,
      totalCount,
      siblingCount,
      pageSize,
    })
  
    //@ts-ignore
    if (currentPage === 0 || paginationRange.length < 2) {
      return null
    }
  
    const onPrevious = () => {
      onPageChange(currentPage - 1)
    }
  
    const onNext = () => {
      onPageChange(currentPage + 1)
    }
  
    //@ts-ignore
    let lastPage = paginationRange[paginationRange.length - 1]
  
    return (
      <ul
        className={`${className} flex  flex-row items-center text-sm font-semibold`}
      >
        <li
          onClick={onPrevious}
          className={`${
            currentPage === 1 ? ' hidden ' : 'p-2 '
          } cursor-pointer text-blue-primary hover:text-gray-700 dark:text-gray-200`}
        >
          <ChevronLeftIcon height={32} width={32} />
        </li>
        {paginationRange?.map((pageNumber, index) => {
          if (pageNumber === DOTS) {
            return (
              <li key={index} className={`${pagination_item}`}>
                <DotsHorizontalIcon height={20} width={20} />
              </li>
            )
          }
          return (
            <li
                key={index}
              onClick={() => onPageChange(pageNumber)}
              className={`${
                pageNumber === currentPage
                  ? pagination_item +
                    ' rounded bg-pink-500 p-2 text-center text-white dark:text-white '
                  : ' my-auto flex cursor-pointer items-center p-2 text-center text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 rounded '
              } `}
            >
              {pageNumber}
            </li>
          )
        })}
  
        <li
          onClick={onNext}
          className={`${
            currentPage === lastPage
              ? 'hidden '
              : 'my-auto flex items-center p-2 text-center text-gray-700 '
          } cursor-pointer text-blue-primary hover:text-gray-700`}
        >
          <ChevronRightIcon height={32} width={32} />
        </li>
      </ul>
    )
  }
  
  export default Pagination
  