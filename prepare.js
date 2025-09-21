import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { CharacterTextSplitter } from "@langchain/textsplitters";

export async function indexTheDocument(filePath) {
  // Load the document
  const loader = new PDFLoader(filePath, { splitPages: false });
  //docs will be an array of documents(pages)
  const doc = await loader.load();

  const textSplitter = new CharacterTextSplitter({
    chunkSize: 500, //size of chunk
    chunkOverlap: 100, // overlap atmost 100 characters between each chunks
  });
  const texts = await textSplitter.splitText(doc[0].pageContent);
  console.log(texts.length);
}
