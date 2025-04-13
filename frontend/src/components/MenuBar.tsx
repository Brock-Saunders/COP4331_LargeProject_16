import React from 'react';
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  Eraser,
  Pilcrow,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Minus,
  Undo2,
  Redo2,
  type LucideIcon
} from "lucide-react";

interface MenuBarProps {
  editor: any;
}

type MenuAction = {
  icon: LucideIcon;
  run: () => void;
  isActive?: () => boolean;
  isDisabled?: () => boolean;
};

const MenuBar: React.FC<MenuBarProps> = ({ editor }) => {
  if (!editor) return null;

  const actions: MenuAction[] = [
    {
      icon: Bold,
      run: () => editor.chain().focus().toggleBold().run(),
      isActive: () => editor.isActive('bold'),
      isDisabled: () => !editor.can().chain().focus().toggleBold().run(),
    },
    {
      icon: Italic,
      run: () => editor.chain().focus().toggleItalic().run(),
      isActive: () => editor.isActive('italic'),
      isDisabled: () => !editor.can().chain().focus().toggleItalic().run(),
    },
    {
      icon: Strikethrough,
      run: () => editor.chain().focus().toggleStrike().run(),
      isActive: () => editor.isActive('strike'),
      isDisabled: () => !editor.can().chain().focus().toggleStrike().run(),
    },
    {
      icon: Eraser,
      run: () => editor.chain().focus().unsetAllMarks().run(),
    },
    {
      icon: Pilcrow,
      run: () => editor.chain().focus().setParagraph().run(),
      isActive: () => editor.isActive('paragraph'),
    },
    {
      icon: Heading1,
      run: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: () => editor.isActive('heading', { level: 1 }),
    },
    {
      icon: Heading2,
      run: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: () => editor.isActive('heading', { level: 2 }),
    },
    {
      icon: Heading3,
      run: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: () => editor.isActive('heading', { level: 3 }),
    },
    {
      icon: List,
      run: () => editor.chain().focus().toggleBulletList().run(),
      isActive: () => editor.isActive('bulletList'),
    },
    {
      icon: ListOrdered,
      run: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: () => editor.isActive('orderedList'),
    },
    {
      icon: Minus,
      run: () => editor.chain().focus().setHorizontalRule().run(),
    },
    {
      icon: Undo2,
      run: () => editor.chain().focus().undo().run(),
      isDisabled: () => !editor.can().chain().focus().undo().run(),
    },
    {
      icon: Redo2,
      run: () => editor.chain().focus().redo().run(),
      isDisabled: () => !editor.can().chain().focus().redo().run(),
    },
  ];

  return (
    <div className="fixedborder rounded-md p-1 mb-1 bg-dark-gray-50 space-x-2 z-50">
      <div className="button-group flex flex-wrap gap-1">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={index}
              onClick={action.run}
              disabled={action.isDisabled?.()}
              className={action.isActive?.() ? 'is-active' : ''}
            >
              <Icon className="size-4" />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MenuBar;
