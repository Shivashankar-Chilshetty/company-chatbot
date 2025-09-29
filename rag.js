/**
 * Implementation plan
 * Stage 1: Indexing - 
 * 1. Load the document - pdf, text - completed
 * 2. Chunk the document - completed
 * 3. Generate vector embeddings - completed

 *
 * Stage 2: Using the chatbot
 * 1. Setup LLM  - completed
 * 2. Add retrieval step - completed
 * 3. Pass input + relevant information to LLM - completed

 */

import { indexTheDocument } from './prepare.js';

const filePath = './cg-internal-docs.pdf';
indexTheDocument(filePath);