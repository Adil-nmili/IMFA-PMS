export interface Modal {
  title?: string;
  description?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}