import { useState } from 'react';
import { fetchExplanation as fetchExplanationAPI } from '../services/apiService';

export const useExplanation= () =>{
    // Estados para la funcionalidad del LLM
    const [explanation, setExplanation] = useState(null);
    const [isLoadingExplanation, setIsLoadingExplanation] = useState(false);
    const [isExplanationModalOpen, setIsExplanationModalOpen] = useState(false);

    const fetchExplanation = async (question) => {
        setIsLoadingExplanation(true);
        setExplanation(null);
        setIsExplanationModalOpen(true);

        try{
            const result = await fetchExplanationAPI(question);
            setExplanation(result);
        }catch(error){
            console.error('Error fetching explanation:', error);
            setExplanation({
                explanation_segura: "Hubo un error al obtener la explicación. Por favor, inténtalo de nuevo.",
                riesgos_peligrosa: ""
            });
        } finally {
            setIsLoadingExplanation(false);
        }

    }
const closeExplanationModal = () => {
    setIsExplanationModalOpen(false);
  };

  const resetExplanation = () => {
    setExplanation(null);
    setIsExplanationModalOpen(false);
  };

  return {
    explanation,
    isLoadingExplanation,
    isExplanationModalOpen,
    fetchExplanation,
    closeExplanationModal,
    resetExplanation
  };
};
