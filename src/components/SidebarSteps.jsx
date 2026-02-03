import { Book } from 'lucide-react';
import { steps } from '../data/steps';
import { useEffect, useRef } from 'react';

export default function SidebarSteps({ activeStep, activeFile, onStepChange, onFileChange }) {
  const stepButtonsRef = useRef([]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowUp' && activeStep > 0) {
        onStepChange(activeStep - 1);
        onFileChange(0);
      } else if (e.key === 'ArrowDown' && activeStep < steps.length - 1) {
        onStepChange(activeStep + 1);
        onFileChange(0);
      } else if (e.key === 'Enter') {
        stepButtonsRef.current[activeStep]?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeStep, onStepChange, onFileChange]);

  return (
    <div className="w-1/3 md:w-1/4 bg-white border-l border-gray-200 flex flex-col shadow-lg z-10">
      {/* Header */}
      <div className="p-6 border-b border-gray-100 bg-blue-600 text-white">
        <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2">
          <Book className="w-6 h-6" />
          خريطة المشروع
        </h1>
        <p className="text-blue-100 text-sm mt-2">To-Do App Backend Roadmap</p>
      </div>

      {/* Steps List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {steps.map((step, index) => {
          const StepIcon = step.icon;
          return (
            <button
              key={step.id}
              ref={(el) => stepButtonsRef.current[index] = el}
              onClick={() => {
                onStepChange(index);
                onFileChange(0);
              }}
              onKeyDown={(e) => {
                if (e.key === 'ArrowRight') {
                  e.preventDefault();
                  onFileChange(0);
                }
              }}
              aria-label={`Step ${step.category}`}
              aria-current={activeStep === index ? 'step' : undefined}
              className={`w-full text-right rounded-xl p-4 transition-all duration-200 border-2 step-focus ${
                activeStep === index
                  ? 'bg-blue-50 border-blue-500 shadow-md transform scale-[1.02]'
                  : 'bg-white border-transparent hover:border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className={`p-2 rounded-lg ${
                    activeStep === index ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  <StepIcon className="w-5 h-5" />
                </div>
                <h3
                  className={`font-bold text-sm md:text-base ${
                    activeStep === index ? 'text-blue-700' : 'text-gray-700'
                  }`}
                >
                  {step.category}
                </h3>
              </div>

              {/* Files Submenu */}
              {activeStep === index && (
                <div className="mr-11 space-y-1">
                  {step.files.map((file, fIndex) => (
                    <button
                      key={fIndex}
                      onClick={(e) => {
                        e.stopPropagation();
                        onFileChange(fIndex);
                      }}
                      aria-label={`File: ${file.name}`}
                      aria-current={activeFile === fIndex ? 'page' : undefined}
                      className={`w-full text-right text-sm px-3 py-1.5 rounded-md flex items-center gap-2 transition-colors step-focus ${
                        activeFile === fIndex
                          ? 'bg-blue-100 text-blue-700 font-medium'
                          : 'text-gray-500 hover:bg-gray-100'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                      {file.name.split('/').pop()}
                    </button>
                  ))}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
