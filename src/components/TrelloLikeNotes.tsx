"use client"

import { useState, useEffect } from "react"
import { DragDropContext  } from "react-beautiful-dnd"
import DropabbleColumn from "./DropabbleColumn"
import { Column } from '@/lib/types'

export default function TrelloLikeNotes() {
  const [columns, setColumns] = useState<Column[]>([])

  useEffect(() => {
    const savedColumns = localStorage.getItem("trelloLikeColumns")
    if (savedColumns) {
      setColumns(JSON.parse(savedColumns))
    } else {
      setColumns([
        { id: "todo", title: "To Do", notes: [], backgroundColor: "#ffffff" },
        { id: "inProgress", title: "In Progress", notes: [], backgroundColor: "#ffffff" },
        { id: "done", title: "Done", notes: [], backgroundColor: "#ffffff" },
      ])
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("trelloLikeColumns", JSON.stringify(columns))
  }, [columns])

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
    <div className="min-h-screen p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-900">Trello-like Notes</h1>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
              
      <DropabbleColumn columns = {columns} setColumns ={setColumns} />
              
      </DragDropContext>
    </div>
  )
}