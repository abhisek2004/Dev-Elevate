import { useEffect } from "react"
import { AlertCircle, X } from "lucide-react"

interface ToastProps {
  message: string
  onClose: () => void
  darkMode?: boolean
}

//Reusable Toast component with Dark/Light mode support
export default function Toast({ message, onClose, darkMode = false }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className={`fixed top-5 right-5 min-w-[320px] flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border z-50 transition-all ${darkMode? "bg-gray-800 text-yellow-400 border-gray-700": "bg-white text-yellow-600 border-gray-200"}`}>
        <div className={`flex-shrink-0 rounded p-1 ${ darkMode? "bg-yellow-500/20": "bg-yellow-500"}`}>
          <AlertCircle className={`w-4 h-4 ${darkMode ? "text-yellow-400" : "text-white"}`} />
        </div>
        <div className={`flex-1 text-sm font-medium ${darkMode ? "text-yellow-400" : "text-yellow-600"}`}>
            {message}
        </div>
        <button onClick={onClose} className={`flex-shrink-0 transition-colors ${darkMode ? "text-yellow-400 hover:text-yellow-300": "text-yellow-600 hover:text-yellow-700"}`}>
            <X className="w-4 h-4" />
        </button>
    </div>
  )
}