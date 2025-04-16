import { useState } from "react";

const api_url = `https://largeproj.alexcanapp.xyz/api/documents/delete`;

interface DeleteDocumentResponse {
    error: string;
}

interface UseDeleteDocumentResult {
    deleteDocument: (documentId: string) => Promise<boolean>;
    loading: boolean;
    error: string;
}

const useDeleteDocuments = (userId: string): UseDeleteDocumentResult => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const deleteDocument = async (documentId: string): Promise<boolean> => {
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
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, documentId }),
            });

            const data: DeleteDocumentResponse = await response.json();

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

    return { deleteDocument, loading, error };
};

export default useDeleteDocuments;