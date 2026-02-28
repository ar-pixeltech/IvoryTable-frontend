'use client';

import { ReactNode, useEffect } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  maxWidth?: string; // optional width control
};

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  maxWidth = "max-w-lg",
}: ModalProps) {

  // 🔥 Close on ESC key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // 🔥 Prevent background scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`relative bg-white w-full ${maxWidth} rounded-2xl shadow-2xl p-6 space-y-5 animate-in fade-in zoom-in-95`}
      >
        {title && (
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        )}

        <div>{children}</div>

        {footer && (
          // <div className="flex justify-end gap-3 pt-4 border-t">
          <div className="flex justify-end gap-3 pt-4">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}