
import { useState } from "react";
import { ProductForm } from "@/components/ProductForm";
import { GeneratedLinks } from "@/components/GeneratedLinks";
import { HowToUseAccordion } from "@/components/HowToUseAccordion";

export interface Product {
  name: string;
  productNumber: string;
  setNumberTemplate: string;
  defaultMiddleDigits: string;
}

export interface ProductGroup {
  name: string;
  products: Product[];
}

const productGroups: ProductGroup[] = [
  {
    name: "LABUBU",
    products: [
      {
        name: "Big into Energy",
        productNumber: "195",
        setNumberTemplate: "1000XXXXX00585",
        defaultMiddleDigits: "24691"
      },
      {
        name: "Exciting Macaron",
        productNumber: "40",
        setNumberTemplate: "1000XXXXX00280",
        defaultMiddleDigits: "85463"
      },
      {
        name: "Have a Seat",
        productNumber: "50",
        setNumberTemplate: "1001XXXXX00350",
        defaultMiddleDigits: "08113"
      }
    ]
  },
  {
    name: "CRYBABY",
    products: [
      {
        name: "Wild but Cutie",
        productNumber: "215",
        setNumberTemplate: "1000XXXXX00645",
        defaultMiddleDigits: "06489"
      }
    ]
  },
  {
    name: "θSKULLPANDA",
    products: [
      {
        name: "L'impressionnisme",
        productNumber: "272",
        setNumberTemplate: "1000XXXXX01904",
        defaultMiddleDigits: "67770"
      }
    ]
  }
];

const Index = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [middleDigits, setMiddleDigits] = useState("");
  const [numberOfLinks, setNumberOfLinks] = useState(600);
  const [generatedLinks, setGeneratedLinks] = useState<string[]>([]);

  const generateLinks = () => {
    if (!selectedProduct || !middleDigits || middleDigits.length !== 5) {
      return;
    }

    const links: string[] = [];
    const baseNumber = parseInt(middleDigits);
    
    for (let i = 0; i < numberOfLinks; i++) {
      const currentNumber = (baseNumber + i).toString().padStart(5, '0');
      const setNumber = selectedProduct.setNumberTemplate.replace('XXXXX', currentNumber);
      const link = `https://www.popmart.com/us/pop-now/set/${selectedProduct.productNumber}-${setNumber}`;
      links.push(link);
    }
    
    setGeneratedLinks(links);
    
    // Scroll to generated links
    setTimeout(() => {
      const generatedSection = document.getElementById('generated-links');
      if (generatedSection) {
        generatedSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen transition-all duration-300 bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-slate-900/95">
      {/* Liquid glass background overlay */}
      <div className="fixed inset-0 pointer-events-none bg-gradient-to-br from-slate-900/20 via-transparent to-slate-800/20 backdrop-blur-[1px]" />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl relative">
        {/* Header */}
        <div className="text-center mb-8 relative">
          <div className="backdrop-blur-md rounded-3xl p-8 border transition-all duration-300 bg-slate-800/30 border-slate-700/50 shadow-2xl shadow-slate-900/20">
            <h1 className="text-4xl font-bold mb-2 transition-colors text-emerald-400">
              Pop Now Link Generator
            </h1>
            <p className="transition-colors text-slate-300">
              Generate multiple Pop Now product links with ease
            </p>
          </div>
        </div>

        {/* How to Use Section */}
        <HowToUseAccordion />

        {/* Product Configuration */}
        <ProductForm
          productGroups={productGroups}
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          middleDigits={middleDigits}
          setMiddleDigits={setMiddleDigits}
          numberOfLinks={numberOfLinks}
          setNumberOfLinks={setNumberOfLinks}
          onGenerateLinks={generateLinks}
        />

        {/* Generated Links */}
        {generatedLinks.length > 0 && (
          <GeneratedLinks links={generatedLinks} />
        )}
      </div>
    </div>
  );
};

export default Index;
