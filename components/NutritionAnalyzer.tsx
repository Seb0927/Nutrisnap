'use client'

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Upload, Utensils, Camera } from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai";

export function NutritionAnalyzer() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recommendations, setRecommendations] = useState<string | null>(null);
  const [nutritionalValues, setNutritionalValues] = useState<{ name: string; amount: string; unit: string }[] | null>(null);

  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("NEXT_PUBLIC_GEMINI_API_KEY is not defined");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'models/gemini-1.5-flash' });

  async function generateResults(imageData: string) {
    try {
      let result = await model.generateContent([
        {
          inlineData: {
        data: imageData,
        mimeType: "image/jpeg",
          },
        },
        `Hola Gemini!
        En estos momentos necesito que te comportes como un nutricionista profesional.
        ¿Podrías generar en un párrafo corto una recomendación teniendo en cuenta si se trata de un plato balanceado o no? 
        Ten en cuenta que esta información se mostrará en un dashboard por lo que no empieces respondiendo "Claro que si" ni similares.`,
      ]);
      setRecommendations(result.response.text());
      // Process the result to extract nutritional values and recommendations
      // Update the state with the extracted data
      result = await model.generateContent([
        {
          inlineData: {
        data: imageData,
        mimeType: "image/jpeg",
          },
        },
        `Necesito que me brindes la información nutricional de este plato usando este formato JSON (No incluyas texto, solamente el JSON, y no agreges decoradores como \`\`\`json), me interesan las calorías, proteínas, carbohidratos, grasas, grasas saturadas y fibra. 
        
        Esto es solamente por motivos experimentales por lo que puedes inventar los valores que creas correctos:

        unity: { name: string; amount: string; unit: string }
        Retorna: Array<unity>
        `,
      ]);

      const jsonResponse = result.response.text().replace(/```json|```/g, '');
      const parsedResponse = JSON.parse(jsonResponse);
      setNutritionalValues(parsedResponse);

      // setNutritionalValues();
      
      /* setNutritionalValues([
        { name: "Calories", amount: "450", unit: "kcal" },
        { name: "Protein", amount: "25", unit: "g" },
        { name: "Carbohydrates", amount: "55", unit: "g" },
        { name: "Fat", amount: "15", unit: "g" },
        { name: "Fiber", amount: "8", unit: "g" },
      ]); */
    } catch (error) {
      console.error("Error generating results: ", error);
    } finally {
      setIsAnalyzing(false);
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target?.result as string;
        setSelectedImage(imageData);
        console.log("Image uploaded: " + imageData);
        analyzeImage(imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = (imageData: string) => {
    setIsAnalyzing(true);
    generateResults(imageData.split(',')[1]); // Remove the base64 prefix
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-[#8c7851]">Nutrition Analyzer</h1>
      <div className="grid gap-8 md:grid-cols-2">
        <Card className="h-min bg-white border-[#c0b9a8]">
          <CardHeader>
            <CardTitle className="text-[#8c7851]">Sube la foto de tu plato</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center w-full">
              <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-[#c0b9a8] border-dashed rounded-lg cursor-pointer bg-[#f8f5ed] hover:bg-[#e9e6de] transition-colors duration-300">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {selectedImage ? (
                    <Camera className="w-10 h-10 mb-3 text-[#8c7851]" />
                  ) : (
                    <Upload className="w-10 h-10 mb-3 text-[#8c7851]" />
                  )}
                  <p className="mb-2 text-sm text-[#5c4f3c]">
                    <span className="font-semibold">{selectedImage ? 'Cambiar imágen' : 'Click para subir'}</span> o arrastra y suelta aquí
                  </p>
                  <p className="text-xs text-[#8c7851]">PNG, JPG or GIF (MAX. 800x400px)</p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
              </label>
            </div>
            {selectedImage && (
              <div className="h-full mt-4 flex justify-center items-center">
                <img src={selectedImage} alt="Uploaded plate" className="max-w-full h-40 rounded-lg border-2 border-[#c0b9a8]" />
              </div>
            )}
          </CardContent>
        </Card>
        <div className="space-y-8">
          <Card className="bg-white border-[#c0b9a8]">
            <CardHeader>
              <CardTitle className="text-[#8c7851]">Asistente nutricional</CardTitle>
            </CardHeader>
            <CardContent>
              {isAnalyzing ? (
                <div className="flex items-center justify-center h-32">
                  <Utensils className="w-8 h-8 animate-spin text-[#8c7851]" />
                </div>
              ) : recommendations ? (
                <p className="text-[#5c4f3c]">{recommendations}</p>
              ) : (
                <p className="text-[#8c7851]">Sube una imagen para obtener recomendaciones</p>
              )}
            </CardContent>
          </Card>
          <Card className="bg-white border-[#c0b9a8]">
            <CardHeader>
              <CardTitle className="text-[#8c7851]">Valores nutricionales</CardTitle>
            </CardHeader>
            <CardContent>
              {isAnalyzing ? (
                <div className="flex items-center justify-center h-32">
                  <Utensils className="w-8 h-8 animate-spin text-[#8c7851]" />
                </div>
              ) : nutritionalValues ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Component</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Unit</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {nutritionalValues.map((nutrient, index) => (
                      <TableRow key={index}>
                        <TableCell className="text-[#5c4f3c]">{nutrient.name}</TableCell>
                        <TableCell className="text-[#5c4f3c]">{nutrient.amount}</TableCell>
                        <TableCell className="text-[#5c4f3c]">{nutrient.unit}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-[#8c7851]">Sube una imagen para ver los valores nutricionales</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}