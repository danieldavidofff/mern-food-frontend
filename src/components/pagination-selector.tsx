import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

type Props = {
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
}


const PaginationSelector = ({ page, pages, onPageChange }: Props) => {
  const pageNumbers = [];
  //Generating page numbers upto the maximum amount of pages
  // pages = 3
  //pageNumber = [1,2,3]
  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i)
  }

  return (
    <Pagination>
      <PaginationContent>
        {page !== 1 && (
        <PaginationItem>
          <PaginationPrevious href="#" onClick={() => onPageChange(page - 1)}/>
        </PaginationItem>
        )}
        {pageNumbers.map((number) => (
          <PaginationItem>
            <PaginationLink href="#" onClick={() => onPageChange(number)} isActive={page === number}>
              {number}
            </PaginationLink>
          </PaginationItem>
        ))}
        {/* Is going to only display the next button if there is a next page */}
        {page !== pageNumbers.length && (
          <PaginationItem>
            <PaginationNext href="#" onClick={() => onPageChange(page + 1)}/>
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  )
}

export default PaginationSelector