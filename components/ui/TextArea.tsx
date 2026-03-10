'use client';

import React from "react";

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label?: string;
};

export default function TextArea({
    label,
    className = "",
    rows = 4,
    ...props
}: TextAreaProps) {

    return (
        <div className="space-y-1">
            {label && (
                <label className="text-sm font-medium text-gray-600">
                    {label}
                </label>
            )}

            <textarea
                rows={rows}
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