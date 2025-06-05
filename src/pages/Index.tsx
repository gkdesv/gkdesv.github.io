
import { useState, useEffect } from "react";
import { ProductForm } from "@/components/ProductForm";
import { GeneratedLinks } from "@/components/GeneratedLinks";
import { HowToUseAccordion } from "@/components/HowToUseAccordion";
import { ThemeToggle } from "@/components/ThemeToggle";

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
        defaultMiddleDigits: "20249"
      },
      {
        name: "Exciting Macarons",
        productNumber: "40",
        setNumberTemplate: "1000XXXXX00280",
        defaultMiddleDigits: "67735"
      },
      {
        name: "Have a Seat",
        productNumber: "50",
        setNumberTemplate: "1000XXXXX00350",
        defaultMiddleDigits: "75263"
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
  }
];

const Index = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [middleDigits, setMiddleDigits] = useState("");
  const [numberOfLinks, setNumberOfLinks] = useState(300);
  const [generatedLinks, setGeneratedLinks] = useState<string[]>([]);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 bg-gradient-to-br light:from-slate-50 light:via-slate-100 light:to-slate-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8 relative">
          <div className="absolute top-0 right-0">
            <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
          </div>
          <h1 className="text-4xl font-bold text-emerald-400 dark:text-emerald-400 light:text-emerald-600 mb-2">Pop Now Link Generator</h1>
          <p className="text-slate-300 dark:text-slate-300 light:text-slate-600">Generate multiple Pop Now product links with ease</p>
        </div>

        {/* How to Use Section */}
        <HowToUseAccordion darkMode={darkMode} />

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
          darkMode={darkMode}
        />

        {/* Generated Links */}
        {generatedLinks.length > 0 && (
          <GeneratedLinks links={generatedLinks} darkMode={darkMode} />
        )}
      </div>
    </div>
  );
};

export default Index;
