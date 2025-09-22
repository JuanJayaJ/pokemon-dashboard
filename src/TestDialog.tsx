import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function TestDialog() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-10">
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hello World</DialogTitle>
          </DialogHeader>
          <p>This is a test modal.</p>
        </DialogContent>
      </Dialog>
    </div>
  );
}
