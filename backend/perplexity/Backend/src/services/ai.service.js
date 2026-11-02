import { ChatGoogle } from "@langchain/google/node";

const model = new ChatGoogle({
  model: "gemini-3.7-flash",
  apiKey: process.env.GEMINI_API_KEY
});


export async function testAI(){
    model.invoke("what is the capital of India and why?").then((response) => {
        console.log("AI Response:", response.text);
    });
}