import { Extension } from '@tiptap/core'; 
import { Heading as BaseHeading } from '@tiptap/extension-heading'; 

const CustomHeading = BaseHeading.configure({
    levels: [1, 2, 3, 4, 5]                         // h1, h2 ... 
});

export default CustomHeading; 