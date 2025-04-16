import { useState } from "react";

const api_url = `https://largeproj.alexcanapp.xyz/api/documents/update`;

interface UpdateDocumentResponse {
    error: string;
}

interface UseUpdateDocumentResult {
    updateDocument: (documentId: string, title: string, content: string) => Promise<boolean>;
    loading: boolean;
    error: string;
}

const useUpdateDocuments = (userId: string): UseUpdateDocumentResult => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const updateDocument = async (
        documentId: string,
        title: string,
        content: string
    ): Promise<boolean> => {

        if (!userId) {
            setError("Missing userId parameter");
            return false;
        }

        if (!documentId) {
            setError("Missing documentId parameter");
            return false;
        }

        setLoading(true);
        setError("");

        try {
            const response = await fetch(api_url, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, documentId, title, content })
            });

            const data: UpdateDocumentResponse = await response.json();

            if (data.error) {
                setError(data.error);
                return false;
            }

            return true;
        } catch (err: any) {
            setError(err.message || "Unknown Error");
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { updateDocument, loading, error };
};

export default useUpdateDocuments;
