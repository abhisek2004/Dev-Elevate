import React from 'react';
import { useGlobalState } from '../../../contexts/GlobalContext';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const { state } = useGlobalState();

  const parseMarkdown = (text: string) => {
    const lines = text.split('\n');
    const elements: JSX.Element[] = [];
    let currentList: string[] = [];
    let currentTable: string[][] = [];
    let inCodeBlock = false;
    let codeBlockContent: string[] = [];
    let codeLanguage = '';

    const flushList = () => {
      if (currentList.length > 0) {
        elements.push(
          <ul key={elements.length} className={`list-disc list-inside space-y-3 mb-8 ml-6 ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {currentList.map((item, index) => (
              <li key={index} className="leading-relaxed text-base py-1">{parseInlineMarkdown(item)}</li>
            ))}
          </ul>
        );
        currentList = [];
      }
    };

    const flushTable = () => {
      if (currentTable.length > 0) {
        const [header, ...rows] = currentTable;
        elements.push(
          <div key={elements.length} className="overflow-x-auto mb-10">
            <table className={`min-w-full border-collapse border ${state.darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
              <thead className={`${state.darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <tr>
                  {header.map((cell, index) => (
                    <th key={index} className={`border px-4 py-2 text-left font-semibold ${state.darkMode ? 'border-gray-600 text-gray-200' : 'border-gray-300 text-gray-900'}`}>
                      {parseInlineMarkdown(cell.trim())}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, rowIndex) => (
                  <tr key={rowIndex} className={`${state.darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-50'}`}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className={`border px-4 py-2 ${state.darkMode ? 'border-gray-600 text-gray-300' : 'border-gray-300 text-gray-700'}`}>
                        {parseInlineMarkdown(cell.trim())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        currentTable = [];
      }
    };

    const flushCodeBlock = () => {
      if (codeBlockContent.length > 0) {
        elements.push(
          <div key={elements.length} className="mb-10">
            <div className={`${state.darkMode ? 'bg-gray-900 border-gray-700' : 'bg-gray-100 border-gray-200'} rounded-lg border overflow-hidden`}>
              {codeLanguage && (
                <div className={`px-4 py-2 text-sm font-medium ${state.darkMode ? 'bg-gray-800 text-gray-300 border-b border-gray-700' : 'bg-gray-200 text-gray-700 border-b border-gray-300'}`}>
                  {codeLanguage}
                </div>
              )}
              <pre className={`p-4 overflow-x-auto text-sm ${state.darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                <code>{codeBlockContent.join('\n')}</code>
              </pre>
            </div>
          </div>
        );
        codeBlockContent = [];
        codeLanguage = '';
      }
    };

    lines.forEach((line, index) => {
      // Handle code blocks
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          flushCodeBlock();
          inCodeBlock = false;
        } else {
          flushList();
          flushTable();
          inCodeBlock = true;
          codeLanguage = line.substring(3).trim();
        }
        return;
      }

      if (inCodeBlock) {
        codeBlockContent.push(line);
        return;
      }

      // Handle tables
      if (line.includes('|') && line.trim() !== '') {
        flushList();
        const cells = line.split('|').map(cell => cell.trim()).filter(cell => cell !== '');
        if (cells.length > 0) {
          currentTable.push(cells);
        }
        return;
      } else {
        flushTable();
      }

      // Handle lists
      if (line.match(/^[-*]\s+/) || line.match(/^\d+\.\s+/)) {
        flushTable();
        const listItem = line.replace(/^[-*]\s+/, '').replace(/^\d+\.\s+/, '');
        currentList.push(listItem);
        return;
      } else {
        flushList();
      }

      // Handle headings
      if (line.startsWith('# ')) {
        elements.push(
          <h1 key={elements.length} className={`text-3xl font-bold mb-8 mt-12 ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
            {parseInlineMarkdown(line.substring(2))}
          </h1>
        );
      } else if (line.startsWith('## ')) {
        elements.push(
          <h2 key={elements.length} className={`text-2xl font-semibold mb-6 mt-10 ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
            {parseInlineMarkdown(line.substring(3))}
          </h2>
        );
      } else if (line.startsWith('### ')) {
        elements.push(
          <h3 key={elements.length} className={`text-xl font-semibold mb-4 mt-8 ${state.darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
            {parseInlineMarkdown(line.substring(4))}
          </h3>
        );
      } else if (line.startsWith('#### ')) {
        elements.push(
          <h4 key={elements.length} className={`text-lg font-medium mb-3 mt-6 ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {parseInlineMarkdown(line.substring(5))}
          </h4>
        );
      } else if (line.trim() === '') {
        // Skip empty lines
      } else {
        // Regular paragraph
        elements.push(
          <p key={elements.length} className={`mb-6 leading-relaxed text-base ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {parseInlineMarkdown(line)}
          </p>
        );
      }
    });

    // Flush any remaining content
    flushList();
    flushTable();
    flushCodeBlock();

    return elements;
  };

  const parseInlineMarkdown = (text: string): React.ReactNode => {
    // Handle inline code
    text = text.replace(/`([^`]+)`/g, (match, code) => {
      return `<code class="inline-code">${code}</code>`;
    });

    // Handle bold text
    text = text.replace(/\*\*([^*]+)\*\*/g, (match, bold) => {
      return `<strong class="font-semibold">${bold}</strong>`;
    });

    // Handle italic text
    text = text.replace(/\*([^*]+)\*/g, (match, italic) => {
      return `<em class="italic">${italic}</em>`;
    });

    // Create element with dangerouslySetInnerHTML for inline formatting
    return (
      <span 
        dangerouslySetInnerHTML={{ 
          __html: text 
        }} 
        className={`inline-code-container ${state.darkMode ? 'dark' : 'light'}`}
      />
    );
  };

  return (
    <div className="markdown-content">
      <style jsx>{`
        .inline-code-container.dark .inline-code {
          background-color: #374151;
          color: #f3f4f6;
          padding: 2px 6px;
          border-radius: 4px;
          font-family: 'Courier New', monospace;
          font-size: 0.875rem;
        }
        .inline-code-container.light .inline-code {
          background-color: #f3f4f6;
          color: #1f2937;
          padding: 2px 6px;
          border-radius: 4px;
          font-family: 'Courier New', monospace;
          font-size: 0.875rem;
        }
      `}</style>
      <div className="space-y-6">
        {parseMarkdown(content)}
      </div>
    </div>
  );
};

export default MarkdownRenderer;