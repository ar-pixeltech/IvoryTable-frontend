'use client';

import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
};

export default function Input({
    label,
    className = "",
    ...props
}: InputProps) {

    return (
        <div className="space-y-1">
            {label && (
                <label className="text-sm font-medium text-gray-600">
                    {label}
                </label>
            )}

            <input
                {...props}
                className={`
                    w-full border p-3 rounded-lg focus:ring-1 focus:ring-emerald-500 transition
                        focus:border-emerald-500 outline-none
                    ${className}
                `}
            />
        </div>
    );
}