import { create } from "zustand"
import { nanoid } from "nanoid"
import { FileNode } from "@/types/file"
import { persist, createJSONStorage } from "zustand/middleware"

type State = {
  root: FileNode
  currentPath: string[]
  currentNode: FileNode | null
  selectedNodeId: string | null
}

type Actions = {
  help: (args: string[]) => string
  cd: (args: string[]) => string | void
  ls: (args: string[]) => string | FileNode[]
  mkdir: (args: string[]) => string | void
  touch: (args: string[]) => string | void
  rename: (args: string[]) => string | void
  rm: (args: string[]) => string | void
  rmdir: (args: string[]) => string | void
  cat: (args: string[]) => string

  writeFile: (name: string, content: string) => void
  getNodeAtPath: (path: string[]) => FileNode | null
  getCurrentDirectory: () => FileNode

  selectNode: (id: string | null) => void
}

const getNodeAtPathHelper = (root: FileNode, path: string[]): FileNode | null => {
  let node = root
  for (const part of path) {
    if (node.type !== "directory") return null
    const next = node.children?.find(c => c.name === part)
    if (!next) return null
    node = next
  }
  return node
}

const clone = <T,>(obj: T): T => structuredClone(obj)

export const useFileTree = create<State & Actions>()(
  persist(
    (set, get) => ({
      root: {
        id: nanoid(),
        name: "/",
        type: "directory",
        children: []
      },
      currentPath: [],
      currentNode: null,
      selectedNodeId: null,

      //
      // HELP
      //
      help: (args: string[]) => {
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
      // COMMANDS
      //
      cd: (args) => {
        if (args.length < 1) return get().help(["cd"])
        const pathStr = args[0]
        const parts = pathStr.split("/").filter(Boolean)

        const newPath =
          pathStr.startsWith("/")
            ? parts
            : [...get().currentPath, ...parts]

        const node = get().getNodeAtPath(newPath)
        if (!node || node.type !== "directory") return "cd: not a directory"

        set({ currentPath: newPath, currentNode: node })
      },

      ls: () => {
        const dir = get().getCurrentDirectory()
        return dir.children ?? []
      },

      mkdir: (args) => {
        if (args.length < 1) return get().help(["mkdir"])
        const name = args[0]

        set(state => {
          const root = clone(state.root)
          const dir = getNodeAtPathHelper(root, state.currentPath)
          if (!dir) return {}

          dir.children = dir.children ?? []

          if (dir.children.some(c => c.name === name))
            return { error: "mkdir: already exists" }

          dir.children.push({
            id: nanoid(),
            name,
            type: "directory",
            children: []
          })

          return { root }
        })
      },

      touch: (args) => {
        if (args.length < 1) return get().help(["touch"])

        const name = args[0]
        const content = args.slice(1).join(" ") || ""

        set(state => {
          const root = clone(state.root)
          const dir = getNodeAtPathHelper(root, state.currentPath)
          if (!dir) return {}

          dir.children = dir.children ?? []

          if (dir.children.some(c => c.name === name))
            return { error: "touch: already exists" }

          dir.children.push({
            id: nanoid(),
            name,
            type: "file",
            content
          })

          return { root }
        })
      },

      rename: (args) => {
        if (args.length < 2) return get().help(["rename"])
        const [oldName, newName] = args

        set(state => {
          const root = clone(state.root)
          const dir = getNodeAtPathHelper(root, state.currentPath)
          if (!dir?.children) return {}

          const node = dir.children.find(c => c.name === oldName)
          if (!node) return {}

          node.name = newName
          return { root }
        })
      },

      rm: (args) => {
        if (args.length < 1) return get().help(["rm"])
        const name = args[0]

        set(state => {
          const root = clone(state.root)
          const dir = getNodeAtPathHelper(root, state.currentPath)
          if (!dir?.children) return {}

          dir.children = dir.children.filter(
            c => !(c.name === name && c.type === "file")
          )

          return { root }
        })
      },

      rmdir: (args) => {
        if (args.length < 1) return get().help(["rmdir"])
        const name = args[0]

        set(state => {
          const root = clone(state.root)
          const dir = getNodeAtPathHelper(root, state.currentPath)
          if (!dir?.children) return {}

          dir.children = dir.children.filter(
            c => !(c.name === name && c.type === "directory")
          )

          return { root }
        })
      },

      //
      // INTERNAL
      //
      writeFile: (name, content) => {
        set(state => {
          const root = clone(state.root)
          const dir = getNodeAtPathHelper(root, state.currentPath)
          if (!dir?.children) return {}

          const f = dir.children.find(c => c.name === name)
          if (!f || f.type !== "file") return {}

          f.content = content
          return { root }
        })
      },

      cat: (args: string[]) => {
        if (args.length < 1) return get().help(["cat"])

        const name = args[0]
        const dir = get().getCurrentDirectory()

        const file = dir.children?.find(
          (c) => c.name === name && c.type === "file"
        )

        if (!file) return `cat: file not found: ${name}`
        if (!file.content) return ""

        return file.content
      },

      getNodeAtPath: path => getNodeAtPathHelper(get().root, path),

      getCurrentDirectory: () =>
        get().getNodeAtPath(get().currentPath) ?? get().root,

      selectNode: id => set({ selectedNodeId: id }),
    }),
    {
      name: "filetree-storage",
      storage: createJSONStorage(() => localStorage),
      version: 1,
    }
  )
)
