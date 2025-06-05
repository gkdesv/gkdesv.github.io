
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Product, ProductGroup } from "@/pages/Index";

interface ProductFormProps {
  productGroups: ProductGroup[];
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  middleDigits: string;
  setMiddleDigits: (digits: string) => void;
  numberOfLinks: number;
  setNumberOfLinks: (count: number) => void;
  onGenerateLinks: () => void;
  darkMode: boolean;
}

export const ProductForm = ({
  productGroups,
  selectedProduct,
  setSelectedProduct,
  middleDigits,
  setMiddleDigits,
  numberOfLinks,
  setNumberOfLinks,
  onGenerateLinks,
  darkMode
}: ProductFormProps) => {
  const handleProductSelect = (productName: string) => {
    // Find the product across all groups
    let foundProduct: Product | null = null;
    for (const group of productGroups) {
      const product = group.products.find(p => p.name === productName);
      if (product) {
        foundProduct = product;
        break;
      }
    }
    
    if (foundProduct) {
      setSelectedProduct(foundProduct);
      setMiddleDigits(foundProduct.defaultMiddleDigits);
    }
  };

  return (
    <Card className={`mb-8 shadow-xl ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
      <CardHeader className={`border-b ${darkMode ? 'border-slate-700' : 'border-slate-200'}`}>
        <CardTitle className={`font-semibold ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>Product Configuration</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Product Selection */}
          <div>
            <Label htmlFor="product" className={`text-sm font-medium mb-2 block ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>Product</Label>
            <Select onValueChange={handleProductSelect}>
              <SelectTrigger className={`w-full border transition-colors ${darkMode ? 'bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600' : 'bg-white border-slate-300 text-slate-900 hover:bg-slate-50'}`}>
                <SelectValue placeholder="Select a product" />
              </SelectTrigger>
              <SelectContent className={`border z-50 ${darkMode ? 'bg-slate-700 border-slate-600' : 'bg-white border-slate-200'}`}>
                {productGroups.map((group) => (
                  <div key={group.name}>
                    <div className={`px-2 py-1.5 text-sm font-semibold ${darkMode ? 'text-emerald-400 bg-slate-800' : 'text-emerald-600 bg-slate-100'}`}>
                      {group.name}
                    </div>
                    {group.products.map((product) => (
                      <SelectItem 
                        key={product.name} 
                        value={product.name} 
                        className={`pl-6 ${darkMode ? 'text-slate-200 hover:bg-slate-600' : 'text-slate-700 hover:bg-slate-100'}`}
                      >
                        {product.name}
                      </SelectItem>
                    ))}
                  </div>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Product Number */}
          <div>
            <Label htmlFor="productNumber" className={`text-sm font-medium mb-2 block ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>Product Number</Label>
            <Input
              id="productNumber"
              value={selectedProduct?.productNumber || ""}
              placeholder="Auto-populated"
              disabled
              className={darkMode ? 'bg-slate-700 border-slate-600 text-slate-400' : 'bg-slate-100 border-slate-300 text-slate-500'}
            />
            <p className={`text-xs mt-1 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>Auto-populated</p>
          </div>

          {/* Set Number Template */}
          <div>
            <Label htmlFor="setTemplate" className={`text-sm font-medium mb-2 block ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>Set Number Template</Label>
            <Input
              id="setTemplate"
              value={selectedProduct?.setNumberTemplate || ""}
              placeholder="Auto-populated"
              disabled
              className={darkMode ? 'bg-slate-700 border-slate-600 text-slate-400' : 'bg-slate-100 border-slate-300 text-slate-500'}
            />
            <p className={`text-xs mt-1 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>Auto-populated</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Middle 5 Digits */}
          <div>
            <Label htmlFor="middleDigits" className={`text-sm font-medium mb-2 block ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>
              Middle 5 Digits (XXXXX)
            </Label>
            <Input
              id="middleDigits"
              value={middleDigits}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 5);
                setMiddleDigits(value);
              }}
              placeholder="Enter 5 digits (e.g., 12345)"
              maxLength={5}
              className={`border ${darkMode ? 'bg-slate-700 border-slate-600 text-slate-200 placeholder:text-slate-500 focus:border-emerald-400 focus:ring-emerald-400' : 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-emerald-500'}`}
            />
            <p className={`text-xs mt-1 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
              Links will be generated with this number + 0 to N in ascending order
            </p>
          </div>

          {/* Number of Links */}
          <div>
            <Label htmlFor="numberOfLinks" className={`text-sm font-medium mb-2 block ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>Number of Links</Label>
            <Input
              id="numberOfLinks"
              type="number"
              value={numberOfLinks}
              onChange={(e) => setNumberOfLinks(parseInt(e.target.value) || 300)}
              min={1}
              max={1000}
              className={`${darkMode ? 'bg-slate-700 border-slate-600 text-slate-200 focus:border-emerald-400 focus:ring-emerald-400' : 'bg-white border-slate-300 text-slate-900 focus:border-emerald-500 focus:ring-emerald-500'}`}
            />
            <p className={`text-xs mt-1 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>Maximum 1000 links</p>
          </div>
        </div>

        {/* Generate Button */}
        <div className="pt-4">
          <Button
            onClick={onGenerateLinks}
            disabled={!selectedProduct || middleDigits.length !== 5}
            className={`w-full font-medium py-3 rounded-md transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ${darkMode ? 'bg-emerald-600 hover:bg-emerald-500 text-white hover:shadow-emerald-500/25' : 'bg-emerald-600 hover:bg-emerald-700 text-white hover:shadow-emerald-600/25'}`}
          >
            Generate Links
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
