import Groq from "groq-sdk";
import readline from "readline/promises";
import dotenv from "dotenv"
import { vectorStore } from "./prepare.js";
dotenv.config();

const groq = new Groq();


export async function chat() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    while (true) {
        const question = await rl.question("You:  ");

        if (question == '/bye') {
            break;
        }

        //retrieval step to get relevant context from vector db (similirity search)
        const relevantChunks = await vectorStore.similaritySearch(question, 3) //top 3 relevant chunks
        //concainating all the relevant chunk data into single string
        const context = relevantChunks.map(chunk => chunk.pageContent).join("\n\n");
        //console.log("Context: ", context);
        
        const SYSTEM_PROMPT = `You are an assistant for question-answering tasks. Use the following relevant pieces of retrieved context to answer the question. If you don't know the answer, say I don't know.`;
        const userQuery = `Question: ${question}
        Relevant context: ${context}
        Answer:`;

        const completion = await groq.chat.completions.create({
            model: "groq/compound",
            messages: [
                {
                    role: 'system',
                    content: SYSTEM_PROMPT,
                },
                {
                    role: 'user',
                    content: userQuery,
                },
            ],
        });
        console.log(`Assistant: ${completion.choices[0].message.content}`);
    }
    rl.close();

}

chat();