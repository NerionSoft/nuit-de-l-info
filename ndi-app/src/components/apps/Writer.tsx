'use client';

import { useState } from 'react';
import {
  Save,
  FileText,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Undo,
  Redo,
  Printer,
  FileDown,
} from 'lucide-react';

interface WriterProps {
  windowId: string;
}

export function Writer({ windowId }: WriterProps) {
  const [content, setContent] = useState(`Bienvenue dans LibreOffice Writer !

LibreOffice est une suite bureautique libre et gratuite. Elle est compatible avec Microsoft Office et disponible sur Linux, Windows et macOS.

Writer est l'équivalent libre de Microsoft Word. Il permet de :
- Créer des documents texte
- Mettre en forme du contenu
- Insérer des images et tableaux
- Exporter en PDF

Le format natif est .odt (Open Document Text), un format ouvert et standardisé.

Astuce : Sur Ubuntu, tu peux aussi ouvrir Writer depuis le terminal avec la commande :
$ libreoffice --writer

Bonne découverte !
`);
  const [fileName, setFileName] = useState('Sans titre 1.odt');
  const [saved, setSaved] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
  };

  return (
    <div className="h-full flex flex-col bg-[#F5F5F5]">
      {/* Menu Bar - LibreOffice style */}
      <div className="h-8 bg-[#E8E8E8] border-b border-[#C8C8C8] flex items-center px-1 gap-0.5 text-[#333]">
        {['Fichier', 'Édition', 'Affichage', 'Insertion', 'Format', 'Styles', 'Tableau', 'Outils', 'Fenêtre', 'Aide'].map((menu) => (
          <button
            key={menu}
            className="px-2 py-0.5 text-xs hover:bg-[#D0D0D0] rounded transition-colors"
          >
            {menu}
          </button>
        ))}
      </div>

      {/* Toolbar - LibreOffice style */}
      <div className="bg-[#E8E8E8] border-b border-[#C8C8C8] flex flex-wrap items-center px-2 py-1 gap-1">
        {/* File operations */}
        <button
          onClick={handleSave}
          className="p-1.5 rounded hover:bg-[#D0D0D0] transition-colors"
          title="Enregistrer (Ctrl+S)"
        >
          <Save className="w-4 h-4 text-[#444]" />
        </button>
        <button className="p-1.5 rounded hover:bg-[#D0D0D0] transition-colors" title="Exporter en PDF">
          <FileDown className="w-4 h-4 text-[#444]" />
        </button>
        <button className="p-1.5 rounded hover:bg-[#D0D0D0] transition-colors" title="Imprimer">
          <Printer className="w-4 h-4 text-[#444]" />
        </button>

        <div className="w-px h-5 bg-[#C0C0C0] mx-1" />

        {/* Undo/Redo */}
        <button className="p-1.5 rounded hover:bg-[#D0D0D0] transition-colors" title="Annuler">
          <Undo className="w-4 h-4 text-[#444]" />
        </button>
        <button className="p-1.5 rounded hover:bg-[#D0D0D0] transition-colors" title="Rétablir">
          <Redo className="w-4 h-4 text-[#444]" />
        </button>

        <div className="w-px h-5 bg-[#C0C0C0] mx-1" />

        {/* Font selector */}
        <select className="h-6 px-1 text-xs bg-white border border-[#C0C0C0] rounded">
          <option>Liberation Serif</option>
          <option>Liberation Sans</option>
          <option>Liberation Mono</option>
          <option>DejaVu Sans</option>
        </select>
        <select className="h-6 w-14 px-1 text-xs bg-white border border-[#C0C0C0] rounded">
          <option>12</option>
          <option>14</option>
          <option>16</option>
          <option>18</option>
          <option>24</option>
        </select>

        <div className="w-px h-5 bg-[#C0C0C0] mx-1" />

        {/* Text formatting */}
        <button className="p-1.5 rounded hover:bg-[#D0D0D0] transition-colors" title="Gras">
          <Bold className="w-4 h-4 text-[#444]" />
        </button>
        <button className="p-1.5 rounded hover:bg-[#D0D0D0] transition-colors" title="Italique">
          <Italic className="w-4 h-4 text-[#444]" />
        </button>
        <button className="p-1.5 rounded hover:bg-[#D0D0D0] transition-colors" title="Souligné">
          <Underline className="w-4 h-4 text-[#444]" />
        </button>

        <div className="w-px h-5 bg-[#C0C0C0] mx-1" />

        {/* Alignment */}
        <button className="p-1.5 rounded hover:bg-[#D0D0D0] transition-colors" title="Aligner à gauche">
          <AlignLeft className="w-4 h-4 text-[#444]" />
        </button>
        <button className="p-1.5 rounded hover:bg-[#D0D0D0] transition-colors" title="Centrer">
          <AlignCenter className="w-4 h-4 text-[#444]" />
        </button>
        <button className="p-1.5 rounded hover:bg-[#D0D0D0] transition-colors" title="Aligner à droite">
          <AlignRight className="w-4 h-4 text-[#444]" />
        </button>

        <div className="w-px h-5 bg-[#C0C0C0] mx-1" />

        {/* Lists */}
        <button className="p-1.5 rounded hover:bg-[#D0D0D0] transition-colors" title="Liste à puces">
          <List className="w-4 h-4 text-[#444]" />
        </button>
        <button className="p-1.5 rounded hover:bg-[#D0D0D0] transition-colors" title="Liste numérotée">
          <ListOrdered className="w-4 h-4 text-[#444]" />
        </button>
      </div>

      {/* Ruler */}
      <div className="h-6 bg-[#F0F0F0] border-b border-[#D0D0D0] flex items-center px-16">
        <div className="flex-1 h-3 bg-white border border-[#C0C0C0] relative">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((n) => (
            <div
              key={n}
              className="absolute top-0 h-full border-l border-[#999] text-[8px] text-[#666]"
              style={{ left: `${(n / 15) * 100}%` }}
            >
              <span className="ml-0.5">{n}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Document area */}
      <div className="flex-1 bg-[#808080] p-4 overflow-auto">
        {/* Paper */}
        <div className="max-w-3xl mx-auto bg-white shadow-lg min-h-[800px] relative">
          {/* Page margins indicator */}
          <div className="absolute inset-0 border-l-8 border-r-8 border-transparent" />

          <textarea
            value={content}
            onChange={handleChange}
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
              e.stopPropagation();
              if (e.key === 's' && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                handleSave();
              }
            }}
            className="w-full h-full min-h-[800px] p-12 resize-none outline-none text-[#333] text-sm leading-relaxed font-serif cursor-text"
            spellCheck={false}
            autoFocus
            style={{ fontFamily: "'Liberation Serif', 'Times New Roman', serif" }}
          />
        </div>
      </div>

      {/* Status Bar */}
      <div className="h-6 bg-[#E8E8E8] border-t border-[#C8C8C8] flex items-center justify-between px-3 text-xs text-[#555]">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <FileText className="w-3 h-3" />
            {fileName}
            {!saved && ' *'}
          </span>
          <span>Page 1/1</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Mots: {content.split(/\s+/).filter(Boolean).length}</span>
          <span>Caractères: {content.length}</span>
          <span>Français (France)</span>
        </div>
      </div>
    </div>
  );
}
