import * as React from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

const Dialog: React.FC<DialogProps> = ({ open, onOpenChange, children }) => {
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={() => onOpenChange?.(false)}
      />
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  onClose?: () => void;
}

const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className, children, onClose, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative w-full max-w-lg",
          "backdrop-blur-lg bg-white/[0.02]",
          "border-[0.5px] border-[#2A4B55]",
          "rounded-xl p-6",
          "shadow-2xl",
          className
        )}
        {...props}
      >
        {onClose && (
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none"
          >
            <X className="h-4 w-4 text-[#888899]" />
            <span className="sr-only">关闭</span>
          </button>
        )}
        {children}
      </div>
    );
  }
);

DialogContent.displayName = "DialogContent";

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col space-y-1.5 text-center sm:text-left mb-4", className)}
    {...props}
  />
);

DialogHeader.displayName = "DialogHeader";

const DialogTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn("font-serif text-2xl text-[#D4AF37] leading-none tracking-tight", className)}
    {...props}
  />
));

DialogTitle.displayName = "DialogTitle";

const DialogDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("font-mono text-sm text-[#888899]", className)}
    {...props}
  />
));

DialogDescription.displayName = "DialogDescription";

export { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription };

