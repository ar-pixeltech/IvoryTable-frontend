'use client';

import React from "react";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
    label?: string;
    description?: string;
};

export default function Select({
    label,
    description,
    className = "",
    ...props
}: SelectProps) {

    return (
        <div className="space-y-1">
            {label && (
                <label className="text-sm font-medium text-gray-600">
                    {label}
                </label>
            )}

            <select
                {...props}
                className={`
                    w-full border p-3 rounded-lg focus:ring-1 focus:ring-emerald-500 transition
                        focus:border-emerald-500 outline-none
                    ${className}
                `}
            >
                {props.children}
            </select>
            {description && <p className="text-xs text-gray-500 pt-0">{description}</p>}


        </div>
    );
}