"use client"

import { useState } from "react"
import { useFileTree } from "@/stores/useFileTree"
import { FileNode } from "@/types/file"

export default function Terminal() {
  const [history, setHistory] = useState<string[]>([])
  const [input, setInput] = useState("")

  const run = (cmd: string): string | FileNode[] | void => {
    const parts = cmd.trim().split(" ").filter(Boolean)
    if (parts.length === 0) return

    const name = parts[0]
    const args = parts.slice(1)

    const api = useFileTree.getState()

    switch (name) {
      case "help":  return api.help(args)
      case "cd":    return api.cd(args)
      case "ls":    return api.ls(args)
      case "mkdir": return api.mkdir(args)
      case "touch": return api.touch(args)
      case "rename":return api.rename(args)
      case "rm":    return api.rm(args)
      case "rmdir": return api.rmdir(args)
      case "cat":   return api.cat(args)
      default:
        return `Unknown command: ${name}`
    }
  }

  function formatNodeForLs(node: FileNode): string {
    if (node.type === "directory") return node.name + "/"
    return node.name
  }


  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return

    const cmd = input.trim()
    if (!cmd) return

    const result = run(cmd)

    setHistory(h => {
      const lines: string[] = []
      lines.push(`> ${cmd}`)

      if (Array.isArray(result)) {
        // ls output formatting
        const out = result.map(formatNodeForLs)
        lines.push(...out)
      }  
      else if (typeof result === "string") {
        lines.push(...result.split("\n"))
      }

      return [...h, ...lines]
    })


    setInput("")
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "300px" }}>
      {/* output */}
      <div
        style={{
          flex: 1,
          background: "#111",
          color: "#0f0",
          padding: "8px",
          overflowY: "auto",
          fontFamily: "monospace"
        }}
      >
        {history.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>

      {/* input */}
      <input
        style={{
          fontFamily: "monospace",
          padding: "6px",
          border: "1px solid #333",
          outline: "none"
        }}
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={handleEnter}
      />
    </div>
  )
}
