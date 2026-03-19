import * as Icons from "lucide-react";

export default function IconPicker({ onSelect }: any) {
    const iconNames = ["Pizza", "Coffee", "Sandwich", "IceCream", "Salad"];

    return (
        <div className="grid grid-cols-5 gap-3">
            {iconNames.map((name) => {
                const Icon: React.ElementType | any = Icons[name as keyof typeof Icons];

                return (
                    <button
                        key={name}
                        onClick={() => onSelect(name)}
                        className="p-3 border rounded-lg hover:bg-gray-50 flex items-center justify-center"
                    >
                        <Icon className="w-5 h-5 text-gray-700" />
                    </button>
                );
            })}
        </div>
    );
}