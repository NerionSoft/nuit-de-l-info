

export type FileNode = {
  id: string
  name: string
  type: "file" | "directory"
  children?: FileNode[]
  content?: string
}