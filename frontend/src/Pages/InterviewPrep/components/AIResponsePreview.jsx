import React, { useState } from "react";
import { LuCopy, LuCheck, LuCode } from "react-icons/lu";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

const AIResponsePreview = ({ content }) => {
  if (!content) return null;

  return (
    <div className="mx-auto max-w-full">
      <div className="prose prose-slate dark:prose-invert max-w-none text-[14px]">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ className, children }) {
              const match = /language-(\w+)/.exec(className || "");
              const language = match?.[1];

              if (!language) {
                return (
                  <code className="px-1 py-0.5 bg-gray-100 rounded text-sm">
                    {children}
                  </code>
                );
              }

              return (
                <CodeBlock
                  code={String(children).replace(/\n$/, "")}
                  language={language}
                />
              );
            },

            p({ children }) {
              return <p className="mb-4 leading-6">{children}</p>;
            },

            ul({ children }) {
              return (
                <ul className="list-disc pl-6 space-y-2 my-4">{children}</ul>
              );
            },

            ol({ children }) {
              return (
                <ol className="list-decimal pl-6 space-y-2 my-4">{children}</ol>
              );
            },

            li({ children }) {
              return <li>{children}</li>;
            },

            h1({ children }) {
              return <h1 className="text-2xl font-bold my-4">{children}</h1>;
            },

            h2({ children }) {
              return <h2 className="text-xl font-bold my-4">{children}</h2>;
            },

            h3({ children }) {
              return <h3 className="text-lg font-bold my-3">{children}</h3>;
            },

            blockquote({ children }) {
              return (
                <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4">
                  {children}
                </blockquote>
              );
            },

            table({ children }) {
              return (
                <div className="overflow-x-auto my-6">
                  <table className="min-w-full border border-gray-200">
                    {children}
                  </table>
                </div>
              );
            },

            th({ children }) {
              return (
                <th className="px-3 py-2 text-left text-xs font-semibold bg-gray-100">
                  {children}
                </th>
              );
            },

            td({ children }) {
              return <td className="px-3 py-2 text-sm">{children}</td>;
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

function CodeBlock({ code, language }) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="not-prose my-8 rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <LuCode size={14} className="text-gray-500" />
          <span className="text-xs font-semibold uppercase text-gray-600">
            {language}
          </span>
        </div>

        <button
          onClick={copyCode}
          className="text-gray-500 hover:text-gray-800"
        >
          {copied ? (
            <LuCheck size={16} className="text-green-600" />
          ) : (
            <LuCopy size={16} />
          )}
        </button>
      </div>

      {/* Code */}
      <SyntaxHighlighter
        language={language}
        style={oneLight}
        customStyle={{
          margin: 0,
          padding: "1rem",
          fontSize: 13,
          background: "transparent",
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}

export default AIResponsePreview;
