'use client';

import { useState } from 'react';
import {
  Save,
  FileDown,
  Printer,
  Undo,
  Redo,
  Bold,
  Italic,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Plus,
  Minus,
  X,
  Divide,
  Percent,
} from 'lucide-react';

interface CalcProps {
  windowId: string;
}

const COLS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
const ROWS = 20;

interface CellData {
  value: string;
  formula?: string;
}

export function Calc({ windowId }: CalcProps) {
  const [cells, setCells] = useState<Record<string, CellData>>(() => {
    // Pre-populate with example data
    return {
      'A1': { value: 'Produit' },
      'B1': { value: 'Quantité' },
      'C1': { value: 'Prix unitaire' },
      'D1': { value: 'Total' },
      'A2': { value: 'Ordinateur' },
      'B2': { value: '5' },
      'C2': { value: '800' },
      'D2': { value: '4000', formula: '=B2*C2' },
      'A3': { value: 'Écran' },
      'B3': { value: '10' },
      'C3': { value: '250' },
      'D3': { value: '2500', formula: '=B3*C3' },
      'A4': { value: 'Clavier' },
      'B4': { value: '15' },
      'C4': { value: '50' },
      'D4': { value: '750', formula: '=B4*C4' },
      'A6': { value: 'TOTAL' },
      'D6': { value: '7250', formula: '=SOMME(D2:D4)' },
    };
  });
  const [selectedCell, setSelectedCell] = useState<string>('A1');
  const [editingCell, setEditingCell] = useState<string | null>(null);
  const [fileName] = useState('Classeur1.ods');

  const getCellValue = (cellId: string): string => {
    return cells[cellId]?.value || '';
  };

  const handleCellChange = (cellId: string, value: string) => {
    setCells((prev) => ({
      ...prev,
      [cellId]: { value, formula: value.startsWith('=') ? value : undefined },
    }));
  };

  const handleCellDoubleClick = (cellId: string) => {
    setEditingCell(cellId);
  };

  const handleCellBlur = () => {
    setEditingCell(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent, cellId: string) => {
    if (e.key === 'Enter') {
      setEditingCell(null);
      // Move to next row
      const col = cellId[0];
      const row = parseInt(cellId.slice(1));
      if (row < ROWS) {
        setSelectedCell(`${col}${row + 1}`);
      }
    } else if (e.key === 'Escape') {
      setEditingCell(null);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      setEditingCell(null);
      // Move to next column
      const col = cellId[0];
      const row = cellId.slice(1);
      const colIndex = COLS.indexOf(col);
      if (colIndex < COLS.length - 1) {
        setSelectedCell(`${COLS[colIndex + 1]}${row}`);
      }
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#F5F5F5]">
      {/* Menu Bar */}
      <div className="h-8 bg-[#E8E8E8] border-b border-[#C8C8C8] flex items-center px-1 gap-0.5 text-[#333]">
        {['Fichier', 'Édition', 'Affichage', 'Insertion', 'Format', 'Styles', 'Feuille', 'Données', 'Outils', 'Fenêtre', 'Aide'].map((menu) => (
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

        <select className="h-6 px-1 text-xs bg-white border border-[#C0C0C0] rounded">
          <option>Liberation Sans</option>
          <option>Liberation Serif</option>
          <option>Liberation Mono</option>
        </select>
        <select className="h-6 w-12 px-1 text-xs bg-white border border-[#C0C0C0] rounded">
          <option>10</option>
          <option>11</option>
          <option>12</option>
          <option>14</option>
        </select>

        <div className="w-px h-5 bg-[#C0C0C0] mx-1" />

        <button className="p-1.5 rounded hover:bg-[#D0D0D0] transition-colors" title="Gras">
          <Bold className="w-4 h-4 text-[#444]" />
        </button>
        <button className="p-1.5 rounded hover:bg-[#D0D0D0] transition-colors" title="Italique">
          <Italic className="w-4 h-4 text-[#444]" />
        </button>

        <div className="w-px h-5 bg-[#C0C0C0] mx-1" />

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

        <button className="p-1.5 rounded hover:bg-[#D0D0D0] transition-colors" title="Somme">
          <span className="text-xs font-bold text-[#444]">Σ</span>
        </button>
        <button className="p-1.5 rounded hover:bg-[#D0D0D0] transition-colors" title="Pourcentage">
          <Percent className="w-4 h-4 text-[#444]" />
        </button>
      </div>

      {/* Formula Bar */}
      <div className="h-8 bg-[#F0F0F0] border-b border-[#C8C8C8] flex items-center px-2 gap-2">
        <div className="w-16 h-6 bg-white border border-[#C0C0C0] rounded flex items-center justify-center text-xs font-medium">
          {selectedCell}
        </div>
        <div className="text-[#666] text-lg">=</div>
        <input
          type="text"
          value={cells[selectedCell]?.formula || cells[selectedCell]?.value || ''}
          onChange={(e) => handleCellChange(selectedCell, e.target.value)}
          className="flex-1 h-6 px-2 text-xs bg-white border border-[#C0C0C0] rounded outline-none focus:border-[#0066CC]"
          placeholder="Entrez une formule ou une valeur"
        />
      </div>

      {/* Spreadsheet Area */}
      <div className="flex-1 overflow-auto bg-white">
        <table className="border-collapse w-full">
          <thead className="sticky top-0 z-10">
            <tr>
              {/* Row number header (empty corner) */}
              <th className="w-10 h-6 bg-[#E8E8E8] border border-[#C8C8C8] sticky left-0 z-20" />
              {/* Column headers */}
              {COLS.map((col) => (
                <th
                  key={col}
                  className="min-w-[80px] h-6 bg-[#E8E8E8] border border-[#C8C8C8] text-xs font-medium text-[#333]"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: ROWS }, (_, rowIndex) => (
              <tr key={rowIndex}>
                {/* Row number */}
                <td className="w-10 h-6 bg-[#E8E8E8] border border-[#C8C8C8] text-xs text-center text-[#333] font-medium sticky left-0">
                  {rowIndex + 1}
                </td>
                {/* Cells */}
                {COLS.map((col) => {
                  const cellId = `${col}${rowIndex + 1}`;
                  const isSelected = selectedCell === cellId;
                  const isEditing = editingCell === cellId;
                  const cellData = cells[cellId];
                  const isHeader = rowIndex === 0;
                  const isTotal = cellData?.value === 'TOTAL';

                  return (
                    <td
                      key={cellId}
                      className={`min-w-[80px] h-6 border border-[#D8D8D8] text-xs p-0 ${
                        isSelected ? 'outline outline-2 outline-[#0066CC] outline-offset-[-1px]' : ''
                      } ${isHeader ? 'bg-[#E8F4FC] font-semibold' : ''} ${isTotal ? 'font-bold bg-[#F0F0F0]' : ''}`}
                      onClick={() => setSelectedCell(cellId)}
                      onDoubleClick={() => handleCellDoubleClick(cellId)}
                    >
                      {isEditing ? (
                        <input
                          type="text"
                          value={cellData?.formula || cellData?.value || ''}
                          onChange={(e) => handleCellChange(cellId, e.target.value)}
                          onBlur={handleCellBlur}
                          onKeyDown={(e) => handleKeyDown(e, cellId)}
                          className="w-full h-full px-1 outline-none bg-white"
                          autoFocus
                        />
                      ) : (
                        <div className="px-1 truncate">
                          {cellData?.value || ''}
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Sheet Tabs */}
      <div className="h-7 bg-[#E8E8E8] border-t border-[#C8C8C8] flex items-center px-2 gap-1">
        <button className="px-3 py-1 text-xs bg-white border border-[#C8C8C8] border-b-white rounded-t font-medium">
          Feuille1
        </button>
        <button className="px-3 py-1 text-xs hover:bg-[#D0D0D0] rounded transition-colors text-[#666]">
          Feuille2
        </button>
        <button className="px-2 py-1 text-xs hover:bg-[#D0D0D0] rounded transition-colors text-[#666]">
          +
        </button>
      </div>

      {/* Status Bar */}
      <div className="h-6 bg-[#E8E8E8] border-t border-[#C8C8C8] flex items-center justify-between px-3 text-xs text-[#555]">
        <span>{fileName}</span>
        <div className="flex items-center gap-4">
          <span>Somme: 7250</span>
          <span>Moyenne: 2416.67</span>
          <span>Feuille 1/2</span>
        </div>
      </div>
    </div>
  );
}
