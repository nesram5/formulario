import { Droppable, Draggable } from "react-beautiful-dnd"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Edit2, Save, Trash2 } from "lucide-react"
import { Column } from '@/lib/types'

interface ChildProps {
    columns: Column[];
    setColumns: React.Dispatch<React.SetStateAction<Column[]>>;
    column: any;
  }
  
const DroppableNote: React.FC<ChildProps> = ({ columns, setColumns, column }) => {

    const [editingNote, setEditingNote] = useState<string | null>(null)
    const [editedContent, setEditedContent] = useState("")

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

    const startEditingNote = (noteId: string, content: string) => {
        setEditingNote(noteId)
        setEditedContent(content)
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
    
return (
<Droppable droppableId={column.id} type="note">
    {(provided) => (
    <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4 min-h-[50px]">
        
        {column.notes.map((note: any, index: any) => (
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
)}

export default DroppableNote;