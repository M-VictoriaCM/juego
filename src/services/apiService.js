//api de Gemini
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

// Función para obtener la explicación de la API de Gemini
export const fetchExplanation  = async (currentCard) => {
    if(!apiKey){
        return{
            explanation_segura: "La clave de la API no está configurada. Por favor, revisa tus variables de entorno o la configuración de tu entorno de ejecución.",
        riesgos_peligrosa: ""
        };
    }

    const bestOption = currentCard.options.find(opt => opt.points === 3) || currentCard.options[0];
    const worstOption = currentCard.options.find(opt => opt.points === -3) || currentCard.options[0];

    const prompt = `Explica en detalle por qué la siguiente respuesta es la más segura y responsable, y qué riesgos implica la respuesta más peligrosa. Utiliza un lenguaje sencillo para estudiantes de secundaria.

    Pregunta: ${currentCard.question}

    Respuesta más segura: ${bestOption.text}
    Respuesta más peligrosa: ${worstOption.text}`;

    let chatHistory = [];
    chatHistory.push({ role: "user", parts: [{ text: prompt }] });
    
    const payload = {
        contents: chatHistory,
        generationConfig: {
            responseMimeType: "application/json",
            responseSchema: {
                type: "OBJECT",
                properties: {
                    "explanation_segura": { "type": "STRING" },
                    "riesgos_peligrosa": { "type": "STRING" }
                }
            }
        }
    };
    
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    let response = null;
    let retries = 0;
    const maxRetries = 5;
    const initialDelay = 1000;

    while (retries < maxRetries) {
        try {
            response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (response.status !== 429) {
                break; // Exit loop on successful call or non-throttling error
            }

            const delay = initialDelay * Math.pow(2, retries);
            await new Promise(resolve => setTimeout(resolve, delay));
            retries++;

        } catch (error) {
            console.error("Error fetching explanation:", error);
            break; // Exit on other errors
        }
    }

    if (!response || !response.ok) {
        return{
          explanation_segura: "No se pudo obtener una explicación en este momento. Por favor, inténtalo de nuevo.",
          riesgos_peligrosa: ""
        };
    }

    const result = await response.json();

    if (result.candidates && result.candidates.length > 0 &&
        result.candidates[0].content && result.candidates[0].content.parts &&
        result.candidates[0].content.parts.length > 0) {
        const jsonText = result.candidates[0].content.parts[0].text;
        try {
            const parsedJson = JSON.parse(jsonText);
            return parsedJson;
        } catch (e) {
            console.error("Error parsing JSON response:", e);
            return{
                explanation_segura: "Hubo un error al procesar la respuesta. Por favor, inténtalo de nuevo.",
                riesgos_peligrosa: ""
            };
        }
    } 
    return{
        explanation_segura: "No se pudo obtener una explicación. Por favor, inténtalo de nuevo.",
        riesgos_peligrosa: ""
    }
};