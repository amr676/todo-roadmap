import { Copy, Check } from 'lucide-react';

export default function CodeBlock({ code, fileName, copied, onCopy }) {
  return (
    <div className="relative group">
      <div className="absolute left-4 top-4 z-10">
        <button
          onClick={() => onCopy(code)}
          aria-label={copied ? 'Code copied to clipboard' : 'Copy code to clipboard'}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all btn-focus ${
            copied
              ? 'bg-green-500 text-white'
              : 'bg-gray-700 text-gray-200 hover:bg-gray-600 shadow-lg'
          }`}
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? 'تم النسخ!' : 'نسخ الكود'}
        </button>
      </div>

      <div className="bg-gray-900 rounded-xl overflow-hidden shadow-2xl border border-gray-800">
        {/* Mac-style Window Header */}
        <div className="flex items-center gap-2 px-4 py-3 bg-gray-800 border-b border-gray-700">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="mr-auto text-xs text-gray-400 font-mono truncate ml-2">
            {fileName}
          </span>
        </div>

        {/* Code */}
        <pre className="p-6 overflow-x-auto text-sm font-mono leading-relaxed text-gray-300" dir="ltr">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
