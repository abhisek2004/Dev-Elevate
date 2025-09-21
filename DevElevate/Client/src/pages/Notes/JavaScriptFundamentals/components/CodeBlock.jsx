import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { Copy, Check } from 'lucide-react';

const CodeBlock = ({ code }) => {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(code).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <div className="my-4 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="relative">
                <button
                    onClick={copyToClipboard}
                    className="absolute right-2 top-2 z-10 flex items-center gap-1 rounded-md bg-gray-800/80 px-2 py-1 text-xs text-gray-200 transition-colors hover:bg-gray-700/90"
                    title="Copy to clipboard"
                >
                    {copied ? (
                        <>
                            <Check size={14} />
                            <span>Copied!</span>
                        </>
                    ) : (
                        <>
                            <Copy size={14} />
                            <span>Copy</span>
                        </>
                    )}
                </button>
                <div className="overflow-x-auto text-sm sm:text-base">
                    <SyntaxHighlighter
                        language="javascript"
                        style={vscDarkPlus}
                        customStyle={{
                            margin: 0,
                            padding: '1.25rem',
                            background: '#1e1e1e',
                            fontSize: '0.875rem',
                            lineHeight: '1.5',
                            borderTopLeftRadius: '0.375rem',
                            borderTopRightRadius: '0.375rem',
                        }}
                        wrapLines={true}
                        wrapLongLines={true}
                        codeTagProps={{
                            style: {
                                fontFamily: 'Fira Code, monospace',
                                wordBreak: 'break-word',
                                whiteSpace: 'pre-wrap',
                            },
                        }}
                        lineProps={{
                            style: {
                                wordBreak: 'break-word',
                                whiteSpace: 'pre-wrap',
                            },
                        }}
                    >
                        {code}
                    </SyntaxHighlighter>
                </div>
            </div>
        </div>
    );
};

export default CodeBlock;
