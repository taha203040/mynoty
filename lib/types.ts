interface GetNoteId {
    noteId: string
}
interface updateData {
    Subject: string
    Text: string
    noteId: string
}
interface note {
    noteId: string
}
interface folder {
    folder?: string
    folderid?: string
    userid?: string
}
interface NotesData {
    Folders: string
    Subject: string

}


interface fldr {
    fldr: string
}