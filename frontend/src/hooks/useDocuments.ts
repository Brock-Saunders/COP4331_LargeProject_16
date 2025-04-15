import { useState, useEffect } from "react";

export interface DocumentData {
  _id: string;
  userId: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface UseDocumentsResult {
  documents: DocumentData[];
  error: string;
  loading: boolean;
  refetch: () => void;
}

const useDocuments = (userId: string): UseDocumentsResult => {
  const [documents, setDocuments] = useState<DocumentData[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const fetchDocuments = async () => {
    if (!userId) {
      setError("Missing userId parameter");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `http://localhost:5080/api/documents?userId=${encodeURIComponent(userId)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (data.error) {
        setError(data.error);
        setDocuments([]);
      } else {
        setDocuments(data.documents);
      }
    } catch (err: any) {
      setError(err.message || "Unknown error");
      setDocuments([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDocuments();
  }, [userId]);

  return { documents, error, loading, refetch: fetchDocuments };
};

export default useDocuments;
