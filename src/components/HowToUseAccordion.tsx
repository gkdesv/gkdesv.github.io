
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const HowToUseAccordion = () => {
  return (
    <div className="rounded-2xl border mb-8 overflow-hidden backdrop-blur-xl transition-all duration-300 bg-slate-800/40 border-slate-700/60 shadow-2xl shadow-slate-900/20">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="how-to-use" className="border-none">
          <AccordionTrigger className="px-6 py-4 font-semibold text-left hover:no-underline transition-colors text-emerald-400 hover:text-emerald-300">
            How to Use
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2 text-slate-200">Choose a Product</h3>
                <p className="text-slate-300">Select the product you want. The fields will automatically fill in with default values.</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2 text-slate-200">Enter the Middle 5 Digits (if needed)</h3>
                <ul className="space-y-1 ml-4 text-slate-300">
                  <li>• Go to the Pop Now page for your chosen product.</li>
                  <li>• Look at the set number and find digits 5 through 9 (these are the "middle 5 digits").</li>
                  <li>• If the default set number isn't listed, enter your own middle 5 digits in the field provided.</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2 text-slate-200">Generate and Check Links</h3>
                <ul className="space-y-1 ml-4 text-slate-300">
                  <li>• Click "Generate Links" to create a list of potential sets.</li>
                  <li>• Click each link to see if it's available.</li>
                  <li>• If a set is in stock, click "Buy Multiple" and add all available sets to your cart.</li>
                </ul>
              </div>

              <div className="flex items-center text-slate-300">
                <span className="mr-2">🛒</span>
                <span>Good luck hunting!</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
