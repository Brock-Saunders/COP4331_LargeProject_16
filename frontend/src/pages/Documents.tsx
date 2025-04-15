import React, { useState, useEffect } from 'react';
import FileSideBar from '../components/FileSideBar';
import TextEditor from '../components/TextEditor';
import MenuBar from '../components/MenuBar';
import HeaderEditor from '../components/HeaderEditor';
import EditorNavbar from '../components/EditorNavbar';
import EditorFooter from '../components/EditorFooter';
import useDocuments, { DocumentData } from '../hooks/useDocuments';
import { title } from 'process';

const userId = "67fc0882d6f7058768d3a2d7";

const Documents: React.FC = () => {
    const { documents, error, loading, refetch } = useDocuments(userId); 
    const [mainEditor, setMainEditor] = useState<any>(null); 
    const [currFileId, setCurrFileId] = useState<string>("");

    // Update currFileId when documents are fetched and non-empty.
    useEffect(() => {
        if (documents.length > 0 && !documents.find(doc => doc._id === currFileId)) {
            setCurrFileId(documents[0]._id);
        }
    }, [documents, currFileId]);

    const currFile = documents.find((doc: DocumentData) => doc._id === currFileId); 

    // TODO: replace this with login hook 

    // TODO: update title to actual db 
    const updateFileTitle = (newTitle: string) => {
      const updatedDocs = documents.map((doc: DocumentData) =>
        doc._id === currFileId
          ? { ...doc, title: newTitle, updatedAt: new Date().toISOString() }
          : doc
      );
      console.log("Update file title:", updatedDocs); 
    }

    // TODO: update content to acutal db 
    const updateFileContent = (newContent: string) => {
      const updatedDocs = documents.map((doc: DocumentData) =>
        doc._id === currFileId
          ? { ...doc, content: newContent, updatedAt: new Date().toISOString() }
          : doc
      );
      console.log("Updated file content:", updatedDocs);
    }
  
    // TODO: create new file to db 
    const addNewFile = () => {
        refetch(); 
    }
    
    const downloadFile = (file: DocumentData) => {
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
              files={documents}
              currentFileId={currFileId}
              onSelectFile={setCurrFileId}
              onAddnewFile={addNewFile}
            />
          </aside>  
          <div className="flex-1 bg-zinc-900 border border-gray-500 rounded-md p-4 overflow-hidden min-h-0">
            {loading && <p className="text-white">Loading...</p>}
            {error && <p className="text-red-400">{error}</p>}
            {currFile && (
              <div className="flex flex-col h-full">
                <div className="sticky top-0 bg-zinc-900 z-10">
                  <HeaderEditor
                    title={currFile.title}
                    setTitle={updateFileTitle}
                    onEnter={handleHeaderEnter}
                  />
                </div>
                <div className="flex-1 overflow-auto">
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
