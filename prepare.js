import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

export async function indexTheDocument(filePath) {
    // Load the document
    const loader = new PDFLoader(filePath);
    //docs will be an array of documents(pages)
    const docs = await loader.load();
    console.log('Document loaded:', docs);
}