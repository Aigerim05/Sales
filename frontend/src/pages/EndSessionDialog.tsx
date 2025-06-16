import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface EndSessionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sessionName: string;
  setSessionName: (name: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

const EndSessionDialog = ({ open, onOpenChange, sessionName, setSessionName, onSave, onCancel }: EndSessionDialogProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="bg-white border-gray-200">
      <DialogHeader>
        <DialogTitle className="text-gray-900">
          Name Your Session
        </DialogTitle>
      </DialogHeader>
      <div className="py-4">
        <Input
          placeholder="Enter session name..."
          value={sessionName}
          onChange={(e) => setSessionName(e.target.value)}
          className="bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500"
        />
      </div>
      <DialogFooter>
        <Button
          variant="outline"
          onClick={onCancel}
          className="border-gray-300 text-white hover:bg-gray-100"
        >
          Cancel
        </Button>
        <Button
          onClick={onSave}
          disabled={!sessionName.trim()}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
        >
          Save Session
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default EndSessionDialog; 