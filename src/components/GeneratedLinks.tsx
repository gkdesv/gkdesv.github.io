
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
    const prefix = setNumber.slice(0, 4); // "1000" or "1001"
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
    <Card id="generated-links" className="backdrop-blur-xl border rounded-2xl transition-all duration-300 bg-slate-800/40 border-slate-700/60 shadow-2xl shadow-slate-900/20">
      <CardHeader className="border-b rounded-t-2xl border-slate-700/60 bg-gradient-to-r from-slate-800/50 to-slate-700/30">
        <CardTitle className="font-semibold text-emerald-400">
          Generated Links ({links.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="max-h-96 overflow-y-auto mt-6 mx-6 mb-6 border rounded-xl backdrop-blur-sm border-slate-700/60 bg-slate-900/30">
          <div className="space-y-1 p-4">
            {links.map((link, index) => {
              const setNumber = extractSetNumber(link);
              return (
                <div key={index} className="flex items-center justify-between py-3 px-4 rounded-lg transition-all duration-200 group backdrop-blur-sm hover:bg-slate-800/60 hover:shadow-lg hover:shadow-slate-900/20">
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm flex-1 transition-all duration-200 cursor-pointer transform hover:scale-[1.02] hover:text-emerald-300"
                  >
                    {highlightMiddleDigits(setNumber)}
                  </a>
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-4 flex items-center gap-2 text-sm font-medium transition-all duration-200 px-3 py-1.5 rounded-lg backdrop-blur-sm transform hover:scale-105 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 border border-blue-500/20"
                  >
                    <span>Link</span>
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
