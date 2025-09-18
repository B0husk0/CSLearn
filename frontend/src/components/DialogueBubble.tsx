import React from 'react';

interface Character {
  name: string;
  avatar: string;
  role: string;
}

interface DialogueBubbleProps {
  character: Character;
  position: 'left' | 'right';
  content: string;
}

const DialogueBubble: React.FC<DialogueBubbleProps> = ({ character, position, content }) => {
  const isBlackBubble = position === 'right';

  return (
    <div className={`flex items-start ${isBlackBubble ? 'flex-row' : 'flex-row-reverse'}`}>
      <div className="flex-shrink-0">
        <div className="relative">
          <img
            src={character.avatar}
            alt={character.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
          />
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-3 py-1 rounded-full whitespace-nowrap">
            {character.name}
          </div>
        </div>
      </div>
      <div
        className={`relative max-w-2xl mx-6 p-8 rounded-lg ${
          isBlackBubble ? 'bg-black text-white' : 'bg-white border border-gray-200'
        }`}
      >
        <div
          className={`absolute top-6 ${
            isBlackBubble ? 'right-full' : 'left-full'
          } transform ${
            isBlackBubble ? 'translate-x-1/2' : '-translate-x-1/2'
          } rotate-45 w-4 h-4 ${
            isBlackBubble ? 'bg-black' : 'bg-white border-r border-t border-gray-200'
          }`}
        />
        <p className="text-xl leading-relaxed mb-3">{content}</p>
        <div className={`text-sm ${isBlackBubble ? 'text-gray-300' : 'text-gray-500'}`}>
          {character.role}
        </div>
      </div>
    </div>
  );
};

export default DialogueBubble;