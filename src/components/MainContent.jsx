import { useState } from 'react';
import { ArrowLeft, List } from 'lucide-react';
import { steps } from '../data/steps';
import CodeBlock from './CodeBlock';
import HintCard from './HintCard';
import ExplanationList from './ExplanationList';

export default function MainContent({ activeStep, activeFile }) {
  const [copied, setCopied] = useState(false);

  const currentCategory = steps[activeStep];
  const currentFile = currentCategory.files[activeFile];

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
      {/* Header */}
      <div className="bg-white p-6 border-b border-gray-200 shadow-sm">
        <div className="flex items-center gap-3 text-sm text-gray-500 mb-2 font-mono flex-wrap">
          <span className="bg-gray-100 px-2 py-1 rounded">
            {currentCategory.category.split(' ')[1]}
          </span>
          <ArrowLeft className="w-4 h-4 hidden md:block" />
          <span className="font-semibold text-blue-600">{currentFile.name}</span>
        </div>

        {/* Hint Card */}
        <HintCard hint={currentFile.hint} />
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Description Section */}
          <div className="prose prose-lg max-w-none">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <List className="w-6 h-6 text-blue-500" />
              ماذا يفعل هذا الملف؟
            </h2>
            <ExplanationList items={currentFile.explanation} />
          </div>

          {/* Code Block */}
          <CodeBlock 
            code={currentFile.code}
            fileName={currentFile.name}
            copied={copied}
            onCopy={handleCopy}
          />
        </div>
      </div>
    </div>
  );
}
