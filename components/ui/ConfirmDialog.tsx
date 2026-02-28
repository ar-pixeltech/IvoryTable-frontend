'use client';

import Modal from "./Modal";

type ConfirmDialogProps = {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
    danger?: boolean;
};

export default function ConfirmDialog({
    isOpen,
    onClose,
    onConfirm,
    title = "Are you sure?",
    description,
    confirmText = "Confirm",
    cancelText = "Cancel",
    danger = false,
}: ConfirmDialogProps) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            maxWidth="max-w-sm"
            footer={
                <>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-xl border"
                    >
                        {cancelText}
                    </button>

                    <button
                        onClick={onConfirm}
                        className={`px-4 py-2 rounded-xl text-white ${danger
                            ? "bg-red-500 hover:bg-red-600"
                            : "bg-indigo-600 hover:bg-indigo-700"
                            }`}
                    >
                        {confirmText}
                    </button>
                </>
            }
        >
            {description && (
                <p className="text-sm text-gray-600">{description}</p>
            )}


        </Modal>
    );
}