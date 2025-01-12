"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";

import { createNewChannelAction } from "@/actions/channelActions";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useActionState, useEffect } from "react";
import { Label } from "./ui/label";

const initialState = null;

export const CreateNewChannelForm = ({
  serverId,
  serverName,
}: {
  serverId: string;
  serverName: string;
}) => {
  const [state, formAction, pending] = useActionState(
    createNewChannelAction,
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
          <CardTitle className="text-3xl">{serverName}</CardTitle>
          <CardDescription className="text-xl">
            Create a new channel in this server
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
                placeholder="name of the channel"
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
              <Label htmlFor="type" className="mb-2 text-xl">
                Type
              </Label>
              <Select name="type">
                <SelectTrigger className="mt-2 w-[100%] border-text-color-in-sidebar">
                  <SelectValue placeholder="Select channel type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Type of channel</SelectLabel>

                    <SelectItem value="text">text</SelectItem>
                    <SelectItem value="audio">audio</SelectItem>
                    <SelectItem value="video">video</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {state?.msg === "type" && (
                <p className="text-red-500">
                  Type can only be text, audio or video
                </p>
              )}
            </div>

            <Input
              className="hidden"
              placeholder="display image of the server"
              value={serverId}
              name="serverId"
              readOnly
            />
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
