import {
  Bell,
  Book,
  CirclePlus,
  CircleUser,
  Home,
  Menu,
  Package2,
  Search,
  ListFilter,
  Loader,
} from "lucide-react";
// import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Link,
  Outlet,
  Navigate,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useTokenStore } from "@/zustandStore";
import { useQuery } from "@tanstack/react-query";
import { fetchGenreList } from "@/http/api";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const [selectedGenre, setSelectedGenre] = useState<string>("");

  const { data, isLoading } = useQuery({
    queryKey: ["genres"],
    queryFn: fetchGenreList,
  });

  const handleSelectedGenre = (genre: string) => {
    setSelectedGenre(genre);
    navigate(`/books?genre=${genre}`);
  };
  const location = useLocation();

  const { token, setToken } = useTokenStore((state) => state);
  const hanldeLogOut = () => {
    console.log("logging out");
    setToken("");
  };

  const getBreadcrumbs = () => {
    const breadcrumbs = [
      { path: "/home", label: "Home" },
      ...(location.pathname.includes("/books")
        ? [{ path: "/books", label: "Books" }]
        : []),
      ...(location.pathname.includes("/create_book")
        ? [{ path: "/create_book", label: "Create Book" }]
        : []),
      ...(location.pathname.includes("/edit_book")
        ? [{ path: "/edit_book", label: "Edit Book" }]
        : []),
    ];

    return breadcrumbs;
  };

  if (!token) {
    return <Navigate to={"/auth/login"} replace />;
  }
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <NavLink
              to="/home"
              className="flex items-center gap-2 font-semibold"
            >
              <Package2 className="h-6 w-6" />
              <span className="">Coders Book</span>
            </NavLink>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <NavLink
                to="/home"
                className={({ isActive }) => {
                  return `flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                    isActive && "bg-accent"
                  }`;
                }}
              >
                <Home className="h-4 w-4" />
                Home
              </NavLink>

              <NavLink
                to="/books"
                className={({ isActive }) => {
                  return `flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                    isActive && "bg-accent"
                  }`;
                }}
              >
                <Book className="h-4 w-4" />
                Books
              </NavLink>
            </nav>
          </div>
          <div className="mt-auto p-4">
            <Card x-chunk="dashboard-02-chunk-0">
              <CardHeader className="p-2 pt-0 md:p-4">
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>
                  Unlock all features and get unlimited access to our support
                  team.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                <Button size="sm" className="w-full">
                  Upgrade
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  to="/home"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Package2 className="h-6 w-6" />

                  <span className="sr-only">Coders Book</span>
                </Link>
                <NavLink
                  to="/home"
                  className={({ isActive }) => {
                    return `mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${
                      isActive && "bg-accent"
                    }`;
                  }}
                >
                  <Home className="h-5 w-5" />
                  Home
                </NavLink>

                <NavLink
                  to="/books"
                  className={({ isActive }) => {
                    return `mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${
                      isActive && "bg-accent"
                    }`;
                  }}
                >
                  <Book className="h-5 w-5" />
                  Books
                </NavLink>
              </nav>
              <div className="mt-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>Upgrade to Pro</CardTitle>
                    <CardDescription>
                      Unlock all features and get unlimited access to our
                      support team.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button size="sm" className="w-full">
                      Upgrade
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            {location.pathname.includes("/books") && (
              <form>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                  />
                </div>
              </form>
            )}
          </div>
          <div className="flex items-center gap-4">
            {location.pathname.includes("/books") && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    <ListFilter className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Filter
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {isLoading ? (
                    <Loader className="animate-spin" />
                  ) : data?.data?.genres.length > 0 ? (
                    data?.data?.genres?.map((genre: string) => (
                      <DropdownMenuCheckboxItem
                        key={genre}
                        onClick={() => handleSelectedGenre(genre)}
                      >
                        {genre}
                      </DropdownMenuCheckboxItem>
                    ))
                  ) : (
                    <DropdownMenuCheckboxItem>
                      No Genre Found
                    </DropdownMenuCheckboxItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
                  <CircleUser className="h-5 w-5" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {/* <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator /> */}
                <DropdownMenuItem>
                  <Button onClick={hanldeLogOut} variant={"link"}>
                    Logout
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="flex items-center justify-between">
            <Breadcrumb className="hidden md:flex">
              <BreadcrumbList>
                {getBreadcrumbs().map((breadcrumb, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && <BreadcrumbSeparator />}
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <Link to={breadcrumb.path}>{breadcrumb.label}</Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>

            <Link to={"/books/create_book"}>
              <Button>
                <CirclePlus className="h-6 w-6  " />{" "}
                <span className="ml-2 ">Add Book</span>
              </Button>
            </Link>
          </div>

          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
