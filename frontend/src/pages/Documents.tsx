import React, { useState } from 'react';
import FileSideBar from '../components/FileSideBar';
import TextEditor from '../components/TextEditor';
import MenuBar from '../components/MenuBar';
import HeaderEditor from '../components/HeaderEditor';
import EditorNavbar from '../components/EditorNavbar';
import EditorFooter from '../components/EditorFooter';
import { title } from 'process';
interface File {
    _id: string, 
    userId: string, 
    title: string, 
    content: string, 
    createdAt: string, 
    updatedAt: string 
}

// TODO: use hook to connect to db and replace this 
const initialFiles: File[] = [
    {
      _id: '67fc08f4d6f7058768d3a2da',
      userId: '67fc0882d6f7058768d3a2d7',
      title: 'Test_doc_3',
      content: 'This is the content of the third document.',
      createdAt: '2025-04-13T12:20:00.000+00:00',
      updatedAt: '2025-04-13T12:20:00.000+00:00',
    },
    {
      _id: '67fc08f4d6f7058768d3a2db',
      userId: '67fc0882d6f7058768d3a2d7',
      title: 'Test_doc_4',
      content: 'This is the content of the fourth document.',
      createdAt: '2025-04-13T12:30:00.000+00:00',
      updatedAt: '2025-04-13T12:30:00.000+00:00',
    },
    {
      _id: '67fc08f4d6f7058768d3a2dc',
      userId: '67fc0882d6f7058768d3a2d7',
      title: 'Test_doc_5',
      content: 'This is the content of the fifth document.',
      createdAt: '2025-04-13T12:40:00.000+00:00',
      updatedAt: '2025-04-13T12:40:00.000+00:00',
    },
    {
      _id: '67fc08f4d6f7058768d3a2dd',
      userId: '67fc0882d6f7058768d3a2d7',
      title: 'Test_doc_6',
      content: 'This is the content of the sixth document.',
      createdAt: '2025-04-13T12:50:00.000+00:00',
      updatedAt: '2025-04-13T12:50:00.000+00:00',
    },
    {
      _id: '67fc08f4d6f7058768d3a2de',
      userId: '67fc0882d6f7058768d3a2d7',
      title: 'Test_doc_7',
      content: 'This is the content of the seventh document.',
      createdAt: '2025-04-13T13:00:00.000+00:00',
      updatedAt: '2025-04-13T13:00:00.000+00:00',
    },
    {
      _id: '67fc08f4d6f7058768d3a2df',
      userId: '67fc0882d6f7058768d3a2d7',
      title: 'Test_doc_8',
      content: 'This is the content of the eighth document.',
      createdAt: '2025-04-13T13:10:00.000+00:00',
      updatedAt: '2025-04-13T13:10:00.000+00:00',
    },
    {
      _id: '67fc08f4d6f7058768d3a2e0',
      userId: '67fc0882d6f7058768d3a2d7',
      title: 'Test_doc_9',
      content: 'This is the content of the ninth document.',
      createdAt: '2025-04-13T13:20:00.000+00:00',
      updatedAt: '2025-04-13T13:20:00.000+00:00',
    },
    {
      _id: '67fc08f4d6f7058768d3a2e1',
      userId: '67fc0882d6f7058768d3a2d7',
      title: 'Test_doc_10_dkljfajfkldsfjs;kdfjsdkla;fjsdak;lfjsdk;lfjsd;lfjsd;kf',
      content: 'This is the content of the tenth document.',
      createdAt: '2025-04-13T13:30:00.000+00:00',
      updatedAt: '2025-04-13T13:30:00.000+00:00',
    },
    {
      _id: '67fc08f4d6f7058768d3a2e2',
      userId: '67fc0882d6f7058768d3a2d7',
      title: 'Test_doc_11',
      content: 'This is the content of the eleventh document.',
      createdAt: '2025-04-13T13:40:00.000+00:00',
      updatedAt: '2025-04-13T13:40:00.000+00:00',
    },
    {
      _id: '67fc08f4d6f7058768d3a2e3',
      userId: '67fc0882d6f7058768d3a2d7',
      title: 'Test_doc_12',
      content: 'This is the content of the twelfth document.',
      createdAt: '2025-04-13T13:50:00.000+00:00',
      updatedAt: '2025-04-13T13:50:00.000+00:00',
    },
    {
      _id: '67fc08f4d6f7058768d3a2e4',
      userId: '67fc0882d6f7058768d3a2d7',
      title: 'Test_doc_13',
      content: 'This is the content of the thirteenth document.',
      createdAt: '2025-04-13T14:00:00.000+00:00',
      updatedAt: '2025-04-13T14:00:00.000+00:00',
    },
    {
      _id: '67fc08f4d6f7058768d3a2e5',
      userId: '67fc0882d6f7058768d3a2d7',
      title: 'Test_doc_14',
      content: 'This is the content of the fourteenth document.',
      createdAt: '2025-04-13T14:10:00.000+00:00',
      updatedAt: '2025-04-13T14:10:00.000+00:00',
    },
    {
      _id: '67fc08f4d6f7058768d3a2e6',
      userId: '67fc0882d6f7058768d3a2d7',
      title: 'Test_doc_15',
      content: 'This is the content of the fifteenth document.',
      createdAt: '2025-04-13T14:20:00.000+00:00',
      updatedAt: '2025-04-13T14:20:00.000+00:00',
    },
    {
      _id: '67fc08f4d6f7058768d3a2e7',
      userId: '67fc0882d6f7058768d3a2d7',
      title: 'Test_doc_16',
      content: 'This is the content of the sixteenth document.',
      createdAt: '2025-04-13T14:30:00.000+00:00',
      updatedAt: '2025-04-13T14:30:00.000+00:00',
    },
    {
      _id: '67fc08f4d6f7058768d3a2e8',
      userId: '67fc0882d6f7058768d3a2d7',
      title: 'Test_doc_17',
      content: 'This is the content of the seventeenth document.',
      createdAt: '2025-04-13T14:40:00.000+00:00',
      updatedAt: '2025-04-13T14:40:00.000+00:00',
    },
    {
      _id: '67fc08f4d6f7058768d3a2e9',
      userId: '67fc0882d6f7058768d3a2d7',
      title: 'Test_doc_18',
      content: 'This is the content of the eighteenth document.',
      createdAt: '2025-04-13T14:50:00.000+00:00',
      updatedAt: '2025-04-13T14:50:00.000+00:00',
    },
    {
      _id: '67fc08f4d6f7058768d3a2ea',
      userId: '67fc0882d6f7058768d3a2d7',
      title: 'Test_doc_19',
      content: 'This is the content of the nineteenth document.',
      createdAt: '2025-04-13T15:00:00.000+00:00',
      updatedAt: '2025-04-13T15:00:00.000+00:00',
    },
    {
      _id: '67fc08f4d6f7058768d3a2eb',
      userId: '67fc0882d6f7058768d3a2d7',
      title: 'Test_doc_20',
      content: 'This is the content of the twentieth document.',
      createdAt: '2025-04-13T15:10:00.000+00:00',
      updatedAt: '2025-04-13T15:10:00.000+00:00',
    },
  ];

const Documents: React.FC = () => {
    const [files, setFiles] = useState<File[]>(initialFiles); 
    const [currFileId, setCurrFileId] = useState<string>(files[0]._id); 
    const currFile = files.find((file) => file._id === currFileId); 
    const [mainEditor, setMainEditor] = useState<any>(null); 

    const updateFileTitle = (newTitle: string) => {
      setFiles(files.map((file) => 
          file._id === currFileId? {...file, title: newTitle, updatedAt: new Date().toISOString() } : file
        ));
    }

    const updateFileContent = (newContent: string) => {
        setFiles(files.map(file => 
            file._id === currFileId ? { ...file, content: newContent, updatedAt: new Date().toISOString() } : file
        ));
    }
  
    const addNewFile = () => {
        const newFile: File = {
            _id: Date.now().toString(),
            userId: '67fc08f4d6f7058768d3a2d9',
            title: `New_File_$(files.length)`,
            content: '<h1>Your New File!!! <h1>',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }
        setFiles([...files, newFile]);
        setCurrFileId(newFile._id);
        return;
    }
    
    const downloadFile = (file: File) => {
        const element = document.createElement('a');
        const fileBlob = new Blob([file.content], { type: 'text/html' });
        element.href = URL.createObjectURL(fileBlob);
        element.download = `${file.title}.html`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }
    
    const handleEditorReady = (editor: any) => {
        setMainEditor(editor); 
    }
    
    const handleHeaderEnter = () => {
        if (mainEditor) {
            mainEditor.commands.focus('end');
        }
    }
    
    return (
      <div className="h-screen flex flex-col overflow-hidden">
        <div className='sticky top-0 border z-[999] border-gray-500 rounded-md overflow-hidden'>
          <EditorNavbar />
          <MenuBar editor={mainEditor} />
        </div>
        <div className="h-190 flex flex-1 border-gray-500 rounded-md overflow-hidden p-3">
          <aside className="w-full md:w-1/4 border-r border-b rounded-md border-gray-500 overflow-hidden h-full">
            <FileSideBar
              files={files}
              currentFileId={currFileId}
              onSelectFile={setCurrFileId}
              onAddnewFile={addNewFile}
            />
          </aside>  
          <div className="flex-1 bg-zinc-900 border border border-gray-500 rounded-md p-4 overflow-hidden">
            {currFile && (
              <div>
                <div className="sticky top-0 bg-zinc-900 z-10">
                  <HeaderEditor
                    title={currFile.title}
                    setTitle={updateFileTitle}
                    onEnter={handleHeaderEnter}
                  />
                </div>
                <div>
                  <TextEditor
                    content={currFile.content}
                    setContent={updateFileContent}
                    onEditorReady={handleEditorReady}
                  />
                </div>
              </div>
            )}
          </div>

          
        </div>
        <div className="sticky bottom-0 z-50">
          <EditorFooter />
        </div>

      </div>
    );
    
}

export default Documents; 