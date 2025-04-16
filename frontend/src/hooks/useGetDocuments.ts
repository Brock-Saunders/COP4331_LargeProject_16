import { useState, useEffect } from "react";
const api_url = `http://localhost:5080/api/documents?userId=`

export interface DocumentData {
  _id: string;
  userId: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface useGetDocumentsResult {
  documents: DocumentData[];
  error: string;
  loading: boolean;
  refetch: () => void;
}

const useGetDocuments = (userId: string): useGetDocumentsResult => {
  const [documents, setDocuments] = useState<DocumentData[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // fetch all the documents for a user 
  const fetchDocuments = async () => {
    if (!userId) {
      setError("Missing userId parameter");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${api_url}${encodeURIComponent(userId)}`,
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

export default useGetDocuments;
