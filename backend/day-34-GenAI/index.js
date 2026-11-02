import "dotenv/config";
import readline from "node:readline";
import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage, tool , createAgent} from "langchain";
import { TavilySearch } from "@langchain/tavily";
import { sendEmail } from "./mail.service.js";
import * as z from "zod"


const emailTool = tool(
  sendEmail,
  {
    name:"emailTool",
    description: "A tool for sending emails.",
    schema:z.object({
      to: z.string().describe("The recipient's email address."),
      html: z.string().describe("The HTML content of the email."),
      subject: z.string().describe("The subject of the email."),
    })
  }
)

const searchTool = new TavilySearch({
  maxResults: 5,
});

const model = new ChatMistralAI({
model: "open-mistral-nemo"
});

const fullAgent = createAgent({
  model,
  tools: [emailTool, searchTool],
});

const staticAgent = createAgent({
  model,
  tools: [emailTool], // Tavily is completely excluded here!
});

async function needsWebSearch(input) {
  const routerResponse = await model.invoke([
    new HumanMessage(`
    Analyze this user query: "${input}"

    Does answering this query require live internet search, real-time news, today's weather, stock prices, sports scores, or recently updated information?

    Respond with ONLY one word: YES or NO. Do not add punctuation or explanation.
    `),
  ]);

  // Safely handle string vs array block output from LangChain models
  let textOutput = "";
  if (typeof routerResponse.content === "string") {
    textOutput = routerResponse.content;
  } else if (Array.isArray(routerResponse.content)) {
    textOutput = routerResponse.content
      .map((block) => block.text || "")
      .join(" ");
  }

  const cleaned = textOutput.trim().toUpperCase();

  // Log router decision for debugging
  console.log(`\n[Router Check]: LLM output -> "${cleaned}"`);

  return cleaned.includes("YES");
}


const terminal = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


const messages = [];



while(true){
  const userInput = await new Promise((resolve) => {
    terminal.question("Message: ", (input) => {
      resolve(input);
    });
  });

  if (userInput.trim().toLowerCase() === "exit") {
    break;
  }

  messages.push(new HumanMessage(userInput));



  const isSearchNeeded = await needsWebSearch(userInput);
  
  let response;
  if (isSearchNeeded) {
    console.log("🔍 [Router]: Fresh internet data needed. Triggering Tavily...");
    response = await fullAgent.invoke({ messages });
  } else {
    console.log("⚡ [Router]: Static knowledge request. Bypassing Tavily...");
    response = await staticAgent.invoke({ messages });
  }

  messages.push(response.messages[response.messages.length - 1]);

  console.log(response.messages[response.messages.length - 1].content);
  // console.log(`\n[AI]\n${response.text}\n`);
}

terminal.close();