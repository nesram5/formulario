"use client"

import { useState, useEffect, useRef } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Plus, Edit2, Save, Trash2, Archive, Settings } from "lucide-react"
import { SketchPicker } from 'react-color'

type Note = {
  id: string
  content: string
  isDone: boolean
}

type Column = {
  id: string
  title: string
  notes: Note[]
  backgroundColor: string
}

export default function TrelloLikeNotes() {
  const [columns, setColumns] = useState<Column[]>([])
  const [editingNote, setEditingNote] = useState<string | null>(null)
  const [editedContent, setEditedContent] = useState("")
  const [editingColumn, setEditingColumn] = useState<string | null>(null)
  const [editedColumnTitle, setEditedColumnTitle] = useState("")
  const [boardBackground, setBoardBackground] = useState("#f0f4f8")
  const newColumnInputRef = useRef<HTMLInputElement>(null)

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

  const addColumn = (title: string) => {
    const newColumn: Column = {
      id: Date.now().toString(),
      title,
      notes: [],
      backgroundColor: "#ffffff",
    }
    setColumns([...columns, newColumn])
    if (newColumnInputRef.current) {
      newColumnInputRef.current.value = "Add new column"
    }
  }

  const deleteColumn = (columnId: string) => {
    setColumns(columns.filter((col) => col.id !== columnId))
  }

  const addNote = (columnId: string) => {
    const newNote: Note = {
      id: Date.now().toString(),
      content: "New note",
      isDone: false,
    }
    setColumns(
      columns.map((col) =>
        col.id === columnId ? { ...col, notes: [...col.notes, newNote] } : col
      )
    )
    setEditingNote(newNote.id)
    setEditedContent(newNote.content)
  }

  const deleteNote = (columnId: string, noteId: string) => {
    setColumns(
      columns.map((col) =>
        col.id === columnId
          ? { ...col, notes: col.notes.filter((note) => note.id !== noteId) }
          : col
      )
    )
  }

  const startEditingNote = (noteId: string, content: string) => {
    setEditingNote(noteId)
    setEditedContent(content)
  }

  const saveEditedNote = (columnId: string, noteId: string) => {
    setColumns(
      columns.map((col) =>
        col.id === columnId
          ? {
              ...col,
              notes: col.notes.map((note) =>
                note.id === noteId ? { ...note, content: editedContent } : note
              ),
            }
          : col
      )
    )
    setEditingNote(null)
  }

  const startEditingColumn = (columnId: string, title: string) => {
    setEditingColumn(columnId)
    setEditedColumnTitle(title)
  }

  const saveEditedColumn = (columnId: string) => {
    setColumns(
      columns.map((col) =>
        col.id === columnId ? { ...col, title: editedColumnTitle } : col
      )
    )
    setEditingColumn(null)
  }

  const toggleNoteDone = (columnId: string, noteId: string) => {
    setColumns(
      columns.map((col) =>
        col.id === columnId
          ? {
              ...col,
              notes: col.notes.map((note) =>
                note.id === noteId ? { ...note, isDone: !note.isDone } : note
              ),
            }
          : col
      )
    )
  }

  const archiveCompletedTasks = (columnId: string) => {
    setColumns(
      columns.map((col) =>
        col.id === columnId
          ? { ...col, notes: col.notes.filter((note) => !note.isDone) }
          : col
      )
    )
  }

  const setColumnBackground = (columnId: string, color: string) => {
    setColumns(
      columns.map((col) =>
        col.id === columnId ? { ...col, backgroundColor: color } : col
      )
    )
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
        <Droppable droppableId="board" type="column" direction="horizontal">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="flex overflow-x-auto pb-4 space-x-4">
              {columns.map((column, index) => (
                <Draggable key={column.id} draggableId={column.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="flex-shrink-0 w-72"
                    >
                      <div className="p-4 rounded-lg shadow" style={{ backgroundColor: column.backgroundColor }}>
                        <div className="flex items-center justify-between mb-4">
                          {editingColumn === column.id ? (
                            <div className="flex items-center">
                              <Input
                                value={editedColumnTitle}
                                onChange={(e) => setEditedColumnTitle(e.target.value)}
                                className="text-xl font-semibold mr-2"
                              />
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => saveEditedColumn(column.id)}
                              >
                                <Save className="h-4 w-4" />
                              </Button>
                            </div>
                          ) : (
                            <h2 className="text-xl font-semibold">{column.title}</h2>
                          )}
                          <div className="flex space-x-2">
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button size="sm" variant="ghost">
                                  <Settings className="h-4 w-4" />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-80">
                                <div className="space-y-4">
                                  <h3 className="font-medium">Column Background</h3>
                                  <SketchPicker
                                    color={column.backgroundColor}
                                    onChangeComplete={(color) => setColumnBackground(column.id, color.hex)}
                                  />
                                </div>
                              </PopoverContent>
                            </Popover>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => startEditingColumn(column.id, column.title)}
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => deleteColumn(column.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => archiveCompletedTasks(column.id)}
                            >
                            </Button>
                          </div>
                        </div>
                        <Droppable droppableId={column.id} type="note">
                          {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4 min-h-[50px]">
                              {column.notes.map((note, index) => (
                                <Draggable key={note.id} draggableId={note.id} index={index}>
                                  {(provided) => (
                                    <Card
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      className="bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
                                    >
                                      <CardContent className="p-4">
                                        <div className="flex items-center space-x-2">
                                          <Checkbox
                                            id={`note-${note.id}`}
                                            checked={note.isDone}
                                            onCheckedChange={() => toggleNoteDone(column.id, note.id)}
                                          />
                                          {editingNote === note.id ? (
                                            <Input
                                              value={editedContent}
                                              onChange={(e) => setEditedContent(e.target.value)}
                                              className="flex-grow"
                                            />
                                          ) : (
                                            <label
                                              htmlFor={`note-${note.id}`}
                                              className={`flex-grow ${note.isDone ? 'line-through text-gray-500' : ''}`}
                                            >
                                              {note.content}
                                            </label>
                                          )}
                                        </div>
                                      </CardContent>
                                      <CardFooter className="flex justify-end space-x-2 p-2">
                                        {editingNote === note.id ? (
                                          <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => saveEditedNote(column.id, note.id)}
                                          >
                                            <Save className="h-4 w-4" />
                                          </Button>
                                        ) : (
                                          <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => startEditingNote(note.id, note.content)}
                                          >
                                            <Edit2 className="h-4 w-4" />
                                          </Button>
                                        )}
                                        <Button
                                          size="sm"
                                          variant="outline"
                                          onClick={() => deleteNote(column.id, note.id)}
                                        >
                                          <Trash2 className="h-4 w-4" />
                                        </Button>
                                      </CardFooter>
                                    </Card>
                                  )}
                                </Draggable>
                              ))}
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                        <Button
                          onClick={() => addNote(column.id)}
                          className="w-full mt-4"
                          variant="outline"
                        >
                          <Plus className="mr-2 h-4 w-4" /> Add Note
                        </Button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              <div className="flex-shrink-0 w-72">
                <div className="bg-gray-100 p-4 rounded-lg shadow">
                  <Input
                    ref={newColumnInputRef}
                    type="text"
                    defaultValue="Add new column"
                    onBlur={(e) => {
                      if (e.target.value.trim() !== "" && e.target.value !== "Add new column") {
                        addColumn(e.target.value.trim())
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && e.currentTarget.value.trim() !== "" && e.currentTarget.value !== "Add new column") {
                        addColumn(e.currentTarget.value.trim())
                      }
                    }}
                    className="text-xl font-semibold mb-4"
                  />
                </div>
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}