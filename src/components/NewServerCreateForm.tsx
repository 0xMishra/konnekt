"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { createNewServerAction } from "@/actions/serverActions";
import { Input } from "@/components/ui/input";
import { useActionState, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Label } from "./ui/label";
import { toast } from "@/hooks/use-toast";

const initialState = null;

export const NewServerCreateForm = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [state, formAction, pending] = useActionState(
    createNewServerAction,
    initialState,
  );

  useEffect(() => {
    if (state?.msg === "error") {
      toast({
        variant: "destructive",
        description: "something went wrong",
      });
    }
  }, [state]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Get the first file

    if (!file) {
      setErrorMessage("No file selected");
      return;
    }

    // Check if the file is an image
    if (!file.type.startsWith("image/")) {
      setErrorMessage("The selected file is not an image.");
      return;
    }

    // Convert the image to Base64
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string); // Base64 string
    };
    reader.onerror = () => {
      setErrorMessage("Failed to read the file.");
    };
    reader.readAsDataURL(file); // Convert to Base64 format

    setErrorMessage(null);
  };

  return (
    <div className="flex w-[100%] items-center justify-center p-1">
      <Card
        className="w-[97%] max-w-[600px]"
        style={{
          backgroundColor: "var(--chat-background)",
          border: "none",
        }}
      >
        <CardHeader>
          <CardTitle className="text-3xl">Create new server</CardTitle>
          <CardDescription className="text-xl">
            Provide info about your new server
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-5">
            <div>
              <Label htmlFor="name" className="mb-2 text-xl">
                Name
              </Label>
              <Input
                className="mt-2 border-text-color-in-sidebar"
                placeholder="name of the server"
                name="name"
                id="name"
              />
              {state?.msg === "name" && (
                <p className="text-red-500">
                  Name should be at least of 3 characters
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="image" className="mb-2 text-xl">
                Image
              </Label>
              <Input
                type="file"
                className="mt-2 border-text-color-in-sidebar"
                placeholder="display image of the server"
                accept="image/*"
                onChange={handleFileChange}
              />
              {state?.msg === "image" && (
                <p className="text-red-500">Server image is required</p>
              )}

              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

              {imagePreview && (
                <div className="mt-3">
                  <img
                    src={imagePreview}
                    alt="Uploaded"
                    style={{
                      maxWidth: "100%",
                      marginTop: "2rem",
                      height: "300px",
                    }}
                  />
                  <Input
                    id="image"
                    name="image"
                    value={imagePreview}
                    readOnly
                    className="hidden"
                  />
                </div>
              )}
            </div>

            <Button
              type="submit"
              disabled={pending}
              variant={"discord"}
              className="w-20 text-lg"
            >
              {pending ? <Loader2 className="animate-spin" /> : "Create"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
