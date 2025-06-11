
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
    <Card className={`mb-8 backdrop-blur-xl border rounded-2xl transition-all duration-300 ${
      darkMode 
        ? 'bg-slate-800/40 border-slate-700/60 shadow-2xl shadow-slate-900/20' 
        : 'bg-white/70 border-slate-200/50 shadow-xl shadow-slate-400/10'
    }`}>
      <CardHeader className={`border-b rounded-t-2xl ${
        darkMode 
          ? 'border-slate-700/60 bg-gradient-to-r from-slate-800/50 to-slate-700/30' 
          : 'border-slate-200/50 bg-gradient-to-r from-white/60 to-slate-50/40'
      }`}>
        <CardTitle className={`font-semibold ${
          darkMode ? 'text-emerald-400' : 'text-emerald-600'
        }`}>Product Configuration</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Product Selection */}
          <div>
            <Label htmlFor="product" className={`text-sm font-medium mb-2 block ${
              darkMode ? 'text-slate-200' : 'text-slate-700'
            }`}>Product</Label>
            <Select onValueChange={handleProductSelect}>
              <SelectTrigger className={`w-full border transition-all duration-200 backdrop-blur-sm rounded-xl ${
                darkMode 
                  ? 'bg-slate-700/50 border-slate-600/60 text-slate-200 hover:bg-slate-600/50 shadow-lg shadow-slate-900/10' 
                  : 'bg-white/80 border-slate-300/60 text-slate-800 hover:bg-white/90 shadow-md shadow-slate-400/5'
              }`}>
                <SelectValue placeholder="Select a product" />
              </SelectTrigger>
              <SelectContent className={`border rounded-xl backdrop-blur-xl z-50 ${
                darkMode 
                  ? 'bg-slate-700/90 border-slate-600/60 shadow-2xl shadow-slate-900/40' 
                  : 'bg-white/90 border-slate-200/60 shadow-xl shadow-slate-400/20'
              }`}>
                {productGroups.map((group) => (
                  <div key={group.name}>
                    <div className={`px-2 py-1.5 text-sm font-semibold rounded-lg ${
                      darkMode 
                        ? 'text-emerald-400 bg-slate-800/60' 
                        : 'text-emerald-600 bg-slate-100/80'
                    }`}>
                      {group.name}
                    </div>
                    {group.products.map((product) => (
                      <SelectItem 
                        key={product.name} 
                        value={product.name} 
                        className={`pl-6 transition-colors rounded-lg ${
                          darkMode 
                            ? 'text-slate-200 hover:bg-slate-600/60 focus:bg-slate-600/60' 
                            : 'text-slate-700 hover:bg-slate-100/80 focus:bg-slate-100/80'
                        }`}
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
            <Label htmlFor="productNumber" className={`text-sm font-medium mb-2 block ${
              darkMode ? 'text-slate-200' : 'text-slate-700'
            }`}>Product Number</Label>
            <Input
              id="productNumber"
              value={selectedProduct?.productNumber || ""}
              placeholder="Auto-populated"
              disabled
              className={`backdrop-blur-sm rounded-xl ${
                darkMode 
                  ? 'bg-slate-700/30 border-slate-600/60 text-slate-400' 
                  : 'bg-slate-100/70 border-slate-300/60 text-slate-500'
              }`}
            />
            <p className={`text-xs mt-1 ${
              darkMode ? 'text-slate-500' : 'text-slate-400'
            }`}>Auto-populated</p>
          </div>

          {/* Set Number Template */}
          <div>
            <Label htmlFor="setTemplate" className={`text-sm font-medium mb-2 block ${
              darkMode ? 'text-slate-200' : 'text-slate-700'
            }`}>Set Number Template</Label>
            <Input
              id="setTemplate"
              value={selectedProduct?.setNumberTemplate || ""}
              placeholder="Auto-populated"
              disabled
              className={`backdrop-blur-sm rounded-xl ${
                darkMode 
                  ? 'bg-slate-700/30 border-slate-600/60 text-slate-400' 
                  : 'bg-slate-100/70 border-slate-300/60 text-slate-500'
              }`}
            />
            <p className={`text-xs mt-1 ${
              darkMode ? 'text-slate-500' : 'text-slate-400'
            }`}>Auto-populated</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Middle 5 Digits */}
          <div>
            <Label htmlFor="middleDigits" className={`text-sm font-medium mb-2 block ${
              darkMode ? 'text-slate-200' : 'text-slate-700'
            }`}>
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
              className={`border backdrop-blur-sm rounded-xl transition-all duration-200 ${
                darkMode 
                  ? 'bg-slate-700/50 border-slate-600/60 text-slate-200 placeholder:text-slate-500 focus:border-emerald-400/80 focus:ring-emerald-400/30 shadow-lg shadow-slate-900/10' 
                  : 'bg-white/80 border-slate-300/60 text-slate-800 placeholder:text-slate-400 focus:border-emerald-500/80 focus:ring-emerald-500/30 shadow-md shadow-slate-400/5'
              }`}
            />
            <p className={`text-xs mt-1 ${
              darkMode ? 'text-slate-500' : 'text-slate-400'
            }`}>
              Links will be generated with this number + 0 to N in ascending order
            </p>
          </div>

          {/* Number of Links */}
          <div>
            <Label htmlFor="numberOfLinks" className={`text-sm font-medium mb-2 block ${
              darkMode ? 'text-slate-200' : 'text-slate-700'
            }`}>Number of Links</Label>
            <Input
              id="numberOfLinks"
              type="number"
              value={numberOfLinks}
              onChange={(e) => setNumberOfLinks(parseInt(e.target.value) || 300)}
              min={1}
              max={1000}
              className={`backdrop-blur-sm rounded-xl transition-all duration-200 ${
                darkMode 
                  ? 'bg-slate-700/50 border-slate-600/60 text-slate-200 focus:border-emerald-400/80 focus:ring-emerald-400/30 shadow-lg shadow-slate-900/10' 
                  : 'bg-white/80 border-slate-300/60 text-slate-800 focus:border-emerald-500/80 focus:ring-emerald-500/30 shadow-md shadow-slate-400/5'
              }`}
            />
            <p className={`text-xs mt-1 ${
              darkMode ? 'text-slate-500' : 'text-slate-400'
            }`}>Maximum 1000 links</p>
          </div>
        </div>

        {/* Generate Button */}
        <div className="pt-4">
          <Button
            onClick={onGenerateLinks}
            disabled={!selectedProduct || middleDigits.length !== 5}
            className={`w-full font-medium py-3 rounded-xl transition-all duration-300 backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-[1.02] ${
              darkMode 
                ? 'bg-gradient-to-r from-emerald-600/90 to-emerald-500/80 hover:from-emerald-500/90 hover:to-emerald-400/80 text-white shadow-emerald-500/25 hover:shadow-emerald-400/30' 
                : 'bg-gradient-to-r from-emerald-600/95 to-emerald-700/90 hover:from-emerald-700/95 hover:to-emerald-800/90 text-white shadow-emerald-600/25 hover:shadow-emerald-700/30'
            }`}
          >
            Generate Links
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
