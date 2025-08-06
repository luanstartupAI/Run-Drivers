import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../ui/dialog';
import { Button } from '../../ui/button';
import { X } from 'lucide-react';

const ModalLayout = ({ 
  children,
  title = "",
  description = "",
  trigger,
  open,
  onOpenChange,
  size = "default",
  showCloseButton = true,
  showHeader = true
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "max-w-md";
      case "lg":
        return "max-w-2xl";
      case "xl":
        return "max-w-4xl";
      case "full":
        return "max-w-full mx-4";
      default:
        return "max-w-lg";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className={getSizeClasses()}>
        {showHeader && (
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div>
                {title && <DialogTitle>{title}</DialogTitle>}
                {description && (
                  <p className="text-sm text-gray-600 mt-1">{description}</p>
                )}
              </div>
              {showCloseButton && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onOpenChange?.(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          </DialogHeader>
        )}
        <div className="mt-4">{children}</div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalLayout;