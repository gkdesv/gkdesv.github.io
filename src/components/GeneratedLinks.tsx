
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

interface GeneratedLinksProps {
  links: string[];
  darkMode: boolean;
}

export const GeneratedLinks = ({ links, darkMode }: GeneratedLinksProps) => {
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
        <span className={darkMode ? "text-slate-400" : "text-slate-500"}>{prefix}</span>
        <span className={`font-bold ${darkMode ? "text-emerald-400" : "text-emerald-600"}`}>{middleDigits}</span>
        <span className={darkMode ? "text-slate-400" : "text-slate-500"}>{suffix}</span>
      </span>
    );
  };

  return (
    <Card id="generated-links" className={`shadow-xl ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
      <CardHeader className={`border-b ${darkMode ? 'border-slate-700' : 'border-slate-200'}`}>
        <CardTitle className={`font-semibold ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
          Generated Links ({links.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className={`max-h-96 overflow-y-auto mt-6 mx-6 mb-6 border rounded-md ${darkMode ? 'border-slate-700 bg-slate-900' : 'border-slate-200 bg-slate-50'}`}>
          <div className="space-y-1 p-4">
            {links.map((link, index) => {
              const setNumber = extractSetNumber(link);
              return (
                <div key={index} className={`flex items-center justify-between py-3 px-4 rounded-lg transition-colors group ${darkMode ? 'hover:bg-slate-800' : 'hover:bg-white'}`}>
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-sm flex-1 transition-colors cursor-pointer ${darkMode ? 'hover:text-emerald-300' : 'hover:text-emerald-700'}`}
                  >
                    {highlightMiddleDigits(setNumber)}
                  </a>
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`ml-4 flex items-center gap-2 text-sm font-medium transition-colors ${darkMode ? 'text-blue-400 hover:text-blue-300 group-hover:text-blue-300' : 'text-blue-600 hover:text-blue-700 group-hover:text-blue-700'}`}
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
