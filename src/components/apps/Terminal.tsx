'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { VirtualFileSystem } from '@/lib/fileSystem';
import { executeCommand, getAutocompleteSuggestions } from '@/lib/terminal';
import { useTutorialStore } from '@/stores/tutorialStore';
import { useDesktopStore } from '@/stores/desktopStore';
import { useMetricsStore } from '@/stores/metricsStore';
import { useRSEStore } from '@/stores/rseStore';
import { isGreenCommand, getGreenSuggestion } from '@/utils/greenCommands';
import { GreenCommandTip } from '@/components/GreenCommandTip';
import type { TerminalLine } from '@/types/desktop';
import type { GreenCommandSuggestion } from '@/utils/greenCommands';

interface TerminalProps {
  windowId: string;
  onCommandExecuted?: (command: string, output: string) => void;
}

// Create a single instance per terminal window
const fsInstances = new Map<string, VirtualFileSystem>();

function getFileSystem(windowId: string): VirtualFileSystem {
  if (!fsInstances.has(windowId)) {
    fsInstances.set(windowId, new VirtualFileSystem());
  }
  return fsInstances.get(windowId)!;
}

export function Terminal({ windowId, onCommandExecuted }: TerminalProps) {
  const fs = getFileSystem(windowId);
  const { isActive: isTutorialActive, validateCommand, phase } = useTutorialStore();
  const openWindow = useDesktopStore((state) => state.openWindow);
  const incrementCommands = useMetricsStore((state) => state.incrementCommands);
  const incrementFiles = useMetricsStore((state) => state.incrementFiles);
  const incrementFolders = useMetricsStore((state) => state.incrementFolders);
  const incrementGreenCommands = useRSEStore((state) => state.incrementGreenCommands);
  const increaseCarbonAwareness = useRSEStore((state) => state.increaseCarbonAwareness);
  const [greenSuggestion, setGreenSuggestion] = useState<GreenCommandSuggestion | null>(null);
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      id: 'welcome',
      type: 'output',
      content: `Welcome to Linux Simulator (GNU/Linux 6.5.0-virtual x86_64)

 * Documentation:  https://help.linux.org
 * Management:     https://landscape.canonical.com
 * Support:        https://linux.org/advantage

Type \x1b[32mhelp\x1b[0m to see available commands.
`,
    },
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentPath, setCurrentPath] = useState(fs.getCurrentPath());

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [lines]);

  // Focus input on click
  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  const generateId = () => Math.random().toString(36).substring(2, 9);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const input = currentInput.trim();
    const prompt = `\x1b[32muser@linux-sim\x1b[0m:\x1b[34m${currentPath}\x1b[0m$ `;

    // Add input line
    const inputLine: TerminalLine = {
      id: generateId(),
      type: 'input',
      content: input,
      prompt,
    };

    if (!input) {
      setLines((prev) => [...prev, inputLine]);
      setCurrentInput('');
      return;
    }

    // Execute command
    const result = executeCommand(input, fs);

    // Track metrics
    incrementCommands();
    const cmd = input.split(' ')[0];
    if (cmd === 'touch' || cmd === 'echo' || cmd === 'nano') {
      incrementFiles();
    } else if (cmd === 'mkdir') {
      incrementFolders();
    }

    // Check if command is green and track it
    if (isGreenCommand(input)) {
      incrementGreenCommands();
      increaseCarbonAwareness(2); // +2% par commande verte
    } else {
      // Check if there's a green suggestion
      const suggestion = getGreenSuggestion(input);
      if (suggestion) {
        setGreenSuggestion(suggestion);
        increaseCarbonAwareness(1); // +1% pour avoir vu une suggestion
      }
    }

    // Open app if command requests it
    if (result.openApp) {
      openWindow(result.openApp);
    }

    // Update path after command (might have changed with cd)
    setCurrentPath(fs.getCurrentPath());

    // Tutorial validation
    if (isTutorialActive && phase === 'terminal') {
      validateCommand(input);
    }

    // Callback for external listeners
    if (onCommandExecuted) {
      onCommandExecuted(input, result.output || '');
    }

    // Add to history
    if (input) {
      setCommandHistory((prev) => [...prev, input]);
      setHistoryIndex(-1);
    }

    if (result.clear) {
      setLines([]);
    } else {
      const newLines: TerminalLine[] = [inputLine];

      if (result.output) {
        newLines.push({
          id: generateId(),
          type: result.isError ? 'error' : 'output',
          content: result.output,
        });
      }

      setLines((prev) => [...prev, ...newLines]);
    }

    setCurrentInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // History navigation
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex =
          historyIndex === -1
            ? commandHistory.length - 1
            : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setCurrentInput('');
        } else {
          setHistoryIndex(newIndex);
          setCurrentInput(commandHistory[newIndex]);
        }
      }
    }
    // Tab completion
    else if (e.key === 'Tab') {
      e.preventDefault();
      const suggestions = getAutocompleteSuggestions(currentInput, fs);
      if (suggestions.length === 1) {
        const parts = currentInput.split(' ');
        parts[parts.length - 1] = suggestions[0];
        setCurrentInput(parts.join(' '));
      } else if (suggestions.length > 1) {
        // Show suggestions
        const prompt = `\x1b[32muser@linux-sim\x1b[0m:\x1b[34m${currentPath}\x1b[0m$ `;
        setLines((prev) => [
          ...prev,
          { id: generateId(), type: 'input', content: currentInput, prompt },
          { id: generateId(), type: 'output', content: suggestions.join('  ') },
        ]);
      }
    }
    // Ctrl+C
    else if (e.key === 'c' && e.ctrlKey) {
      const prompt = `\x1b[32muser@linux-sim\x1b[0m:\x1b[34m${currentPath}\x1b[0m$ `;
      setLines((prev) => [
        ...prev,
        { id: generateId(), type: 'input', content: currentInput + '^C', prompt },
      ]);
      setCurrentInput('');
    }
    // Ctrl+L (clear)
    else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  // Parse ANSI codes for display
  const parseAnsi = (text: string): React.ReactNode[] => {
    const parts: React.ReactNode[] = [];
    let currentText = '';
    let currentStyle: React.CSSProperties = {};
    let i = 0;

    while (i < text.length) {
      if (text[i] === '\x1b' && text[i + 1] === '[') {
        // Push current text
        if (currentText) {
          parts.push(
            <span key={parts.length} style={currentStyle}>
              {currentText}
            </span>
          );
          currentText = '';
        }

        // Find end of escape sequence
        let j = i + 2;
        while (j < text.length && text[j] !== 'm') j++;

        const code = text.slice(i + 2, j);
        const codes = code.split(';').map(Number);

        // Reset
        if (codes.includes(0)) {
          currentStyle = {};
        }
        // Bold
        if (codes.includes(1)) {
          currentStyle = { ...currentStyle, fontWeight: 'bold' };
        }
        // Colors
        const colorMap: Record<number, string> = {
          30: '#000',
          31: '#3B82F6', // Red/Orange (Blue)
          32: '#4E9A06', // Green
          33: '#C4A000', // Yellow
          34: '#3465A4', // Blue
          35: '#75507B', // Magenta
          36: '#06989A', // Cyan
          37: '#D3D7CF', // White
        };

        for (const c of codes) {
          if (colorMap[c]) {
            currentStyle = { ...currentStyle, color: colorMap[c] };
          }
        }

        i = j + 1;
      } else {
        currentText += text[i];
        i++;
      }
    }

    // Push remaining text
    if (currentText) {
      parts.push(
        <span key={parts.length} style={currentStyle}>
          {currentText}
        </span>
      );
    }

    return parts;
  };

  const prompt = `\x1b[32muser@linux-sim\x1b[0m:\x1b[34m${currentPath}\x1b[0m$ `;

  return (
    <div
      ref={containerRef}
      onClick={focusInput}
      className="h-full overflow-auto p-3 font-mono text-sm bg-[#0F172A] text-white cursor-text"
    >
      {/* Green Command Suggestion */}
      {greenSuggestion && (
        <div className="mb-3">
          <GreenCommandTip
            suggestion={greenSuggestion}
            onDismiss={() => setGreenSuggestion(null)}
          />
        </div>
      )}

      {/* Output Lines */}
      {lines.map((line) => (
        <div key={line.id} className="whitespace-pre-wrap break-all">
          {line.prompt && <span>{parseAnsi(line.prompt)}</span>}
          <span className={line.type === 'error' ? 'text-red-400' : ''}>
            {parseAnsi(line.content)}
          </span>
        </div>
      ))}

      {/* Input Line */}
      <form onSubmit={handleSubmit} className="flex">
        <span>{parseAnsi(prompt)}</span>
        <input
          ref={inputRef}
          type="text"
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none caret-white"
          autoFocus
          spellCheck={false}
          autoComplete="off"
        />
      </form>
    </div>
  );
}
