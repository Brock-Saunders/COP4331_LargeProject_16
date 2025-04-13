
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import StarterKit from '@tiptap/starter-kit'
import Heading from "@tiptap/extension-heading"; 
import Paragraph from "@tiptap/extension-paragraph"; 
import OrderedList from "@tiptap/extension-text"; 

const CustomExtensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  StarterKit
]

export default CustomExtensions; 