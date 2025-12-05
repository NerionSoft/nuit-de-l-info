import { FileSystemNode } from '@/types/desktop';

// Structure du système de fichiers virtuel Linux
export const initialFileSystem: FileSystemNode = {
  name: '/',
  type: 'directory',
  children: {
    home: {
      name: 'home',
      type: 'directory',
      children: {
        user: {
          name: 'user',
          type: 'directory',
          children: {
            Desktop: {
              name: 'Desktop',
              type: 'directory',
              children: {
                'readme.txt': {
                  name: 'readme.txt',
                  type: 'file',
                  content: 'Bienvenue sur Linux Simulator!\n\nCe simulateur vous permet de découvrir Linux de manière interactive.\n\nAmusez-vous bien!',
                },
              },
            },
            Documents: {
              name: 'Documents',
              type: 'directory',
              children: {
                'notes.txt': {
                  name: 'notes.txt',
                  type: 'file',
                  content: 'Mes notes personnelles\n\n- Apprendre les commandes Linux\n- Explorer le terminal\n- Découvrir Linux',
                },
                'todo.txt': {
                  name: 'todo.txt',
                  type: 'file',
                  content: 'TODO List:\n\n[ ] Maîtriser la commande ls\n[ ] Comprendre cd et pwd\n[ ] Créer des fichiers avec touch\n[ ] Lire des fichiers avec cat',
                },
              },
            },
            Downloads: {
              name: 'Downloads',
              type: 'directory',
              children: {},
            },
            Pictures: {
              name: 'Pictures',
              type: 'directory',
              children: {
                'wallpapers': {
                  name: 'wallpapers',
                  type: 'directory',
                  children: {},
                },
              },
            },
            Music: {
              name: 'Music',
              type: 'directory',
              children: {},
            },
            Videos: {
              name: 'Videos',
              type: 'directory',
              children: {},
            },
            '.bashrc': {
              name: '.bashrc',
              type: 'file',
              content: '# ~/.bashrc: executed by bash(1) for non-login shells.\n\n# If not running interactively, don\'t do anything\ncase $- in\n    *i*) ;;\n      *) return;;\nesac\n\n# Alias definitions\nalias ll=\'ls -la\'\nalias la=\'ls -A\'\nalias l=\'ls -CF\'',
            },
            '.profile': {
              name: '.profile',
              type: 'file',
              content: '# ~/.profile: executed by the command interpreter for login shells.\n\n# set PATH so it includes user\'s private bin if it exists\nif [ -d "$HOME/bin" ] ; then\n    PATH="$HOME/bin:$PATH"\nfi',
            },
          },
        },
      },
    },
    etc: {
      name: 'etc',
      type: 'directory',
      children: {
        hostname: {
          name: 'hostname',
          type: 'file',
          content: 'linux-sim',
        },
        passwd: {
          name: 'passwd',
          type: 'file',
          content: 'root:x:0:0:root:/root:/bin/bash\nuser:x:1000:1000:User:/home/user:/bin/bash',
        },
        'os-release': {
          name: 'os-release',
          type: 'file',
          content: 'NAME="Linux Simulator"\nVERSION="24.04 LTS (Noble Numbat)"\nID=linux\nID_LIKE=linux\nPRETTY_NAME="Linux Simulator"\nVERSION_ID="24.04"\nHOME_URL="https://www.linux.org/"\nSUPPORT_URL="https://help.linux.org/"',
        },
      },
    },
    var: {
      name: 'var',
      type: 'directory',
      children: {
        log: {
          name: 'log',
          type: 'directory',
          children: {
            'syslog': {
              name: 'syslog',
              type: 'file',
              content: 'Dec  5 10:00:00 linux-sim systemd[1]: Started Linux Simulator.\nDec  5 10:00:01 linux-sim kernel: Welcome to Linux Simulator!',
            },
          },
        },
      },
    },
    usr: {
      name: 'usr',
      type: 'directory',
      children: {
        bin: {
          name: 'bin',
          type: 'directory',
          children: {},
        },
        share: {
          name: 'share',
          type: 'directory',
          children: {
            doc: {
              name: 'doc',
              type: 'directory',
              children: {},
            },
          },
        },
      },
    },
    tmp: {
      name: 'tmp',
      type: 'directory',
      children: {},
    },
  },
};

export class VirtualFileSystem {
  private root: FileSystemNode;
  private currentPath: string;

  constructor() {
    this.root = JSON.parse(JSON.stringify(initialFileSystem));
    this.currentPath = '/home/user';
  }

  getCurrentPath(): string {
    return this.currentPath;
  }

  private normalizePath(path: string): string {
    if (path.startsWith('~')) {
      path = '/home/user' + path.slice(1);
    }

    if (!path.startsWith('/')) {
      path = this.currentPath + '/' + path;
    }

    // Normalize path (handle . and ..)
    const parts = path.split('/').filter(Boolean);
    const normalized: string[] = [];

    for (const part of parts) {
      if (part === '.') continue;
      if (part === '..') {
        normalized.pop();
      } else {
        normalized.push(part);
      }
    }

    return '/' + normalized.join('/');
  }

  private getNode(path: string): FileSystemNode | null {
    const normalizedPath = this.normalizePath(path);
    if (normalizedPath === '/') return this.root;

    const parts = normalizedPath.split('/').filter(Boolean);
    let current: FileSystemNode = this.root;

    for (const part of parts) {
      if (current.type !== 'directory' || !current.children) {
        return null;
      }
      if (!current.children[part]) {
        return null;
      }
      current = current.children[part];
    }

    return current;
  }

  cd(path: string): { success: boolean; error?: string } {
    const normalizedPath = this.normalizePath(path);
    const node = this.getNode(normalizedPath);

    if (!node) {
      return { success: false, error: `cd: ${path}: No such file or directory` };
    }

    if (node.type !== 'directory') {
      return { success: false, error: `cd: ${path}: Not a directory` };
    }

    this.currentPath = normalizedPath;
    return { success: true };
  }

  ls(path?: string, showHidden: boolean = false, longFormat: boolean = false): { success: boolean; output?: string; error?: string } {
    const targetPath = path || this.currentPath;
    const node = this.getNode(targetPath);

    if (!node) {
      return { success: false, error: `ls: cannot access '${targetPath}': No such file or directory` };
    }

    if (node.type !== 'directory') {
      return { success: true, output: node.name };
    }

    if (!node.children) {
      return { success: true, output: '' };
    }

    let items = Object.keys(node.children);

    if (!showHidden) {
      items = items.filter(name => !name.startsWith('.'));
    }

    items.sort();

    if (longFormat) {
      const lines = items.map(name => {
        const child = node.children![name];
        const type = child.type === 'directory' ? 'd' : '-';
        const perms = 'rwxr-xr-x';
        const size = child.type === 'file' ? (child.content?.length || 0).toString().padStart(8) : '    4096';
        const date = 'Dec  5 10:00';
        const displayName = child.type === 'directory' ? `\x1b[34m${name}\x1b[0m` : name;
        return `${type}${perms} 1 user user ${size} ${date} ${displayName}`;
      });
      return { success: true, output: lines.join('\n') };
    }

    const coloredItems = items.map(name => {
      const child = node.children![name];
      return child.type === 'directory' ? `\x1b[34m${name}\x1b[0m` : name;
    });

    return { success: true, output: coloredItems.join('  ') };
  }

  pwd(): string {
    return this.currentPath;
  }

  cat(path: string): { success: boolean; output?: string; error?: string } {
    const node = this.getNode(path);

    if (!node) {
      return { success: false, error: `cat: ${path}: No such file or directory` };
    }

    if (node.type === 'directory') {
      return { success: false, error: `cat: ${path}: Is a directory` };
    }

    return { success: true, output: node.content || '' };
  }

  mkdir(path: string): { success: boolean; error?: string } {
    const normalizedPath = this.normalizePath(path);
    const parts = normalizedPath.split('/').filter(Boolean);
    const dirName = parts.pop();

    if (!dirName) {
      return { success: false, error: 'mkdir: missing operand' };
    }

    const parentPath = '/' + parts.join('/');
    const parent = this.getNode(parentPath);

    if (!parent) {
      return { success: false, error: `mkdir: cannot create directory '${path}': No such file or directory` };
    }

    if (parent.type !== 'directory' || !parent.children) {
      return { success: false, error: `mkdir: cannot create directory '${path}': Not a directory` };
    }

    if (parent.children[dirName]) {
      return { success: false, error: `mkdir: cannot create directory '${path}': File exists` };
    }

    parent.children[dirName] = {
      name: dirName,
      type: 'directory',
      children: {},
    };

    return { success: true };
  }

  touch(path: string): { success: boolean; error?: string } {
    const normalizedPath = this.normalizePath(path);
    const parts = normalizedPath.split('/').filter(Boolean);
    const fileName = parts.pop();

    if (!fileName) {
      return { success: false, error: 'touch: missing file operand' };
    }

    const parentPath = '/' + parts.join('/');
    const parent = this.getNode(parentPath);

    if (!parent) {
      return { success: false, error: `touch: cannot touch '${path}': No such file or directory` };
    }

    if (parent.type !== 'directory' || !parent.children) {
      return { success: false, error: `touch: cannot touch '${path}': Not a directory` };
    }

    if (!parent.children[fileName]) {
      parent.children[fileName] = {
        name: fileName,
        type: 'file',
        content: '',
      };
    }

    return { success: true };
  }

  rm(path: string, recursive: boolean = false): { success: boolean; error?: string } {
    const normalizedPath = this.normalizePath(path);
    const parts = normalizedPath.split('/').filter(Boolean);
    const targetName = parts.pop();

    if (!targetName) {
      return { success: false, error: 'rm: missing operand' };
    }

    const parentPath = '/' + parts.join('/');
    const parent = this.getNode(parentPath);

    if (!parent || !parent.children) {
      return { success: false, error: `rm: cannot remove '${path}': No such file or directory` };
    }

    const target = parent.children[targetName];

    if (!target) {
      return { success: false, error: `rm: cannot remove '${path}': No such file or directory` };
    }

    if (target.type === 'directory' && !recursive) {
      return { success: false, error: `rm: cannot remove '${path}': Is a directory` };
    }

    delete parent.children[targetName];
    return { success: true };
  }

  getFileContent(path: string): string | null {
    const node = this.getNode(path);
    if (!node || node.type !== 'file') return null;
    return node.content || '';
  }

  setFileContent(path: string, content: string): boolean {
    const node = this.getNode(path);
    if (!node || node.type !== 'file') return false;
    node.content = content;
    return true;
  }

  listDirectory(path?: string): { name: string; type: 'file' | 'directory' }[] {
    const targetPath = path || this.currentPath;
    const node = this.getNode(targetPath);

    if (!node || node.type !== 'directory' || !node.children) {
      return [];
    }

    return Object.entries(node.children).map(([name, child]) => ({
      name,
      type: child.type,
    }));
  }
}

// Singleton instance
export const fileSystem = new VirtualFileSystem();
