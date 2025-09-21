import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

export async function indexTheDocument(filePath) {
    // Load the document
    const loader = new PDFLoader(filePath, {splitPages: false});
    //docs will be an array of documents(pages)
    const doc = await loader.load();
    console.log('Document loaded:', doc);
}