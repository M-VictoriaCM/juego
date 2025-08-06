import React from "react";

const ExplanationModal = ({ 
  isOpen, 
  isLoading, 
  explanation, 
  onClose 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl max-w-xl w-full text-center max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-emerald-500 mb-4">Explicación</h2>
        {isLoading ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-emerald-500"></div>
          </div>
        ) : (
          explanation && (
            <div className="text-left text-gray-800 dark:text-gray-100 space-y-4">
              <div>
                <h3 className="font-bold text-lg text-green-600 dark:text-green-400">Respuesta más segura:</h3>
                <p>{String(explanation.explanation_segura)}</p>
              </div>
              <div>
                <h3 className="font-bold text-lg text-red-600 dark:text-red-400">Riesgos de la respuesta peligrosa:</h3>
                <p>{String(explanation.riesgos_peligrosa)}</p>
              </div>
              <div className="mt-6 flex justify-center">
                <button
                  onClick={onClose}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
                >
                  Cerrar
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ExplanationModal;