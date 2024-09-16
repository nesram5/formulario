import { Draggable , Droppable } from "react-beautiful-dnd"
import { Input } from "@/components/ui/input"
import Button from "@/components/ui/button"
import { Plus, Edit2, Save, Trash2 } from "lucide-react"
import DroppableNote from "./DroppableNote"
import { useState, useRef } from "react"
import { Column, Note } from '@/lib/types'

interface ChildProps {
  columns: Column[];
  setColumns: React.Dispatch<React.SetStateAction<Column[]>>;
}

const DropabbleColumn: React.FC<ChildProps> = ({ columns, setColumns }) => {
    
    const [editingNote, setEditingNote] = useState<string | null>(null)
    const [editedContent, setEditedContent] = useState("")
    const [editingColumn, setEditingColumn] = useState<string | null>(null)
    const [editedColumnTitle, setEditedColumnTitle] = useState("")
    const newColumnInputRef = useRef<HTMLInputElement>(null)


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
          columns.map((col: any) =>
            col.id === columnId ? { ...col, notes: [...col.notes, newNote] } : col
          )
        )
        setEditingNote(newNote.id)
        setEditedContent(newNote.content)
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
    
    
    return (
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
                      <div className="p-4 rounded-lg shadow">
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
                              <Button
                              size="sm"
                              variant="button"
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
                          <DroppableNote columns = {columns} setColumns ={setColumns} column={column} />
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

)}

    
export default DropabbleColumn;