'use client';

import { useState } from 'react';
import {
  Save,
  FileDown,
  Printer,
  Undo,
  Redo,
  Play,
  Square,
  Circle,
  Type,
  Image,
  ChevronLeft,
  ChevronRight,
  Presentation,
} from 'lucide-react';

interface ImpressProps {
  windowId: string;
}

interface Slide {
  id: number;
  title: string;
  content: string;
}

export function Impress({ windowId }: ImpressProps) {
  const [slides] = useState<Slide[]>([
    {
      id: 1,
      title: 'Bienvenue dans LibreOffice Impress',
      content: 'Créez des présentations professionnelles',
    },
    {
      id: 2,
      title: "Qu'est-ce que LibreOffice ?",
      content: 'Une suite bureautique libre et gratuite\n\n- Alternative à Microsoft Office\n- Compatible avec les formats .pptx, .xlsx, .docx\n- Disponible sur Linux, Windows, macOS',
    },
    {
      id: 3,
      title: 'Pourquoi le logiciel libre ?',
      content: '- Gratuit pour tous\n- Code source ouvert et transparent\n- Communauté mondiale de développeurs\n- Respect de votre vie privée\n- Formats de fichiers ouverts',
    },
    {
      id: 4,
      title: 'Commandes Terminal',
      content: 'Lancer Impress depuis le terminal :\n\n$ libreoffice --impress\n$ libreoffice --impress presentation.odp\n\nFormat natif : .odp (Open Document Presentation)',
    },
  ]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPresenting, setIsPresenting] = useState(false);

  const goToSlide = (index: number) => {
    if (index >= 0 && index < slides.length) {
      setCurrentSlide(index);
    }
  };

  const startPresentation = () => {
    setIsPresenting(true);
  };

  const exitPresentation = () => {
    setIsPresenting(false);
  };

  // Presentation mode (fullscreen)
  if (isPresenting) {
    return (
      <div
        className="h-full bg-[#1a1a2e] flex flex-col items-center justify-center cursor-pointer"
        onClick={(e) => {
          if (e.clientX > window.innerWidth / 2) {
            if (currentSlide < slides.length - 1) {
              setCurrentSlide(currentSlide + 1);
            } else {
              exitPresentation();
            }
          } else {
            if (currentSlide > 0) {
              setCurrentSlide(currentSlide - 1);
            }
          }
        }}
        onKeyDown={(e) => {
          if (e.key === 'Escape') exitPresentation();
          if (e.key === 'ArrowRight' || e.key === ' ') {
            if (currentSlide < slides.length - 1) setCurrentSlide(currentSlide + 1);
          }
          if (e.key === 'ArrowLeft') {
            if (currentSlide > 0) setCurrentSlide(currentSlide - 1);
          }
        }}
        tabIndex={0}
      >
        <div className="w-full max-w-4xl aspect-[16/9] bg-gradient-to-br from-[#E95420] to-[#772953] rounded-lg shadow-2xl p-12 flex flex-col">
          <h1 className="text-4xl font-bold text-white mb-8">{slides[currentSlide].title}</h1>
          <p className="text-xl text-white/90 whitespace-pre-line flex-1">{slides[currentSlide].content}</p>
          <div className="text-white/50 text-sm mt-4">
            Diapositive {currentSlide + 1} / {slides.length} - Cliquez pour continuer, Échap pour quitter
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-[#F5F5F5]">
      {/* Menu Bar */}
      <div className="h-8 bg-[#E8E8E8] border-b border-[#C8C8C8] flex items-center px-1 gap-0.5 text-[#333]">
        {['Fichier', 'Édition', 'Affichage', 'Insertion', 'Format', 'Diapositive', 'Diaporama', 'Outils', 'Fenêtre', 'Aide'].map((menu) => (
          <button
            key={menu}
            className="px-2 py-0.5 text-xs hover:bg-[#D0D0D0] rounded transition-colors"
          >
            {menu}
          </button>
        ))}
      </div>

      {/* Toolbar */}
      <div className="bg-[#E8E8E8] border-b border-[#C8C8C8] flex flex-wrap items-center px-2 py-1 gap-1">
        <button className="p-1.5 rounded hover:bg-[#D0D0D0] transition-colors" title="Enregistrer">
          <Save className="w-4 h-4 text-[#444]" />
        </button>
        <button className="p-1.5 rounded hover:bg-[#D0D0D0] transition-colors" title="Exporter en PDF">
          <FileDown className="w-4 h-4 text-[#444]" />
        </button>
        <button className="p-1.5 rounded hover:bg-[#D0D0D0] transition-colors" title="Imprimer">
          <Printer className="w-4 h-4 text-[#444]" />
        </button>

        <div className="w-px h-5 bg-[#C0C0C0] mx-1" />

        <button className="p-1.5 rounded hover:bg-[#D0D0D0] transition-colors" title="Annuler">
          <Undo className="w-4 h-4 text-[#444]" />
        </button>
        <button className="p-1.5 rounded hover:bg-[#D0D0D0] transition-colors" title="Rétablir">
          <Redo className="w-4 h-4 text-[#444]" />
        </button>

        <div className="w-px h-5 bg-[#C0C0C0] mx-1" />

        <button className="p-1.5 rounded hover:bg-[#D0D0D0] transition-colors" title="Rectangle">
          <Square className="w-4 h-4 text-[#444]" />
        </button>
        <button className="p-1.5 rounded hover:bg-[#D0D0D0] transition-colors" title="Ellipse">
          <Circle className="w-4 h-4 text-[#444]" />
        </button>
        <button className="p-1.5 rounded hover:bg-[#D0D0D0] transition-colors" title="Texte">
          <Type className="w-4 h-4 text-[#444]" />
        </button>
        <button className="p-1.5 rounded hover:bg-[#D0D0D0] transition-colors" title="Image">
          <Image className="w-4 h-4 text-[#444]" />
        </button>

        <div className="w-px h-5 bg-[#C0C0C0] mx-1" />

        <button
          onClick={startPresentation}
          className="flex items-center gap-1 px-3 py-1 bg-[#E95420] hover:bg-[#C94010] text-white rounded transition-colors text-xs font-medium"
          title="Démarrer la présentation (F5)"
        >
          <Play className="w-3 h-3" />
          Présenter
        </button>
      </div>

      {/* Main Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Slide Panel (Left) */}
        <div className="w-48 bg-[#F0F0F0] border-r border-[#C8C8C8] overflow-y-auto p-2">
          <div className="space-y-2">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => goToSlide(index)}
                className={`w-full aspect-[16/9] rounded border-2 transition-all ${
                  index === currentSlide
                    ? 'border-[#E95420] shadow-md'
                    : 'border-[#C8C8C8] hover:border-[#999]'
                }`}
              >
                <div className="w-full h-full bg-gradient-to-br from-[#E95420] to-[#772953] rounded p-2 flex flex-col">
                  <span className="text-[8px] font-medium text-white truncate">{slide.title}</span>
                  <span className="text-[6px] text-white/70 truncate mt-1">{slide.content.split('\n')[0]}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Slide Editor (Center) */}
        <div className="flex-1 bg-[#808080] p-6 flex flex-col items-center overflow-auto">
          {/* Navigation */}
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => goToSlide(currentSlide - 1)}
              disabled={currentSlide === 0}
              className="p-1 rounded hover:bg-white/20 disabled:opacity-30 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <span className="text-white text-sm">
              Diapositive {currentSlide + 1} / {slides.length}
            </span>
            <button
              onClick={() => goToSlide(currentSlide + 1)}
              disabled={currentSlide === slides.length - 1}
              className="p-1 rounded hover:bg-white/20 disabled:opacity-30 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Current Slide */}
          <div className="w-full max-w-3xl aspect-[16/9] bg-gradient-to-br from-[#E95420] to-[#772953] rounded-lg shadow-xl p-8 flex flex-col">
            <h2 className="text-2xl font-bold text-white mb-4">{slides[currentSlide].title}</h2>
            <p className="text-white/90 whitespace-pre-line flex-1">{slides[currentSlide].content}</p>
          </div>

          {/* Notes area */}
          <div className="w-full max-w-3xl mt-4 bg-white rounded shadow p-3">
            <div className="text-xs text-[#666] mb-1">Notes du présentateur :</div>
            <textarea
              className="w-full h-16 text-xs resize-none outline-none text-[#333]"
              placeholder="Ajoutez vos notes ici..."
            />
          </div>
        </div>

        {/* Properties Panel (Right) */}
        <div className="w-56 bg-[#F0F0F0] border-l border-[#C8C8C8] p-3">
          <h3 className="text-xs font-semibold text-[#333] mb-3">Propriétés</h3>

          <div className="space-y-4">
            <div>
              <label className="text-xs text-[#666] block mb-1">Mise en page</label>
              <div className="grid grid-cols-3 gap-1">
                {['Titre', 'Titre+Contenu', 'Deux colonnes', 'Vide', 'Image', 'Comparaison'].map((layout) => (
                  <button
                    key={layout}
                    className="aspect-[16/9] bg-white border border-[#C8C8C8] rounded text-[6px] hover:border-[#E95420] transition-colors"
                  >
                    {layout}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs text-[#666] block mb-1">Transitions</label>
              <select className="w-full h-7 text-xs bg-white border border-[#C0C0C0] rounded px-2">
                <option>Aucune</option>
                <option>Fondu</option>
                <option>Glissement</option>
                <option>Poussée</option>
                <option>Découvrir</option>
              </select>
            </div>

            <div className="pt-3 border-t border-[#D0D0D0]">
              <div className="flex items-center gap-2 text-[#666]">
                <Presentation className="w-4 h-4" />
                <span className="text-xs">LibreOffice Impress</span>
              </div>
              <p className="text-[10px] text-[#888] mt-2">
                Format : .odp (Open Document Presentation)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="h-6 bg-[#E8E8E8] border-t border-[#C8C8C8] flex items-center justify-between px-3 text-xs text-[#555]">
        <span>Présentation1.odp</span>
        <div className="flex items-center gap-4">
          <span>Diapositive {currentSlide + 1} / {slides.length}</span>
          <span>Mode normal</span>
        </div>
      </div>
    </div>
  );
}
