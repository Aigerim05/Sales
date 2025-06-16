
import { Check } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressIndicator = ({ currentStep, totalSteps }: ProgressIndicatorProps) => {
  const { isDark } = useTheme();
  
  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="flex items-center justify-between">
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          
          return (
            <div key={stepNumber} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full transition-all ${
                isCompleted 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                  : isCurrent 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white ring-4 ring-blue-200 dark:ring-blue-800' 
                    : isDark 
                      ? 'bg-gray-700 text-gray-400 border-2 border-gray-600' 
                      : 'bg-gray-200 text-gray-500 border-2 border-gray-300'
              }`}>
                {isCompleted ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span className="text-sm font-medium">{stepNumber}</span>
                )}
              </div>
              
              <div className={`ml-3 ${isCurrent || isCompleted ? 'text-blue-600 dark:text-blue-400' : isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                <span className="text-sm font-medium">
                  Step {stepNumber} of {totalSteps}
                </span>
              </div>
              
              {stepNumber < totalSteps && (
                <div className={`w-16 h-0.5 mx-4 ${
                  isCompleted 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600' 
                    : isDark 
                      ? 'bg-gray-700' 
                      : 'bg-gray-200'
                }`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressIndicator;
