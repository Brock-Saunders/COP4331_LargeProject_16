import type { Preview } from '@storybook/react'
import '../src/index.css'
import './preview.css'
import '../src/styles/LoginStyles.css';
import '../src/styles/Navbar.css'
import '../src/styles/FileSideBar.css'
import '../src/styles/editor.css'
import '../src/styles/RegisterStyles.css'


const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
};

export default preview;