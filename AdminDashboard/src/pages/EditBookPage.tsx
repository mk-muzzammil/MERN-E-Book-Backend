import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { EditBookApi } from "@/http/api";
import { useLocation, useNavigate } from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters long.",
  }),
  genre: z.string().min(2, {
    message: "Genre must be at least 2 characters long.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters long.",
  }),
});

const EditBookPage = () => {
  const queryClient = new QueryClient();
  const navigate = useNavigate();
  const location = useLocation();
  const book = location.state?.book;
  console.log(book);

  const mutation = useMutation({
    mutationFn: EditBookApi,
    onSuccess: (response) => {
      console.log("Book Edited successfully", response);
      queryClient.invalidateQueries({ queryKey: ["books"] });
      queryClient.invalidateQueries({ queryKey: ["genres"] });
      navigate("/books");
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: book.title || "",
      genre: book.genre || "",
      description: book.description || "",
      coverImage: undefined,
      pdfFile: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("genre", values.genre);
    formData.append("description", values.description);
    formData.append("coverImage", values.coverImage);
    formData.append("pdfFile", values.pdfFile);
    const _id = book._id;
    mutation.mutate({ _id, formData });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter title here ..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="genre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Genre</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter genre here ..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter Description here ..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="coverImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cover Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  onChange={(e) =>
                    field.onChange(
                      e.target.files ? e.target.files[0] : undefined
                    )
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pdfFile"
          render={({ field }) => (
            <FormItem>
              <FormLabel>PDF File</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  onChange={(e) =>
                    field.onChange(
                      e.target.files ? e.target.files[0] : undefined
                    )
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center gap-4">
          <Button type="submit" className="px-8" disabled={mutation.isPending}>
            {mutation.isPending && <Loader2Icon className="animate-spin" />}
            <span className="ml-2">Edit Book</span>
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditBookPage;
