
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
}

export const ProductForm = ({
  productGroups,
  selectedProduct,
  setSelectedProduct,
  middleDigits,
  setMiddleDigits,
  numberOfLinks,
  setNumberOfLinks,
  onGenerateLinks
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
    <Card className="mb-8 bg-slate-800 border-slate-700 shadow-xl">
      <CardHeader className="border-b border-slate-700">
        <CardTitle className="text-emerald-400 font-semibold">Product Configuration</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Product Selection */}
          <div>
            <Label htmlFor="product" className="text-sm font-medium mb-2 block text-slate-200">Product</Label>
            <Select onValueChange={handleProductSelect}>
              <SelectTrigger className="w-full bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600 transition-colors">
                <SelectValue placeholder="Select a product" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600 z-50">
                {productGroups.map((group) => (
                  <div key={group.name}>
                    <div className="px-2 py-1.5 text-sm font-semibold text-emerald-400 bg-slate-800">
                      {group.name}
                    </div>
                    {group.products.map((product) => (
                      <SelectItem key={product.name} value={product.name} className="pl-6 text-slate-200 hover:bg-slate-600">
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
            <Label htmlFor="productNumber" className="text-sm font-medium mb-2 block text-slate-200">Product Number</Label>
            <Input
              id="productNumber"
              value={selectedProduct?.productNumber || ""}
              placeholder="Auto-populated"
              disabled
              className="bg-slate-700 border-slate-600 text-slate-400"
            />
            <p className="text-xs text-slate-500 mt-1">Auto-populated</p>
          </div>

          {/* Set Number Template */}
          <div>
            <Label htmlFor="setTemplate" className="text-sm font-medium mb-2 block text-slate-200">Set Number Template</Label>
            <Input
              id="setTemplate"
              value={selectedProduct?.setNumberTemplate || ""}
              placeholder="Auto-populated"
              disabled
              className="bg-slate-700 border-slate-600 text-slate-400"
            />
            <p className="text-xs text-slate-500 mt-1">Auto-populated</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Middle 5 Digits */}
          <div>
            <Label htmlFor="middleDigits" className="text-sm font-medium mb-2 block text-slate-200">
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
              className="bg-slate-700 border-slate-600 text-slate-200 placeholder:text-slate-500 focus:border-emerald-400 focus:ring-emerald-400"
            />
            <p className="text-xs text-slate-500 mt-1">
              Links will be generated with this number + 0 to N in ascending order
            </p>
          </div>

          {/* Number of Links */}
          <div>
            <Label htmlFor="numberOfLinks" className="text-sm font-medium mb-2 block text-slate-200">Number of Links</Label>
            <Input
              id="numberOfLinks"
              type="number"
              value={numberOfLinks}
              onChange={(e) => setNumberOfLinks(parseInt(e.target.value) || 100)}
              min={1}
              max={1000}
              className="bg-slate-700 border-slate-600 text-slate-200 focus:border-emerald-400 focus:ring-emerald-400"
            />
            <p className="text-xs text-slate-500 mt-1">Maximum 1000 links</p>
          </div>
        </div>

        {/* Generate Button */}
        <div className="pt-4">
          <Button
            onClick={onGenerateLinks}
            disabled={!selectedProduct || middleDigits.length !== 5}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-3 rounded-md transition-all duration-200 shadow-lg hover:shadow-emerald-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Generate Links
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
