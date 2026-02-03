export default function ExplanationList({ items }) {
  return (
    <ul className="space-y-3 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-gray-700 text-sm md:text-base">
          <span className="bg-blue-100 text-blue-600 w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold mt-0.5 flex-shrink-0">
            {i + 1}
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}
