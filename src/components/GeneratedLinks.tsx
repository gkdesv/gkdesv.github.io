
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

interface GeneratedLinksProps {
  links: string[];
}

export const GeneratedLinks = ({ links }: GeneratedLinksProps) => {
  const extractSetNumber = (link: string) => {
    // Extract just the set number after the product number and dash
    const parts = link.split('/');
    const lastPart = parts[parts.length - 1];
    const setNumber = lastPart.split('-')[1]; // Remove product number prefix
    return setNumber;
  };

  const highlightMiddleDigits = (setNumber: string) => {
    // The middle 5 digits are positions 4-8 in the set number (1000XXXXX...)
    const prefix = setNumber.slice(0, 4); // "1000"
    const middleDigits = setNumber.slice(4, 9); // "XXXXX"
    const suffix = setNumber.slice(9); // remaining digits
    
    return (
      <span className="font-mono">
        <span className="text-slate-400">{prefix}</span>
        <span className="font-bold text-emerald-400">{middleDigits}</span>
        <span className="text-slate-400">{suffix}</span>
      </span>
    );
  };

  return (
    <Card id="generated-links" className="bg-slate-800 border-slate-700 shadow-xl">
      <CardHeader className="border-b border-slate-700">
        <CardTitle className="text-emerald-400 font-semibold">
          Generated Links ({links.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="max-h-96 overflow-y-auto mt-6 mx-6 mb-6 border border-slate-700 rounded-md bg-slate-900">
          <div className="space-y-1 p-4">
            {links.map((link, index) => {
              const setNumber = extractSetNumber(link);
              return (
                <div key={index} className="flex items-center justify-between py-3 px-4 hover:bg-slate-800 rounded-lg transition-colors group">
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm flex-1 hover:text-emerald-300 transition-colors cursor-pointer"
                  >
                    {highlightMiddleDigits(setNumber)}
                  </a>
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-4 flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors group-hover:text-blue-300"
                  >
                    <span>Open Link</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
