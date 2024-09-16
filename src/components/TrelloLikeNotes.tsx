"use client"

import { useState, useEffect } from "react"
import { DragDropContext  } from "react-beautiful-dnd"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Settings } from "lucide-react"
import { SketchPicker } from 'react-color'
import DropabbleColumn from "./DropabbleColumn"
import { Column } from '@/lib/types'

export default function TrelloLikeNotes() {
  const [columns, setColumns] = useState<Column[]>([])
  const [boardBackground, setBoardBackground] = useState("#f0f4f8")

  useEffect(() => {
    const savedColumns = localStorage.getItem("trelloLikeColumns")
    const savedBackground = localStorage.getItem("trelloLikeBoardBackground")
    if (savedColumns) {
      setColumns(JSON.parse(savedColumns))
    } else {
      setColumns([
        { id: "todo", title: "To Do", notes: [], backgroundColor: "#ffffff" },
        { id: "inProgress", title: "In Progress", notes: [], backgroundColor: "#ffffff" },
        { id: "done", title: "Done", notes: [], backgroundColor: "#ffffff" },
      ])
    }
    if (savedBackground) {
      setBoardBackground(savedBackground)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("trelloLikeColumns", JSON.stringify(columns))
  }, [columns])

  useEffect(() => {
    localStorage.setItem("trelloLikeBoardBackground", boardBackground)
  }, [boardBackground])

  const onDragEnd = (result: any) => {
    const { source, destination, type } = result

    if (!destination) return

    if (type === "column") {
      const newColumns = Array.from(columns)
      const [reorderedColumn] = newColumns.splice(source.index, 1)
      newColumns.splice(destination.index, 0, reorderedColumn)
      setColumns(newColumns)
      return
    }
    
    const sourceColumn = columns.find((col) => col.id === source.droppableId)
    const destColumn = columns.find((col) => col.id === destination.droppableId)

    if (sourceColumn && destColumn) {
      const sourceNotes = Array.from(sourceColumn.notes)
      const destNotes = Array.from(destColumn.notes)
      const [removed] = sourceNotes.splice(source.index, 1)
      destNotes.splice(destination.index, 0, removed)

      setColumns(
        columns.map((col) => {
          if (col.id === source.droppableId) {
            return { ...col, notes: sourceNotes }
          }
          if (col.id === destination.droppableId) {
            return { ...col, notes: destNotes }
          }
          return col
        })
      )
    }
  }

  return (
    <div className="min-h-screen p-4" style={{ backgroundColor: boardBackground }}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-900">Trello-like Notes</h1>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline"><Settings className="mr-2 h-4 w-4" /> Board Settings</Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-4">
              <h3 className="font-medium">Board Background</h3>
              <SketchPicker
                color={boardBackground}
                onChangeComplete={(color) => setBoardBackground(color.hex)}
              />
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
              
      <DropabbleColumn columns = {columns} setColumns ={setColumns} />
              
      </DragDropContext>
    </div>
  )
}