import { useState } from 'react';
import SidebarSteps from './SidebarSteps';
import MainContent from './MainContent';

export default function AppLayout() {
  const [activeStep, setActiveStep] = useState(0);
  const [activeFile, setActiveFile] = useState(0);

  return (
    <div 
      className="flex h-screen bg-gray-50 text-gray-800 font-sans" 
      dir="rtl"
    >
      <SidebarSteps 
        activeStep={activeStep}
        activeFile={activeFile}
        onStepChange={setActiveStep}
        onFileChange={setActiveFile}
      />
      <MainContent 
        activeStep={activeStep}
        activeFile={activeFile}
      />
    </div>
  );
}
