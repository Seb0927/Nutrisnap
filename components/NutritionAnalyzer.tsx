'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Upload, Utensils, Camera } from 'lucide-react'

export function NutritionAnalyzer() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [recommendations, setRecommendations] = useState<string | null>(null)
  const [nutritionalValues, setNutritionalValues] = useState<{ name: string; amount: string; unit: string }[] | null>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string)
        analyzeImage()
      }
      reader.readAsDataURL(file)
    }
  }

  const analyzeImage = () => {
    setIsAnalyzing(true)
    // Simulating API call delay
    setTimeout(() => {
      setRecommendations("Based on the image, this appears to be a balanced meal. The plate contains a good mix of proteins, carbohydrates, and vegetables. To improve, consider adding more leafy greens for increased fiber and micronutrients.")
      setNutritionalValues([
        { name: "Calories", amount: "450", unit: "kcal" },
        { name: "Protein", amount: "25", unit: "g" },
        { name: "Carbohydrates", amount: "55", unit: "g" },
        { name: "Fat", amount: "15", unit: "g" },
        { name: "Fiber", amount: "8", unit: "g" },
      ])
      setIsAnalyzing(false)
    }, 2000)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-[#8c7851]">Nutrition Analyzer</h1>
      <div className="grid gap-8 md:grid-cols-2">
        <Card className="bg-white border-[#c0b9a8]">
          <CardHeader>
            <CardTitle className="text-[#8c7851]">Upload Your Plate Photo</CardTitle>
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
                    <span className="font-semibold">{selectedImage ? 'Change photo' : 'Click to upload'}</span> or drag and drop
                  </p>
                  <p className="text-xs text-[#8c7851]">PNG, JPG or GIF (MAX. 800x400px)</p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
              </label>
            </div>
            {selectedImage && (
              <div className="mt-4 flex justify-center items-center">
                <img src={selectedImage} alt="Uploaded plate" className="max-w-full h-40 rounded-lg border-2 border-[#c0b9a8]" />
              </div>
            )}
          </CardContent>
        </Card>
        <div className="space-y-8">
          <Card className="bg-white border-[#c0b9a8]">
            <CardHeader>
              <CardTitle className="text-[#8c7851]">AI Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              {isAnalyzing ? (
                <div className="flex items-center justify-center h-32">
                  <Utensils className="w-8 h-8 animate-spin text-[#8c7851]" />
                </div>
              ) : recommendations ? (
                <p className="text-[#5c4f3c]">{recommendations}</p>
              ) : (
                <p className="text-[#8c7851]">Upload an image to get recommendations</p>
              )}
            </CardContent>
          </Card>
          <Card className="bg-white border-[#c0b9a8]">
            <CardHeader>
              <CardTitle className="text-[#8c7851]">Nutritional Values</CardTitle>
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
                      <TableHead className="text-[#8c7851]">Nutrient</TableHead>
                      <TableHead className="text-[#8c7851]">Amount</TableHead>
                      <TableHead className="text-[#8c7851]">Unit</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {nutritionalValues.map((nutrient, index) => (
                      <TableRow key={index} className="border-b border-[#c0b9a8]">
                        <TableCell className="font-medium text-[#5c4f3c]">{nutrient.name}</TableCell>
                        <TableCell className="text-[#5c4f3c]">{nutrient.amount}</TableCell>
                        <TableCell className="text-[#5c4f3c]">{nutrient.unit}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-[#8c7851]">Upload an image to see nutritional values</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}