import { Button } from "@/components/ui/button";
import {
  BookOpen,
  UserPlus,
  Bookmark,
  Users,
  ArrowUpRight,
} from "lucide-react";
import { Link } from "react-router-dom";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const HomePage = () => {
  return (
    <>
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div className="flex min-h-screen w-full flex-col">
          <main className="flex flex-1 flex-col gap-4 md:gap-6">
            <div className="grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-4">
              <Card x-chunk="dashboard-01-chunk-0">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Books
                  </CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">10,431</div>
                  <p className="text-xs text-muted-foreground">
                    +350 books added this month
                  </p>
                </CardContent>
              </Card>
              <Card x-chunk="dashboard-01-chunk-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    New Members
                  </CardTitle>
                  <UserPlus className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+1,250</div>
                  <p className="text-xs text-muted-foreground">
                    +5.4% from last month
                  </p>
                </CardContent>
              </Card>
              <Card x-chunk="dashboard-01-chunk-2">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Books Issued
                  </CardTitle>
                  <Bookmark className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4,321</div>
                  <p className="text-xs text-muted-foreground">
                    +15% from last month
                  </p>
                </CardContent>
              </Card>
              <Card x-chunk="dashboard-01-chunk-3">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Members
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2,734</div>
                  <p className="text-xs text-muted-foreground">
                    +120 active in the last hour
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
              <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
                <CardHeader className="flex flex-row items-center">
                  <div className="grid gap-2">
                    <CardTitle>Recent Transactions</CardTitle>
                    <CardDescription>
                      Latest book transactions in your library.
                    </CardDescription>
                  </div>
                  <Button asChild size="sm" className="ml-auto gap-1">
                    <Link to="#">
                      View All
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Member</TableHead>
                        <TableHead className="hidden xl:table-column">
                          Book
                        </TableHead>
                        <TableHead className="hidden xl:table-column">
                          Status
                        </TableHead>
                        <TableHead className="hidden xl:table-column">
                          Date
                        </TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <div className="font-medium">Liam Johnson</div>
                          <div className="hidden text-sm text-muted-foreground md:inline">
                            liam@example.com
                          </div>
                        </TableCell>
                        <TableCell className="hidden xl:table-column">
                          "The Great Gatsby"
                        </TableCell>
                        <TableCell className="hidden xl:table-column">
                          <Badge className="text-xs" variant="outline">
                            Returned
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                          2023-08-01
                        </TableCell>
                        <TableCell className="text-right">$0.00</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <div className="font-medium">Olivia Smith</div>
                          <div className="hidden text-sm text-muted-foreground md:inline">
                            olivia@example.com
                          </div>
                        </TableCell>
                        <TableCell className="hidden xl:table-column">
                          "1984"
                        </TableCell>
                        <TableCell className="hidden xl:table-column">
                          <Badge className="text-xs" variant="outline">
                            Overdue
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                          2023-07-30
                        </TableCell>
                        <TableCell className="text-right">$5.00</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <div className="font-medium">Noah Williams</div>
                          <div className="hidden text-sm text-muted-foreground md:inline">
                            noah@example.com
                          </div>
                        </TableCell>
                        <TableCell className="hidden xl:table-column">
                          "To Kill a Mockingbird"
                        </TableCell>
                        <TableCell className="hidden xl:table-column">
                          <Badge className="text-xs" variant="outline">
                            Returned
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                          2023-08-02
                        </TableCell>
                        <TableCell className="text-right">$0.00</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <div className="font-medium">Emma Brown</div>
                          <div className="hidden text-sm text-muted-foreground md:inline">
                            emma@example.com
                          </div>
                        </TableCell>
                        <TableCell className="hidden xl:table-column">
                          "Moby Dick"
                        </TableCell>
                        <TableCell className="hidden xl:table-column">
                          <Badge className="text-xs" variant="outline">
                            Borrowed
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                          2023-08-03
                        </TableCell>
                        <TableCell className="text-right">$0.00</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <div className="font-medium">Sophia Davis</div>
                          <div className="hidden text-sm text-muted-foreground md:inline">
                            sophia@example.com
                          </div>
                        </TableCell>
                        <TableCell className="hidden xl:table-column">
                          "Pride and Prejudice"
                        </TableCell>
                        <TableCell className="hidden xl:table-column">
                          <Badge className="text-xs" variant="outline">
                            Returned
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                          2023-08-04
                        </TableCell>
                        <TableCell className="text-right">$0.00</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              <Card x-chunk="dashboard-01-chunk-5">
                <CardHeader>
                  <CardTitle>Recent Members</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-8">
                  <div className="flex items-center gap-4">
                    <Avatar className="hidden h-9 w-9 sm:flex">
                      <AvatarImage src="/avatars/01.png" alt="Avatar" />
                      <AvatarFallback>OM</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <p className="text-sm font-medium leading-none">
                        Olivia Martin
                      </p>
                      <p className="text-sm text-muted-foreground">
                        olivia.martin@email.com
                      </p>
                    </div>
                    <div className="ml-auto font-medium">
                      Member since: Jan 2024
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Avatar className="hidden h-9 w-9 sm:flex">
                      <AvatarImage src="/avatars/02.png" alt="Avatar" />
                      <AvatarFallback>JL</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <p className="text-sm font-medium leading-none">
                        Jackson Lee
                      </p>
                      <p className="text-sm text-muted-foreground">
                        jackson.lee@email.com
                      </p>
                    </div>
                    <div className="ml-auto font-medium">
                      Member since: Feb 2024
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Avatar className="hidden h-9 w-9 sm:flex">
                      <AvatarImage src="/avatars/03.png" alt="Avatar" />
                      <AvatarFallback>IN</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <p className="text-sm font-medium leading-none">
                        Isabella Nguyen
                      </p>
                      <p className="text-sm text-muted-foreground">
                        isabella.nguyen@email.com
                      </p>
                    </div>
                    <div className="ml-auto font-medium">
                      Member since: Mar 2024
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Avatar className="hidden h-9 w-9 sm:flex">
                      <AvatarImage src="/avatars/04.png" alt="Avatar" />
                      <AvatarFallback>WK</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <p className="text-sm font-medium leading-none">
                        William Kim
                      </p>
                      <p className="text-sm text-muted-foreground">
                        will@email.com
                      </p>
                    </div>
                    <div className="ml-auto font-medium">
                      Member since: Apr 2024
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Avatar className="hidden h-9 w-9 sm:flex">
                      <AvatarImage src="/avatars/05.png" alt="Avatar" />
                      <AvatarFallback>SD</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <p className="text-sm font-medium leading-none">
                        Sofia Davis
                      </p>
                      <p className="text-sm text-muted-foreground">
                        sofia.davis@email.com
                      </p>
                    </div>
                    <div className="ml-auto font-medium">
                      Member since: May 2024
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </main>
    </>
  );
};

export default HomePage;
