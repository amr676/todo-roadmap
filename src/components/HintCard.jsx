import { Key } from 'lucide-react';

export default function HintCard({ hint }) {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-4 w-full">
      <div className="flex items-start gap-3">
        <div className="bg-amber-100 p-1.5 rounded-full text-amber-600 mt-1 flex-shrink-0">
          <Key className="w-4 h-4" />
        </div>
        <div>
          <h4 className="font-bold text-amber-800 text-sm mb-1">الزتونة (Hint):</h4>
          <p className="text-amber-900 leading-relaxed font-medium text-sm md:text-base">
            {hint}
          </p>
        </div>
      </div>
    </div>
  );
}
