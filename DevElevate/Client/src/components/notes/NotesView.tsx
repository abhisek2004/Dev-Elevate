import React, { useState } from 'react';
import { Plus, Search, Filter, FileText, Tag, Calendar, User, Brain, Download, Share2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/Input';
import { Modal } from '../ui/modal';
import { Note, useNotes } from '../../contexts/AppContext';
import { useGlobalState } from '../../contexts/GlobalContext';
import { AIService } from '../../services/aiService';
import { formatDate, generateId } from '../../utils/helperAI';

 const NotesView: React.FC = () => {
  const { notes, addNote, updateNote, deleteNote } = useNotes();
  const { state } = useGlobalState();
  
  // Safety check for global state
  if (!state) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="mx-auto mb-4 w-8 h-8 rounded-full border-4 border-blue-500 animate-spin border-t-transparent"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    tag: 'all' as string,
    dateRange: 'all' as 'all' | 'today' | 'week' | 'month',
    hasAISummary: 'all' as 'all' | 'yes' | 'no',
  });
  const [newNote, setNewNote] = useState({
    title: '',
    content: '',
    tags: [] as string[],
  });

  // Safety check for notes
  if (!notes) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="mx-auto mb-4 w-8 h-8 rounded-full border-4 border-blue-500 animate-spin border-t-transparent"></div>
          <p className={`${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Loading notes...</p>
        </div>
      </div>
    );
  }

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesTag = filters.tag === 'all' || note.tags.includes(filters.tag);
    
    const matchesDate = (() => {
      if (filters.dateRange === 'all') return true;
      const now = new Date();
      const noteDate = new Date(note.createdAt);
      
      switch (filters.dateRange) {
        case 'today':
          return noteDate.toDateString() === now.toDateString();
        case 'week':
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          return noteDate >= weekAgo;
        case 'month':
          const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          return noteDate >= monthAgo;
        default:
          return true;
      }
    })();
    
    const matchesAISummary = filters.hasAISummary === 'all' ||
      (filters.hasAISummary === 'yes' && note.aiSummary) ||
      (filters.hasAISummary === 'no' && !note.aiSummary);
    
    return matchesSearch && matchesTag && matchesDate && matchesAISummary;
  });

  const handleCreateNote = async () => {
    if (!newNote.title.trim()) return;

    const note: Note = {
      id: generateId(),
      title: newNote.title,
      content: newNote.content,
      tags: newNote.tags,
      createdAt: new Date(),
      updatedAt: new Date(),
      authorId: '1',
      isPublic: false,
      collaborators: [],
    };

    // Generate AI tags if content exists
    if (newNote.content.trim()) {
      try {
        setAiLoading(true);
        const aiTags = await AIService.generateTags(newNote.content);
        note.tags = [...new Set([...newNote.tags, ...aiTags])];
      } catch (error) {
        console.error('Failed to generate AI tags:', error);
      } finally {
        setAiLoading(false);
      }
    }

    addNote(note);
    setIsCreateModalOpen(false);
    setNewNote({ title: '', content: '', tags: [] });
  };

  const handleUpdateNote = async (noteId: string, updates: Partial<Note>) => {
    updateNote(noteId, { ...updates, updatedAt: new Date() });
  };

  const handleAISummarize = async (noteId: string) => {
    const note = notes.find(n => n.id === noteId);
    if (!note) return;

    try {
      setAiLoading(true);
      const summary = await AIService.summarizeText(note.content);
      updateNote(noteId, { aiSummary: summary });
    } catch (error) {
      console.error('Failed to generate summary:', error);
    } finally {
      setAiLoading(false);
    }
  };

  const NoteCard: React.FC<{ note: Note }> = ({ note }) => (
    <div
      className={`p-6 rounded-xl border shadow-sm transition-shadow cursor-pointer hover:shadow-md ${
        state.darkMode 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}
      onClick={() => setSelectedNote(note)}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className={`text-lg font-semibold truncate ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
          {note.title}
        </h3>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              handleAISummarize(note.id);
            }}
            disabled={aiLoading}
          >
            <Brain size={16} />
          </Button>
        </div>
      </div>
      
      <p className={`mb-4 text-sm line-clamp-3 ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        {note.content.substring(0, 150)}...
      </p>

      {note.aiSummary && (
        <div className={`p-3 mb-4 rounded-lg ${
          state.darkMode ? 'bg-blue-900/20' : 'bg-blue-50'
        }`}>
          <p className={`text-sm ${
            state.darkMode ? 'text-blue-300' : 'text-blue-700'
          }`}>
            <Brain size={14} className="inline mr-1" />
            AI Summary: {note.aiSummary}
          </p>
        </div>
      )}

      <div className="flex justify-between items-center">
        <div className={`flex items-center space-x-4 text-sm ${state.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          <span className="flex items-center">
            <Calendar size={14} className="mr-1" />
            {formatDate(note.createdAt)}
          </span>
          <span className="flex items-center">
            <User size={14} className="mr-1" />
            You
          </span>
        </div>
        
        {note.tags.length > 0 && (
          <div className="flex items-center space-x-1">
            {note.tags.slice(0, 3).map(tag => (
              <span
                key={tag}
                className={`px-2 py-1 text-xs rounded-full ${
                  state.darkMode 
                    ? 'bg-gray-700 text-gray-400' 
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {tag}
              </span>
            ))}
            {note.tags.length > 3 && (
              <span className={`text-xs ${state.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                +{note.tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );

  const NoteEditor: React.FC<{ note: Note }> = ({ note }) => {
    const [editedNote, setEditedNote] = useState(note);

    const handleSave = () => {
      handleUpdateNote(note.id, editedNote);
      setIsEditing(false);
    };

    return (
      <div className="space-y-4">
        <Input
          value={editedNote.title}
          onChange={(e) => setEditedNote({ ...editedNote, title: e.target.value })}
          placeholder="Note title..."
          className="text-2xl font-bold"
        />
        
        <textarea
          value={editedNote.content}
          onChange={(e) => setEditedNote({ ...editedNote, content: e.target.value })}
          placeholder="Start writing your note..."
          rows={15}
          className={`p-4 w-full rounded-lg border resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            state.darkMode 
              ? 'bg-gray-800 border-gray-600 text-white' 
              : 'bg-white border-gray-300 text-gray-900'
          }`}
        />

        <div className="flex justify-between items-center">
          <Input
            value={editedNote.tags.join(', ')}
            onChange={(e) => setEditedNote({ 
              ...editedNote, 
              tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
            })}
            placeholder="Add tags (comma separated)..."
            icon={<Tag size={16} />}
            className="flex-1 mr-4"
          />
          
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSave}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12`}>
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className={`text-2xl font-bold ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>Notes</h2>
          <p className={`mt-1 ${state.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {notes.length} notes • AI-powered organization
          </p>
        </div>
        <Button
          variant="primary"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <Plus size={16} className="mr-2" />
          New Note
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <Input
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search size={16} />}
            />
          </div>
          <Button 
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={16} className="mr-2" />
            Filter
          </Button>
        </div>
        
        {showFilters && (
          <div className={`p-4 rounded-lg border ${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Tag
                </label>
                <select
                  value={filters.tag}
                  onChange={(e) => setFilters({...filters, tag: e.target.value})}
                  className={`w-full p-2 rounded-md border ${state.darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                >
                  <option value="all">All Tags</option>
                  {Array.from(new Set(notes.flatMap(note => note.tags))).map(tag => (
                    <option key={tag} value={tag}>{tag}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Date Range
                </label>
                <select
                  value={filters.dateRange}
                  onChange={(e) => setFilters({...filters, dateRange: e.target.value as any})}
                  className={`w-full p-2 rounded-md border ${state.darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">Last Week</option>
                  <option value="month">Last Month</option>
                </select>
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  AI Summary
                </label>
                <select
                  value={filters.hasAISummary}
                  onChange={(e) => setFilters({...filters, hasAISummary: e.target.value as any})}
                  className={`w-full p-2 rounded-md border ${state.darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                >
                  <option value="all">All Notes</option>
                  <option value="yes">With AI Summary</option>
                  <option value="no">Without AI Summary</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setFilters({ tag: 'all', dateRange: 'all', hasAISummary: 'all' })}
              >
                Clear Filters
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredNotes.map(note => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>

      {/* Create Note Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Note"
        size="lg"
      >
        <div className="space-y-4">
          <Input
            placeholder="Note title..."
            value={newNote.title}
            onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
          />
          
          <textarea
            placeholder="Start writing your note..."
            value={newNote.content}
            onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
            rows={10}
            className={`p-4 w-full rounded-lg border resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              state.darkMode 
                ? 'bg-gray-800 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          />

          <Input
            placeholder="Add tags (comma separated)..."
            value={newNote.tags.join(', ')}
            onChange={(e) => setNewNote({ 
              ...newNote, 
              tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
            })}
            icon={<Tag size={16} />}
          />

          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => setIsCreateModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleCreateNote}
              loading={aiLoading}
            >
              Create Note
            </Button>
          </div>
        </div>
      </Modal>

      {/* Note Detail Modal */}
      <Modal
        isOpen={!!selectedNote}
        onClose={() => {
          setSelectedNote(null);
          setIsEditing(false);
        }}
        title={selectedNote?.title || 'Note'}
        size="xl"
      >
        {selectedNote && (
          <div className="space-y-4">
            {isEditing ? (
              <NoteEditor note={selectedNote} />
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className={`flex items-center space-x-4 text-sm ${state.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    <span>Created {formatDate(selectedNote.createdAt)}</span>
                    <span>Updated {formatDate(selectedNote.updatedAt)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleAISummarize(selectedNote.id)}
                      disabled={aiLoading}
                    >
                      <Brain size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                    >
                      <Share2 size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                    >
                      <Download size={16} />
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => setIsEditing(true)}
                    >
                      Edit
                    </Button>
                  </div>
                </div>

                {selectedNote.aiSummary && (
                  <div className={`p-4 rounded-lg ${
                  state.darkMode ? 'bg-blue-900/20' : 'bg-blue-50'
                }`}>
                    <h4 className={`mb-2 font-medium ${
                      state.darkMode ? 'text-blue-100' : 'text-blue-900'
                    }`}>
                      <Brain size={16} className="inline mr-2" />
                      AI Summary
                    </h4>
                    <p className={`${
                      state.darkMode ? 'text-blue-200' : 'text-blue-800'
                    }`}>{selectedNote.aiSummary}</p>
                  </div>
                )}

                <div className={`max-w-none prose ${state.darkMode ? 'prose-invert' : ''}`}>
                  <div className={`whitespace-pre-wrap ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {selectedNote.content}
                  </div>
                </div>

                {selectedNote.tags.length > 0 && (
                  <div className={`flex items-center pt-4 space-x-2 border-t ${
                    state.darkMode ? 'border-gray-700' : 'border-gray-200'
                  }`}>
                    <Tag size={16} className={`${state.darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    <div className="flex flex-wrap gap-2">
                      {selectedNote.tags.map(tag => (
                        <span
                          key={tag}
                          className={`px-2 py-1 text-sm rounded-full ${
                            state.darkMode 
                              ? 'bg-gray-700 text-gray-400' 
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};
export default NotesView;