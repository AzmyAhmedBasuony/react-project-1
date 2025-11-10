import { useEffect, useState } from "react";

export const SpinnerOverlay = () => {
  const [spinnerCount, setSpinnerCount] = useState(0);

  useEffect(() => {
    const handleShowSpinner = () => {
      setSpinnerCount((prev) => {
        const newCount = prev + 1;
        console.log("Show spinner event received, count:", prev, "->", newCount);
        return newCount;
      });
    };

    const handleHideSpinner = (event?: any) => {
      setSpinnerCount((prev) => {
        // If the event includes expectedCount and it's 0, reset to 0
        const expectedCount = event?.detail?.expectedCount;
        if (expectedCount === 0 && prev > 0) {
          console.log("Hide spinner event received with expectedCount 0, resetting count from", prev, "to 0");
          return 0;
        }
        const newCount = Math.max(0, prev - 1);
        console.log("Hide spinner event received, count:", prev, "->", newCount);
        return newCount;
      });
    };

    window.addEventListener("app:show-spinner", handleShowSpinner);
    window.addEventListener("app:hide-spinner", handleHideSpinner);

    return () => {
      window.removeEventListener("app:show-spinner", handleShowSpinner);
      window.removeEventListener("app:hide-spinner", handleHideSpinner);
    };
  }, []);

  if (spinnerCount === 0) return null;

  return (
    <div className="fixed inset-0 z-[99999] 
    bg-white/50 flex items-center justify-center backdrop-blur-md">
      <div className="relative flex flex-col items-center">
        {/* Main spinner with gradient effect */}
        <div className="relative h-20 w-20">
          {/* Outer ring - primary spinner */}
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-blue-500 border-r-blue-500"></div>
          {/* Middle ring - secondary spinner (counter-rotate) */}
          <div 
            className="absolute inset-2 animate-spin rounded-full border-[3px] border-transparent border-b-blue-600 border-l-blue-600"
            style={{ animationDirection: 'reverse', animationDuration: '1.2s' }}
          ></div>
          {/* Inner ring - accent spinner */}
          <div 
            className="absolute inset-4 animate-spin rounded-full border-2 border-transparent border-t-blue-400 border-r-blue-400"
            style={{ animationDuration: '0.8s' }}
          ></div>
          {/* Center dot with pulse effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-blue-600 animate-pulse"></div>
        </div>
        {/* Optional: Loading text with fade effect */}
        <p className="mt-4 text-sm font-medium text-gray-700 dark:text-gray-300 animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
};

