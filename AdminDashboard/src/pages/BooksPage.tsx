import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchBookList } from "@/http/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { Badge } from "@/components/ui/badge";
import { Loader, MoreHorizontal } from "lucide-react";
import { Book } from "@/types";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const BooksPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: booksData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["books", currentPage],
    queryFn: () => fetchBookList(currentPage, 5),
    staleTime: 60000, // 1 minute time given in ms
  });

  const totalPages = Math.ceil(
    (booksData?.data?.totalBooks || 0) / (booksData?.data?.booksPerPage || 1)
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      {isLoading ? (
        <Loader className="animate-spin mx-auto" size={60} />
      ) : (
        <div>
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>Books</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Genre</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Price
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Author Name
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Created at
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {booksData?.data?.books.map((book: Book) => (
                    <TableRow key={book._id}>
                      <TableCell>
                        <img
                          src={book.coverImage}
                          alt={book.title}
                          width={42}
                          height={42}
                          className="overflow-hidden rounded-2xl"
                        />
                      </TableCell>
                      <TableCell>{book.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{book.genre}</Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        122.3
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {book.author.name}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {book.createdAt}
                      </TableCell>
                      <TableCell>
                        <MoreHorizontal />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground">
                Showing <strong>{booksData?.data?.booksPerPage}</strong> of{" "}
                <strong>{booksData?.data?.totalBooks}</strong> Books
              </div>
            </CardFooter>
          </Card>

          <Pagination>
            <PaginationContent>
              <PaginationPrevious
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              />
              {Array.from({ length: totalPages }, (_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    onClick={() => handlePageChange(index + 1)}
                    isActive={currentPage === index + 1}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationNext
                onClick={() =>
                  handlePageChange(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
              />
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </>
  );
};

export default BooksPage;
