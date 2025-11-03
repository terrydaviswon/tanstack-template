import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import rehypeHighlight from 'rehype-highlight'
import type { Message } from '../utils/ai'

interface ChatMessageProps {
  message: Message
  isStreaming?: boolean
}

export const ChatMessage = ({ message, isStreaming = false }: ChatMessageProps) => (
  <div
    className={`py-4 md:py-6 streaming-message ${
      message.role === 'assistant'
        ? 'bg-gradient-to-r from-orange-500/5 to-red-600/5'
        : 'bg-transparent'
    }`}
  >
    <div className="flex items-start w-full max-w-3xl gap-3 md:gap-4 mx-auto px-2 md:px-0">
      {message.role === 'assistant' ? (
        <div className="flex items-center justify-center flex-shrink-0 w-7 h-7 md:w-8 md:h-8 text-xs md:text-sm font-medium text-white rounded-lg bg-gradient-to-r from-orange-500 to-red-600">
          AI
        </div>
      ) : (
        <div className="flex items-center justify-center flex-shrink-0 w-7 h-7 md:w-8 md:h-8 text-xs md:text-sm font-medium text-white bg-gray-700 rounded-lg">
          U
        </div>
      )}
      <div className={`flex-1 min-w-0 ${isStreaming ? 'streaming-cursor' : ''}`}>
        <ReactMarkdown
          className="prose dark:prose-invert max-w-none text-sm md:text-base"
          rehypePlugins={[
            rehypeRaw,
            rehypeSanitize,
            rehypeHighlight,
          ]}
        >
          {message.content}
        </ReactMarkdown>
      </div>
    </div>
  </div>
); 