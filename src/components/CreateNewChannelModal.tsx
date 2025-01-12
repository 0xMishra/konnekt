import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { CreateNewChannelForm } from "./CreateNewChannelForm";

export const CreateNewChannelModal = ({
  serverId,
  serverName,
}: {
  serverId: string;
  serverName: string;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Plus />
      </DialogTrigger>
      <DialogContent className="bg-chat-background">
        <DialogHeader>
          <DialogTitle className="hidden">Edit profile</DialogTitle>
          <CreateNewChannelForm serverId={serverId} serverName={serverName} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
