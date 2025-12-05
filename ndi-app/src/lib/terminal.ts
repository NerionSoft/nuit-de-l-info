import { VirtualFileSystem } from './fileSystem';
import type { AppType } from '@/types/desktop';

export interface CommandResult {
  output: string;
  isError?: boolean;
  clear?: boolean;
  openApp?: AppType;
}

type CommandHandler = (args: string[], fs: VirtualFileSystem) => CommandResult;

const NEOFETCH_ASCII = `
\x1b[31m            .-/+oossssoo+/-.\x1b[0m               \x1b[1muser\x1b[0m@\x1b[1mubuntu-simulator\x1b[0m
\x1b[31m        \`:+ssssssssssssssssss+:\`\x1b[0m           -------------------------
\x1b[31m      -+ssssssssssssssssssyyssss+-\x1b[0m         \x1b[1mOS:\x1b[0m Ubuntu 24.04 LTS x86_64
\x1b[31m    .ossssssssssssssssss\x1b[37mdMMMNy\x1b[31msssso.\x1b[0m       \x1b[1mHost:\x1b[0m Ubuntu Simulator
\x1b[31m   /sssssssssss\x1b[37mhdmmNNmmyNMMMMh\x1b[31mssssss/\x1b[0m      \x1b[1mKernel:\x1b[0m 6.5.0-virtual
\x1b[31m  +sssssssss\x1b[37mhm\x1b[31myd\x1b[37mMMMMMMMNddddy\x1b[31mssssssss+\x1b[0m     \x1b[1mUptime:\x1b[0m just now
\x1b[31m /ssssssss\x1b[37mhNMMM\x1b[31myh\x1b[37mhyyyyhmNMMMNh\x1b[31mssssssss/\x1b[0m    \x1b[1mPackages:\x1b[0m 1337 (apt)
\x1b[31m.ssssssss\x1b[37mdMMMNh\x1b[31mssssssssss\x1b[37mhNMMMd\x1b[31mssssssss.\x1b[0m   \x1b[1mShell:\x1b[0m bash 5.1.16
\x1b[31m+ssss\x1b[37mhhhyNMMNy\x1b[31mssssssssssss\x1b[37myNMMMy\x1b[31msssssss+\x1b[0m   \x1b[1mResolution:\x1b[0m 1920x1080
\x1b[31moss\x1b[37myNMMMNyMMh\x1b[31mssssssssssssss\x1b[37mhmmmh\x1b[31mssssssso\x1b[0m   \x1b[1mDE:\x1b[0m GNOME 46
\x1b[31moss\x1b[37myNMMMNyMMh\x1b[31msssssssssssssshmmmh\x1b[31mssssssso\x1b[0m   \x1b[1mWM:\x1b[0m Mutter
\x1b[31m+ssss\x1b[37mhhhyNMMNy\x1b[31mssssssssssss\x1b[37myNMMMy\x1b[31msssssss+\x1b[0m   \x1b[1mTheme:\x1b[0m Yaru [GTK3]
\x1b[31m.ssssssss\x1b[37mdMMMNh\x1b[31mssssssssss\x1b[37mhNMMMd\x1b[31mssssssss.\x1b[0m   \x1b[1mTerminal:\x1b[0m Ubuntu Simulator
\x1b[31m /ssssssss\x1b[37mhNMMM\x1b[31myh\x1b[37mhyyyyhdNMMMNh\x1b[31mssssssss/\x1b[0m    \x1b[1mCPU:\x1b[0m Virtual x86_64
\x1b[31m  +sssssssss\x1b[37mdm\x1b[31myd\x1b[37mMMMMMMMMddddy\x1b[31mssssssss+\x1b[0m     \x1b[1mMemory:\x1b[0m 420MB / 8192MB
\x1b[31m   /sssssssssss\x1b[37mhdmNNNNmyNMMMMh\x1b[31mssssss/\x1b[0m
\x1b[31m    .ossssssssssssssssss\x1b[37mdMMMNy\x1b[31msssso.\x1b[0m
\x1b[31m      -+sssssssssssssssss\x1b[37myyy\x1b[31mssss+-\x1b[0m
\x1b[31m        \`:+ssssssssssssssssss+:\`\x1b[0m
\x1b[31m            .-/+oossssoo+/-.\x1b[0m
`;

const COWSAY = (message: string) => {
  const maxLen = Math.min(message.length, 40);
  const border = '-'.repeat(maxLen + 2);
  const paddedMsg = message.length > 40 ? message.slice(0, 37) + '...' : message;

  return `
 ${border}
< ${paddedMsg.padEnd(maxLen)} >
 ${border}
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||
`;
};

const commands: Record<string, CommandHandler> = {
  help: () => ({
    output: `
\x1b[1mCommandes disponibles:\x1b[0m

\x1b[36m── Navigation ──\x1b[0m
  \x1b[32mls\x1b[0m [path]        Lister le contenu d'un dossier
  \x1b[32mcd\x1b[0m <path>        Changer de dossier
  \x1b[32mpwd\x1b[0m              Afficher le chemin actuel

\x1b[36m── Fichiers ──\x1b[0m
  \x1b[32mcat\x1b[0m <file>       Afficher le contenu d'un fichier
  \x1b[32mecho\x1b[0m <text>      Afficher du texte
  \x1b[32mmkdir\x1b[0m <dir>      Créer un dossier
  \x1b[32mtouch\x1b[0m <file>     Créer un fichier vide
  \x1b[32mrm\x1b[0m <file>        Supprimer un fichier (-r pour dossiers)

\x1b[36m── Système ──\x1b[0m
  \x1b[32mwhoami\x1b[0m           Afficher l'utilisateur actuel
  \x1b[32mdate\x1b[0m             Afficher la date
  \x1b[32muname\x1b[0m [-a]       Infos système
  \x1b[32mneofetch\x1b[0m         Infos système avec ASCII art

\x1b[36m── LibreOffice (Suite bureautique libre) ──\x1b[0m
  \x1b[32mlibreoffice\x1b[0m      Lancer LibreOffice
  \x1b[32mlowriter\x1b[0m         Lancer Writer (traitement de texte)
  \x1b[32mlocalc\x1b[0m           Lancer Calc (tableur)
  \x1b[32mloimpress\x1b[0m        Lancer Impress (présentations)

\x1b[36m── Autres ──\x1b[0m
  \x1b[32mclear\x1b[0m            Effacer le terminal
  \x1b[32mcowsay\x1b[0m <text>    Faire parler une vache
  \x1b[32mhistory\x1b[0m          Historique des commandes

\x1b[33mAstuce:\x1b[0m Tab = auto-complétion, ↑/↓ = historique
`,
  }),

  ls: (args, fs) => {
    const showHidden = args.includes('-a') || args.includes('-la') || args.includes('-al');
    const longFormat = args.includes('-l') || args.includes('-la') || args.includes('-al');
    const path = args.find(a => !a.startsWith('-'));

    const result = fs.ls(path, showHidden, longFormat);
    if (!result.success) {
      return { output: result.error || '', isError: true };
    }
    return { output: result.output || '' };
  },

  cd: (args, fs) => {
    const path = args[0] || '~';
    const result = fs.cd(path);
    if (!result.success) {
      return { output: result.error || '', isError: true };
    }
    return { output: '' };
  },

  pwd: (_, fs) => ({
    output: fs.pwd(),
  }),

  cat: (args, fs) => {
    if (args.length === 0) {
      return { output: 'cat: missing file operand', isError: true };
    }
    const result = fs.cat(args[0]);
    if (!result.success) {
      return { output: result.error || '', isError: true };
    }
    return { output: result.output || '' };
  },

  echo: (args) => ({
    output: args.join(' ').replace(/^["']|["']$/g, ''),
  }),

  mkdir: (args, fs) => {
    if (args.length === 0) {
      return { output: 'mkdir: missing operand', isError: true };
    }
    const result = fs.mkdir(args[0]);
    if (!result.success) {
      return { output: result.error || '', isError: true };
    }
    return { output: '' };
  },

  touch: (args, fs) => {
    if (args.length === 0) {
      return { output: 'touch: missing file operand', isError: true };
    }
    const result = fs.touch(args[0]);
    if (!result.success) {
      return { output: result.error || '', isError: true };
    }
    return { output: '' };
  },

  rm: (args, fs) => {
    const recursive = args.includes('-r') || args.includes('-rf') || args.includes('-fr');
    const path = args.find(a => !a.startsWith('-'));

    if (!path) {
      return { output: 'rm: missing operand', isError: true };
    }

    const result = fs.rm(path, recursive);
    if (!result.success) {
      return { output: result.error || '', isError: true };
    }
    return { output: '' };
  },

  clear: () => ({
    output: '',
    clear: true,
  }),

  whoami: () => ({
    output: 'user',
  }),

  date: () => ({
    output: new Date().toString(),
  }),

  uname: (args) => {
    if (args.includes('-a')) {
      return {
        output: 'Linux ubuntu-simulator 6.5.0-virtual #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux',
      };
    }
    return { output: 'Linux' };
  },

  neofetch: () => ({
    output: NEOFETCH_ASCII,
  }),

  cowsay: (args) => {
    const message = args.join(' ') || 'Moo!';
    return { output: COWSAY(message) };
  },

  sudo: (args) => {
    if (args.length === 0) {
      return { output: 'usage: sudo <command>', isError: true };
    }
    if (args[0] === 'rm' && args.includes('-rf') && args.includes('/')) {
      return {
        output: `\x1b[31mNice try! 😈\x1b[0m\n\nYou don't have permission to destroy the universe.\nMaybe try something less destructive?`,
        isError: true,
      };
    }
    return {
      output: `\x1b[33m[sudo] password for user:\x1b[0m\nSorry, this is a simulation. You don't need sudo here! 🎮`,
    };
  },

  history: () => ({
    output: 'Command history is available using ↑ and ↓ arrow keys',
  }),

  exit: () => ({
    output: `\x1b[33mYou can't escape that easily! 😄\x1b[0m\n\nThis is a web-based terminal simulator.\nClose the window if you want to exit.`,
  }),

  man: (args) => {
    if (args.length === 0) {
      return { output: 'What manual page do you want?\nFor example, try \'man ls\'', isError: true };
    }
    const cmd = args[0];
    if (commands[cmd]) {
      return { output: `\x1b[1m${cmd.toUpperCase()}(1)\x1b[0m\n\nNAME\n    ${cmd} - use 'help' for more info\n\nSYNOPSIS\n    ${cmd} [options] [arguments]\n\nDESCRIPTION\n    Type 'help' to see available commands.` };
    }
    return { output: `No manual entry for ${cmd}`, isError: true };
  },

  hostname: () => ({
    output: 'ubuntu-simulator',
  }),

  id: () => ({
    output: 'uid=1000(user) gid=1000(user) groups=1000(user),4(adm),27(sudo)',
  }),

  uptime: () => ({
    output: ' 10:00:00 up 0 min,  1 user,  load average: 0.00, 0.00, 0.00',
  }),

  df: (args) => {
    if (args.includes('-h')) {
      return {
        output: `Filesystem      Size  Used Avail Use% Mounted on
/dev/sda1        50G   15G   35G  30% /
tmpfs           4.0G     0  4.0G   0% /dev/shm
/dev/sda2       100G   20G   80G  20% /home`,
      };
    }
    return {
      output: `Filesystem     1K-blocks     Used Available Use% Mounted on
/dev/sda1       52428800 15728640  36700160  30% /
tmpfs            4194304        0   4194304   0% /dev/shm
/dev/sda2      104857600 20971520  83886080  20% /home`,
    };
  },

  free: (args) => {
    if (args.includes('-h')) {
      return {
        output: `              total        used        free      shared  buff/cache   available
Mem:          7.8Gi       420Mi       6.5Gi       1.0Mi       900Mi       7.1Gi
Swap:         2.0Gi          0B       2.0Gi`,
      };
    }
    return {
      output: `              total        used        free      shared  buff/cache   available
Mem:        8192000      430080     6815744        1024      921600     7270400
Swap:       2097152           0     2097152`,
    };
  },

  top: () => ({
    output: `\x1b[33mInteractive mode not supported.\x1b[0m\nTry 'ps' for a static process list.`,
  }),

  ps: () => ({
    output: `  PID TTY          TIME CMD
    1 pts/0    00:00:00 bash
  100 pts/0    00:00:00 ubuntu-sim
  101 pts/0    00:00:00 ps`,
  }),

  which: (args) => {
    if (args.length === 0) {
      return { output: '' };
    }
    const cmd = args[0];
    if (commands[cmd]) {
      return { output: `/usr/bin/${cmd}` };
    }
    return { output: `${cmd} not found`, isError: true };
  },

  libreoffice: (args) => {
    const app = args.find(a => a.startsWith('--'));
    const appName = app?.replace('--', '') || 'writer';

    const validApps: Record<string, { label: string; app: AppType }> = {
      'writer': { label: 'Writer (Traitement de texte)', app: 'writer' },
      'calc': { label: 'Calc (Tableur)', app: 'calc' },
      'impress': { label: 'Impress (Présentations)', app: 'impress' },
    };

    const appInfo = validApps[appName];
    if (appInfo) {
      return {
        output: `\x1b[32m✓ Lancement de LibreOffice ${appInfo.label}...\x1b[0m`,
        openApp: appInfo.app,
      };
    }

    return {
      output: `Usage: libreoffice [--writer|--calc|--impress] [fichier]

Applications disponibles:
  --writer    Traitement de texte (comme Word)
  --calc      Tableur (comme Excel)
  --impress   Présentations (comme PowerPoint)

Exemple: libreoffice --writer rapport.odt`,
    };
  },

  lowriter: () => ({
    output: `\x1b[32m✓ Lancement de LibreOffice Writer...\x1b[0m`,
    openApp: 'writer' as AppType,
  }),

  localc: () => ({
    output: `\x1b[32m✓ Lancement de LibreOffice Calc...\x1b[0m`,
    openApp: 'calc' as AppType,
  }),

  loimpress: () => ({
    output: `\x1b[32m✓ Lancement de LibreOffice Impress...\x1b[0m`,
    openApp: 'impress' as AppType,
  }),
};

export function executeCommand(
  input: string,
  fs: VirtualFileSystem
): CommandResult {
  const trimmed = input.trim();

  if (!trimmed) {
    return { output: '' };
  }

  // Parse command and arguments
  const parts = trimmed.match(/(?:[^\s"]+|"[^"]*")+/g) || [];
  const command = parts[0]?.toLowerCase();
  const args = parts.slice(1).map(arg => arg.replace(/^"|"$/g, ''));

  if (!command) {
    return { output: '' };
  }

  const handler = commands[command];

  if (!handler) {
    return {
      output: `${command}: command not found\nType 'help' for available commands.`,
      isError: true,
    };
  }

  return handler(args, fs);
}

export function getAutocompleteSuggestions(
  input: string,
  fs: VirtualFileSystem
): string[] {
  const parts = input.split(' ');

  // Complete command names
  if (parts.length === 1) {
    const partial = parts[0].toLowerCase();
    return Object.keys(commands).filter(cmd => cmd.startsWith(partial));
  }

  // Complete file/directory names
  const partial = parts[parts.length - 1];
  const items = fs.listDirectory();

  return items
    .map(item => item.name)
    .filter(name => name.startsWith(partial));
}
