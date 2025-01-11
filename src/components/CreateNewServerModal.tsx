import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { NewServerCreateForm } from "./NewServerCreateForm";

export const CreateNewServerModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-gray-700 text-lg transition-all duration-200 hover:rounded-2xl hover:bg-add-button-background">
          <Plus />
        </div>
      </DialogTrigger>
      <DialogContent className="bg-chat-background">
        <DialogHeader>
          <DialogTitle className="hidden">Edit profile</DialogTitle>
          <NewServerCreateForm />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
