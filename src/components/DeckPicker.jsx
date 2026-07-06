export default function DeckPicker({ categories, onSelectCategory }) {
  return (
    <div className="w-full max-w-md mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Finance Flashcards</h1>
      <div className="grid grid-cols-1 gap-4">
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => onSelectCategory(category.name)}
            className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
          >
            <span className="text-lg font-semibold text-gray-700">{category.name}</span>
            <span className="text-sm font-medium text-gray-400 bg-gray-50 px-3 py-1 rounded-full">
              {category.count} cards
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
