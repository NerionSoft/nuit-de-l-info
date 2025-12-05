'use client';

import { useState } from 'react';
import { Save, FileText, Copy, Scissors, Clipboard } from 'lucide-react';

interface TextEditorProps {
  windowId: string;
}

export function TextEditor({ windowId }: TextEditorProps) {
  const [content, setContent] = useState(`# Welcome to Text Editor!

This is a simple text editor for Ubuntu Simulator.

You can:
- Write and edit text
- Use basic keyboard shortcuts (Ctrl+C, Ctrl+V, etc.)

Try writing some code or notes here!

---

Example code:
\`\`\`javascript
function hello() {
  console.log("Hello, Ubuntu!");
}
\`\`\`

Have fun exploring! 🐧
`);
  const [fileName, setFileName] = useState('untitled.txt');
  const [saved, setSaved] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    setSaved(false);
  };

  const handleSave = () => {
    // Simulate save
    setSaved(true);
    // In a real app, this would save to the file system
  };

  return (
    <div className="h-full flex flex-col bg-[#1E1E1E] text-white">
      {/* Menu Bar */}
      <div className="h-10 bg-[#2D2D2D] border-b border-white/10 flex items-center px-2 gap-1">
        <button className="px-3 py-1 text-sm hover:bg-white/10 rounded transition-colors">
          File
        </button>
        <button className="px-3 py-1 text-sm hover:bg-white/10 rounded transition-colors">
          Edit
        </button>
        <button className="px-3 py-1 text-sm hover:bg-white/10 rounded transition-colors">
          View
        </button>
        <button className="px-3 py-1 text-sm hover:bg-white/10 rounded transition-colors">
          Help
        </button>
      </div>

      {/* Toolbar */}
      <div className="h-10 bg-[#252526] border-b border-white/10 flex items-center px-3 gap-2">
        <button
          onClick={handleSave}
          className="p-1.5 rounded hover:bg-white/10 transition-colors"
          title="Save (Ctrl+S)"
        >
          <Save className="w-4 h-4" />
        </button>
        <div className="w-px h-5 bg-white/20" />
        <button
          className="p-1.5 rounded hover:bg-white/10 transition-colors"
          title="Cut (Ctrl+X)"
        >
          <Scissors className="w-4 h-4" />
        </button>
        <button
          className="p-1.5 rounded hover:bg-white/10 transition-colors"
          title="Copy (Ctrl+C)"
        >
          <Copy className="w-4 h-4" />
        </button>
        <button
          className="p-1.5 rounded hover:bg-white/10 transition-colors"
          title="Paste (Ctrl+V)"
        >
          <Clipboard className="w-4 h-4" />
        </button>

        {/* File name */}
        <div className="flex-1 flex items-center justify-center">
          <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded">
            <FileText className="w-4 h-4 text-white/60" />
            <span className="text-sm">
              {fileName}
              {!saved && ' •'}
            </span>
          </div>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 flex">
        {/* Line Numbers */}
        <div className="w-12 bg-[#1E1E1E] border-r border-white/10 py-3 text-right pr-3 text-white/30 text-sm font-mono select-none">
          {content.split('\n').map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>

        {/* Text Area */}
        <textarea
          value={content}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === 's' && (e.ctrlKey || e.metaKey)) {
              e.preventDefault();
              handleSave();
            }
          }}
          className="flex-1 bg-transparent p-3 resize-none outline-none font-mono text-sm leading-relaxed text-white/90"
          spellCheck={false}
        />
      </div>

      {/* Status Bar */}
      <div className="h-6 bg-[#2D2D2D] border-t border-white/10 flex items-center justify-between px-3 text-xs text-white/60">
        <span>
          Ln {content.substring(0, content.length).split('\n').length}, Col 1
        </span>
        <span>{saved ? 'Saved' : 'Modified'}</span>
        <span>UTF-8</span>
      </div>
    </div>
  );
}
