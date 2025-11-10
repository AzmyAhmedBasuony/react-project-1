import { useEffect, useState } from "react";

interface Toast {
  id: number;
  type: "success" | "error";
  message: string;
}

export const Toaster = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const handleToast = (event: CustomEvent<{ type: "success" | "error"; message: string }>) => {
      const newToast: Toast = {
        id: Date.now(),
        type: event.detail.type,
        message: event.detail.message,
      };
      
      setToasts((prev) => [...prev, newToast]);

      // Auto remove toast after 5 seconds
      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== newToast.id));
      }, 5000);
    };

    window.addEventListener("app:toast", handleToast as EventListener);

    return () => {
      window.removeEventListener("app:toast", handleToast as EventListener);
    };
  }, []);

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-0 right-0 p-4 z-[10000] space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`min-w-[300px] max-w-md rounded-lg shadow-lg p-4 flex items-center justify-between ${
            toast.type === "success"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          <p className="flex-1 mr-4">{toast.message}</p>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-white hover:text-gray-200 font-bold text-xl"
            aria-label="Close"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};