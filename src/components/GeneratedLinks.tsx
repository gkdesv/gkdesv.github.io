
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface GeneratedLinksProps {
  links: string[];
}

export const GeneratedLinks = ({ links }: GeneratedLinksProps) => {
  return (
    <Card id="generated-links" className="border border-gray-300">
      <CardHeader className="border-b border-gray-300">
        <CardTitle className="text-red-500 font-semibold">
          Generated Links ({links.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="max-h-96 overflow-y-auto m-6 border border-gray-200 rounded-md">
          <div className="space-y-1 p-4">
            {links.map((link, index) => (
              <div key={index} className="flex items-center justify-between py-2 px-3 hover:bg-gray-50 rounded">
                <span className="text-sm text-gray-600 font-mono flex-1">
                  Set {index + 1}: {link.split('/').pop()}
                </span>
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-4 text-blue-600 hover:text-blue-800 text-sm font-medium underline"
                >
                  Open Link
                </a>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
