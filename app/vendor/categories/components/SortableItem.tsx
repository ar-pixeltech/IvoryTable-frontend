import {
    useSortable,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Trash2, GripVertical, Check, X } from "lucide-react"
import { useState } from "react"

export default function SortableItem({ id, name, onDelete }: any) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id })

    const [confirming, setConfirming] = useState(false)

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-200
                ${isDragging
                    ? "bg-emerald-50 shadow-md scale-[1.02]"
                    : "bg-gray-50 hover:bg-white hover:shadow-sm"}
                `}
        >
            {/* LEFT SIDE — Drag Handle + Name */}
            <div className="flex items-center gap-3">
                <div
                    {...attributes}
                    {...listeners}
                    className="cursor-grab text-gray-400 hover:text-gray-600"
                >
                    <GripVertical size={18} />
                </div>

                <span className="font-medium">{name}</span>
            </div>

            {/* RIGHT SIDE — Delete Button */}
            {!confirming ? (
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        setConfirming(true)
                    }}
                    className="text-gray-400 hover:text-red-500 transition"
                >
                    <Trash2 size={18} />
                </button>
            ) : (
                <div className="flex items-center gap-2 animate-in fade-in slide-in-from-right-2 duration-200">
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            setConfirming(false)
                        }}
                        className="text-gray-400 hover:text-gray-600 transition"
                    >
                        <X size={16} />
                    </button>

                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            onDelete(id)
                        }}
                        className="text-red-500 hover:text-red-600 transition"
                    >
                        <Check size={16} />
                    </button>
                </div>
            )}
        </div>
    )
}