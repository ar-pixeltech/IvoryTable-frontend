"use client"

import {
    DndContext,
    closestCenter
} from "@dnd-kit/core"
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy
} from "@dnd-kit/sortable"
import { useState } from "react"
import axios from "@/lib/axios"
import { Plus } from "lucide-react"
import SortableItem from "./components/SortableItem"

export default function CategoriesPage() {
    const [categories, setCategories] = useState<any[]>([
        { id: "1", name: "Burgers", position: 0 },
        { id: "2", name: "Pizzas", position: 1 },
        { id: "3", name: "Drinks", position: 2 },
        { id: "4", name: "Desserts", position: 3 },
    ])

    // useEffect(() => {
    //     fetchCategories()
    // }, [])

    // const fetchCategories = async () => {
    //     const res = await axios.get("/vendor/categories")
    //     setCategories(res.data.sort((a: any, b: any) => a.position - b.position))
    // }

    const [newCategory, setNewCategory] = useState("")
    const [loading, setLoading] = useState(false)

    const handleDragEnd = async (event: any) => {
        const { active, over } = event
        if (active.id !== over?.id) {
            const oldIndex = categories.findIndex(c => c.id === active.id)
            const newIndex = categories.findIndex(c => c.id === over.id)

            const newItems = arrayMove(categories, oldIndex, newIndex)
            setCategories(newItems)

            await axios.post("/vendor/categories/reorder", {
                items: newItems.map((item, index) => ({
                    id: item.id,
                    position: index
                }))
            })
        }
    }

    const addCategory = async () => {
        if (!newCategory.trim()) return

        setLoading(true)

        // Temporary ID for instant UI feel
        const tempId = Date.now().toString()

        const newItem = {
            id: tempId,
            name: newCategory,
            position: categories.length
        }

        // Optimistic update (instant UI)
        setCategories(prev => [...prev, newItem])
        setNewCategory("")

        try {
            const res = await axios.post("/vendor/categories", {
                name: newCategory
            })

            // Replace temp ID with real DB ID
            setCategories(prev =>
                prev.map(cat =>
                    cat.id === tempId ? { ...cat, id: res.data.id } : cat
                )
            )
        } catch (err) {
            // Rollback if error
            setCategories(prev => prev.filter(cat => cat.id !== tempId))
        }

        setLoading(false)
    }

    const deleteCategory = async (id: string) => {
        const previous = categories

        // Optimistic remove
        setCategories(prev => prev.filter(cat => cat.id !== id))

        try {
            await axios.delete(`/vendor/categories/${id}`)
        } catch (err) {
            // rollback if error
            setCategories(previous)
        }
    }


    return (

        <div className="space-y-6">

            <h1 className="text-2xl font-bold">Categories</h1>

            <div className="grid md:grid-cols-2 gap-8">

                {/* LEFT SIDE — Category List */}
                <div className="bg-white rounded-2xl shadow-sm border p-6">
                    <h2 className="font-semibold mb-4">Reorder Categories</h2>

                    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                        <SortableContext
                            items={categories.map(c => c.id)}
                            strategy={verticalListSortingStrategy}
                        >
                            <div className="space-y-3">
                                {categories.map(cat => (
                                    <SortableItem key={cat.id} id={cat.id} name={cat.name} onDelete={deleteCategory} />
                                ))}
                            </div>
                        </SortableContext>
                    </DndContext>
                </div>

                {/* RIGHT SIDE — Add Category */}
                <div className="bg-white rounded-2xl shadow-sm border p-6">
                    <h2 className="font-semibold mb-4">Add New Category</h2>

                    <div className="space-y-4">
                        <input
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            placeholder="Enter category name"
                            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 outline-none transition"
                        />

                        <button
                            onClick={addCategory}
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-all duration-200 active:scale-95"
                        >
                            <Plus size={18} />
                            {loading ? "Adding..." : "Add Category"}
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}


