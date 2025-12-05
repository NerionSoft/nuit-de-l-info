'use client';

import { Trash2 } from 'lucide-react';

interface TrashProps {
  windowId: string;
}

export function Trash({ windowId }: TrashProps) {
  return (
    <div className="h-full flex flex-col items-center justify-center bg-[#1E1E1E] text-white p-8">
      <Trash2 className="w-24 h-24 text-white/30 mb-6" />
      <h2 className="text-xl font-medium text-white/80 mb-2">Trash is Empty</h2>
      <p className="text-white/50 text-center max-w-xs">
        Items you delete will appear here. You can restore them or empty the
        trash to permanently delete them.
      </p>
    </div>
  );
}
