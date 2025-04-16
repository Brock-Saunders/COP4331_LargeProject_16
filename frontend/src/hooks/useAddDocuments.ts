import { useState, useEffect } from "react";
const api_url = `https://largeproj.alexcanapp.xyz/api/documents?userId=`

export interface DocumentData {
    _id: string;
    userId: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
}

interface AddDocumentResponse {
    documentId: string,
    error: string;
}

interface UseAddDocumentResult {
    addDocument: (title: string, content: string) => Promise<string | null>;
    loading: boolean;
    error: string;
}

const useAddDocuments = (userId: string): UseAddDocumentResult => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");


    const addDocument = async (title: string, content: string): Promise<string | null> => {
        // add the document using the api endpoint 
        if (!userId) {
            setError("Missing userId parameter");
            return null;
        } else if (!title) {
            setError("Missing title parameter");
        }

        setLoading(true);
        setError("");

        try {
            const response = await fetch(`${api_url}${encodeURIComponent(userId)}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, title, content }),
            });

            const data: AddDocumentResponse = await response.json();

            if (data.error) {
                setError(data.error);
                return null;
            } else {
                return data.documentId;
            }
        } catch (err: any) {
            setError(err.message || "Unknown Error");
            return null;
        } finally {
            setLoading(false);
        }
    };
    return { addDocument, loading, error };
}

export default useAddDocuments; 