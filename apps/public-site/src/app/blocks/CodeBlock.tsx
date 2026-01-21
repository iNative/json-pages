import React from 'react';
import { CodeBlockData, BlockSettings } from '@json-pages/shared-data';
import { useCodeBlock } from './CodeBlock.hooks';
import { Terminal } from 'lucide-react'; 

interface Props { data: CodeBlockData; settings?: BlockSettings; }

export const CodeBlock: React.FC<Props> = ({ data }) => {
  const { lines } = useCodeBlock(data);

  return (
    <section className="container mb-16">
      <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-white">
        <Terminal className="text-site-accent" size={24} />
        Quick Start
      </h2>

      {/* CODE BLOCK: bg-code, border, font-mono */}
      <div className="relative bg-site-code border border-site-border rounded-lg p-6 font-mono text-[0.9rem] text-[#a5d6ff] overflow-x-auto">
        
        {/* SHELL Label using absolute positioning like ::before in CSS */}
        <div className="absolute top-0 right-0 bg-site-border text-site-text-sec text-[0.7rem] px-2 py-0.5 rounded-bl-md select-none">
          SHELL
        </div>
        
        <div className="flex flex-col gap-3 mt-1">
          {lines.map((line, idx) => (
            <div key={idx}>
              {line.type === 'comment' && (
                // .comment color: #8b949e
                <span className="block text-[#8b949e] mb-1"># {line.text}</span>
              )}
              {line.type === 'command' && (
                // .cmd color: #fff
                <span className="font-bold text-white block">
                  {line.text}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};