// searchNotes.ts
interface Note {
  name: string;
  content: string;
  icon: any;
  link: string;
  customDocs: boolean;
}

export const searchNotes = (query: string, notes: Note[]) => {
  const lowerQuery = query.toLowerCase();

  return notes
    .map(note => ({
      ...note,
      score:
        note.name.toLowerCase().includes(lowerQuery) ||
        note.content.toLowerCase().includes(lowerQuery)
          ? 1
          : 0,
    }))
    .filter(note => note.score > 0) // Only notes that match
    .sort((a, b) => b.score - a.score); // Optional: highest score first
};
