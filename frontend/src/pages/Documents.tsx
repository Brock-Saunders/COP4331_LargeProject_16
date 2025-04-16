import React, { useState, useEffect } from 'react';
import FileSideBar from '../components/FileSideBar';
import TextEditor from '../components/TextEditor';
import MenuBar from '../components/MenuBar';
import HeaderEditor from '../components/HeaderEditor';
import EditorNavbar from '../components/EditorNavbar';
import EditorFooter from '../components/EditorFooter';
import useGetDocuments, { DocumentData } from '../hooks/useGetDocuments';
import useAddDocuments from '../hooks/useAddDocuments';
import useUpdateDocuments from '../hooks/useUpdateDocuments';
import { useNavigate } from 'react-router-dom';
import { title } from 'process';
import { json } from 'stream/consumers';

// TODO: redirect to login page when we cant get user id


const Documents: React.FC = () => {
  const userDataStr = localStorage.getItem("user_data"); 
  const navigate = useNavigate(); 
  let userId = null; 
  if (userDataStr) {
    const userData = JSON.parse(userDataStr); 
    userId = userData.userId; 
  }

  if(!userId) {
    navigate('/login'); 
  }

  const [title, setTitle] = useState("");
  const [content, setContent] = useState(""); 
  const { documents, error: getAllDocsError, loading: getAllDocsLoading, refetch: refetchGetAllDocs } = useGetDocuments(userId);
  const { addDocument, loading: addDocLoading, error: addDocError } = useAddDocuments(userId);
  const [mainEditor, setMainEditor] = useState<any>(null);
  const [currFileId, setCurrFileId] = useState<string>("");
  const { updateDocument, loading: updateLoading, error: updateError} = useUpdateDocuments(userId); 

  const currFile = documents.find((doc: DocumentData) => doc._id === currFileId);

  useEffect(() => {
    if (documents.length > 0 && !documents.find(doc => doc._id === currFileId)) {
      setCurrFileId(documents[0]._id);
    }

    if (currFile) {
      setTitle(currFile.title); 
      setContent(currFile.content)
    }

  }, [documents, currFileId, currFile]);

  const updateFileTitle = (newTitle: string) => {
    setTitle(newTitle); 
    console.log("Update file title:", newTitle);
  }

  const updateFileContent = (newContent: string) => {
    setContent(newContent); 
    console.log("Updated file content:", newContent);
  }

  // Handle adding a new file via the useAddDocuments hook.
  const handleAddFile = async () => {
    const newTitle = `New Document ${documents.length + 1}`;
    const newContent = "<p>Your New Document!!</p>";
    const newId = await addDocument(newTitle, newContent);
    if (newId) {
      console.log("Document created with id:", newId);
      // Refetch documents to update the list in the sidebar.
      refetchGetAllDocs();
    } else {
      console.error("Failed to create document", addDocError);
    }
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

  const handleSave = async () => {
    if (!currFile || !mainEditor) return;
  
    const newContent = mainEditor.getHTML();
  
    const success = await updateDocument(currFile._id, title, newContent);
  
    if (success) {
      console.log("Document successfully updated");
      setContent(newContent); 
      refetchGetAllDocs(); // optionally refresh file list
    } else {
      console.error("Error updating document:", updateError);
    }
  };
  
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <div className='sticky top-0 border z-[999] border-gray-500 rounded-md overflow-hidden'>
        <EditorNavbar 
          onSave={handleSave}
        />
        <MenuBar editor={mainEditor} />
      </div>
      <div className="h-190 flex flex-1 border-gray-500 rounded-md overflow-hidden p-3 min-h-0">
        <aside className="w-full md:w-1/4 border-r border-b rounded-md border-gray-500 h-full min-h-0">
          <FileSideBar
            files={documents}
            currentFileId={currFileId}
            onSelectFile={setCurrFileId}
            onAddnewFile={handleAddFile}  // Pass the handler function here
          />
        </aside>
        <div className="flex-1 bg-zinc-900 border border-gray-500 rounded-md p-4 overflow-hidden min-h-0">
          {getAllDocsLoading && <p className="text-white">Loading...</p>}
          {getAllDocsError && <p className="text-red-400">{getAllDocsError}</p>}
          {currFile && (
            <div className="flex flex-col h-full">
              <div className="sticky top-0 bg-zinc-900 z-10">
                <HeaderEditor
                  title={title}
                  setTitle={updateFileTitle}
                  onEnter={handleHeaderEnter}
                />
              </div>
              <div className="flex-1 overflow-auto">
                <TextEditor
                  content={content}
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
