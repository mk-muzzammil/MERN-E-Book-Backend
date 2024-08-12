import React, { useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteBookApi,
  EditBookApi,
  fetchBookList,
  getSingleBook,
} from "@/http/api";
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
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
const BooksPage = () => {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  // const queryParams = new URLSearchParams(location.search);
  // const genreFilter = queryParams.get("genre");

  const { data: booksData, isLoading } = useQuery({
    queryKey: ["books", "genres", currentPage],
    queryFn: () => fetchBookList(currentPage, 5),
    // staleTime: 60000, // 1 minute time given in ms
  });
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: deleteBookApi,
    onSuccess: (response) => {
      console.log("Book Deleted Successfully", response);
      // Invalidate and refetch the books data after deletion
      queryClient.invalidateQueries({
        queryKey: ["books", "genres", currentPage],
      });
    },
  });
  const mutationEdit = useMutation({
    mutationFn: getSingleBook,
    onSuccess: (response) => {
      console.log("Book Fetched Successfully", response.data);
      navigate(`/books/edit_book`, {
        state: { book: response.data },
      });
    },
  });
  const totalPages = Math.ceil(
    (booksData?.data?.totalBooks || 0) / (booksData?.data?.booksPerPage || 1)
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const hanldeEditAction = (_id: string) => {
    mutationEdit.mutate(_id);
  };
  const hanldeDeleteAction = (_id: string) => {
    mutation.mutate(_id);
    console.log("Delete", _id);
  };
  // const filteredBooks = useMemo(() => {
  //   if (!genreFilter) return booksData?.data?.books || [];
  //   return booksData?.data?.books.filter(
  //     (book: Book) => book.genre.toLowerCase() === genreFilter.toLowerCase()
  //   );
  // }, [booksData, genreFilter]);

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
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                              onClick={() => hanldeEditAction(book._id)}
                            >
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => hanldeDeleteAction(book._id)}
                            >
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
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
