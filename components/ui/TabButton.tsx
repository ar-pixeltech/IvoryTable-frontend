'use client';

import React from "react";

type TabButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    label?: string;
    active?: boolean;
};

export default function TabButton({
    label,
    className = "",
    active = false,
    ...props
}: TabButtonProps) {

    return (
        <button
            {...props}
            className={`px-4 py-2 rounded-lg text-sm transition ${active ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
        >
            {label && (
                <label>
                    {label}
                </label>
            )}
        </button>
    );
}