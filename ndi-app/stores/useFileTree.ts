import { create } from "zustand"
import { nanoid } from "nanoid"
import { persist, createJSONStorage } from "zustand/middleware"
import { FileNode } from "@/types/file"

//
// TYPES
//
type Context = {
  processId: number
  currentPath: string[]
  currentNode: FileNode | null
  selectedNodeId: string | null
}

type BoundActions = {
  help: (args?: string[]) => string
  cd: (args?: string[]) => string | void
  ls: (args?: string[]) => string | FileNode[]
  mkdir: (args?: string[]) => string | void
  touch: (args?: string[]) => string | void
  rename: (args?: string[]) => string | void
  rm: (args?: string[]) => string | void
  rmdir: (args?: string[]) => string | void
  cat: (args?: string[]) => string

  writeFile: (name: string, content: string) => void
  getNodeAtPath: (path: string[]) => FileNode | null
  getCurrentDirectory: () => FileNode

  selectNode: (id: string | null) => void
}

type Actions = {
  // internal (pid aware)
  help: (pid: number, args?: string[]) => string
  cd: (pid: number, args?: string[]) => string | void
  ls: (pid: number, args?: string[]) => string | FileNode[]
  mkdir: (pid: number, args?: string[]) => string | void
  touch: (pid: number, args?: string[]) => string | void
  rename: (pid: number, args?: string[]) => string | void
  rm: (pid: number, args?: string[]) => string | void
  rmdir: (pid: number, args?: string[]) => string | void
  cat: (pid: number, args?: string[]) => string

  writeFile: (pid: number, name: string, content: string) => void
  getNodeAtPath: (pid: number, path: string[]) => FileNode | null
  getCurrentDirectory: (pid: number) => FileNode
  selectNode: (pid: number, id: string | null) => void
}

type State = {
  root: FileNode
  contexts: Context[]

  pid_counter: number
  createContext: () => Context
  useContext: (pid: number) => BoundActions
}

//
// HELPERS
//
const getNodeAtPathHelper = (root: FileNode, path: string[]): FileNode | null => {
  const node = root
  for (const part of path) {
    if (node.type !== "directory") return null
    return node.children?.find(c => c.name === part) ?? null
  }
  return node
}

const clone = <T,>(obj: T): T => structuredClone(obj)

//
// STORE
//
export const useFileTree = create<State & Actions>()(
  persist(
    (set, get) => ({
      //
      // ROOT FS + MULTI CONTEXT
      //
      root: {
        id: nanoid(),
        name: "/",
        type: "directory",
        children: []
      },
      pid_counter: 1,
      contexts: [
        {
          processId: 1,
          currentPath: [],
          currentNode: null,
          selectedNodeId: null
        }
      ],

      //
      // HELP
      //
      help: (pid, args = []) => {
        const commands = {
          help:  "help [cmd]                — show help",
          cd:    "cd <path>                 — change directory",
          ls:    "ls                        — list directory",
          mkdir: "mkdir <name>              — create directory",
          touch: "touch <name> [content]    — create file",
          rename:"rename <old> <new>        — rename file or directory",
          rm:    "rm <name>                 — delete file",
          rmdir: "rmdir <name>              — delete directory",
          cat:   "cat <name>                — show file content",
        }

        if (args.length === 1) {
          const cmd = args[0]
          return commands[cmd as keyof typeof commands] ?? `Unknown command: ${cmd}`
        }

        return Object.values(commands).join("\n")
      },

      //
      // INTERNALLY PID-AWARE GETTERS
      //
      getNodeAtPath: (pid, path) => {
        const { root } = get()
        return getNodeAtPathHelper(root, path)
      },

      getCurrentDirectory: (pid) => {
        const { contexts, root } = get()
        const ctx = contexts.find(c => c.processId === pid)!
        return get().getNodeAtPath(pid, ctx.currentPath) ?? root
      },

      //
      // COMMANDS (PID aware)
      //
      cd: (pid, args = []) => {
        const ctx = get().contexts.find(c => c.processId === pid)!
        if (args.length < 1) return get().help(pid, ["cd"])

        const pathStr = args[0]
        const parts = pathStr.split("/").filter(Boolean)

        const newPath =
          pathStr.startsWith("/")
            ? parts
            : [...ctx.currentPath, ...parts]

        const node = get().getNodeAtPath(pid, newPath)
        if (!node || node.type !== "directory") return "cd: not a directory"

        ctx.currentPath = newPath
        ctx.currentNode = node
        set({ contexts: [...get().contexts] })
      },

      ls: (pid) => {
        const dir = get().getCurrentDirectory(pid)
        return dir.children ?? []
      },

      mkdir: (pid, args = []) => {
        if (args.length < 1) return get().help(pid, ["mkdir"])

        const ctx = get().contexts.find(c => c.processId === pid)!
        const name = args[0]

        set(state => {
          const root = clone(state.root)
          const dir = getNodeAtPathHelper(root, ctx.currentPath)
          if (!dir) return {}

          dir.children = dir.children ?? []

          if (dir.children.some(c => c.name === name))
            return {}

          dir.children.push({
            id: nanoid(),
            name,
            type: "directory",
            children: []
          })

          return { root }
        })
      },

      touch: (pid, args = []) => {
        if (args.length < 1) return get().help(pid, ["touch"])

        const name = args[0]
        const content = args.slice(1).join(" ")

        const ctx = get().contexts.find(c => c.processId === pid)!

        set(state => {
          const root = clone(state.root)
          const dir = getNodeAtPathHelper(root, ctx.currentPath)
          if (!dir) return {}

          dir.children = dir.children ?? []

          if (dir.children.some(c => c.name === name))
            return {}

          dir.children.push({
            id: nanoid(),
            name,
            type: "file",
            content
          })

          return { root }
        })
      },

      rename: (pid, args = []) => {
        if (args.length < 2) return get().help(pid, ["rename"])

        const ctx = get().contexts.find(c => c.processId === pid)!
        const [oldName, newName] = args

        set(state => {
          const root = clone(state.root)
          const dir = getNodeAtPathHelper(root, ctx.currentPath)
          if (!dir?.children) return {}

          const node = dir.children.find(c => c.name === oldName)
          if (!node) return {}

          node.name = newName
          return { root }
        })
      },

      rm: (pid, args = []) => {
        if (args.length < 1) return get().help(pid, ["rm"])

        const ctx = get().contexts.find(c => c.processId === pid)!
        const name = args[0]

        set(state => {
          const root = clone(state.root)
          const dir = getNodeAtPathHelper(root, ctx.currentPath)
          if (!dir?.children) return {}

          dir.children = dir.children.filter(
            c => !(c.name === name && c.type === "file")
          )

          return { root }
        })
      },

      rmdir: (pid, args = []) => {
        if (args.length < 1) return get().help(pid, ["rmdir"])

        const ctx = get().contexts.find(c => c.processId === pid)!
        const name = args[0]

        set(state => {
          const root = clone(state.root)
          const dir = getNodeAtPathHelper(root, ctx.currentPath)
          if (!dir?.children) return {}

          dir.children = dir.children.filter(
            c => !(c.name === name && c.type === "directory")
          )

          return { root }
        })
      },

      cat: (pid, args = []) => {
        if (args.length < 1) return get().help(pid, ["cat"])
        const ctx = get().contexts.find(c => c.processId === pid)!
        const name = args[0]

        const dir = get().getCurrentDirectory(pid)
        const file = dir.children?.find(c => c.name === name && c.type === "file")

        if (!file) return `cat: file not found: ${name}`
        return file.content ?? ""
      },

      writeFile: (pid, name, content) => {
        const ctx = get().contexts.find(c => c.processId === pid)!

        set(state => {
          const root = clone(state.root)
          const dir = getNodeAtPathHelper(root, ctx.currentPath)
          if (!dir) return {}

          const f = dir.children?.find(c => c.name === name && c.type === "file")
          if (!f) return {}

          f.content = content
          return { root }
        })
      },

      selectNode: (pid, id) => {
        const ctx = get().contexts.find(c => c.processId === pid)!
        ctx.selectedNodeId = id
        set({ contexts: [...get().contexts] })
      },

      //
      // CONTEXT BINDING
      //
      createContext: () => {
        const context = {
          processId: ++get().pid_counter,
          currentPath: [],
          currentNode: null,
          selectedNodeId: null
        }
        get().contexts.push(context)
        return context
      },
      useContext: (pid) => {
        const a = get()

        return {
          help:  (args) => a.help(pid, args),
          cd:    (args) => a.cd(pid, args),
          ls:    (args) => a.ls(pid, args),
          mkdir: (args) => a.mkdir(pid, args),
          touch: (args) => a.touch(pid, args),
          rename:(args) => a.rename(pid, args),
          rm:    (args) => a.rm(pid, args),
          rmdir: (args) => a.rmdir(pid, args),
          cat:   (args) => a.cat(pid, args),

          writeFile: (n, c) => a.writeFile(pid, n, c),
          getNodeAtPath: (p) => a.getNodeAtPath(pid, p),
          getCurrentDirectory: () => a.getCurrentDirectory(pid),

          selectNode: (id) => a.selectNode(pid, id)
        }
      }
    }),

    {
      name: "filetree-storage",
      storage: createJSONStorage(() => localStorage),
      version: 1,
    }
  )
)
