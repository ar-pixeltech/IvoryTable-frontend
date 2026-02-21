import {
    useSortable,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

export default function SortableItem({ id, name }: any) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
        useSortable({ id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={`p-4 rounded-xl border cursor-move transition-all duration-200
        ${isDragging
                    ? "bg-emerald-50 shadow-md scale-[1.02]"
                    : "bg-gray-50 hover:bg-white hover:shadow-sm"}
      `}
        >
            {name}
        </div>
    )
}