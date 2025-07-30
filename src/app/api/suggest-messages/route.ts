// import { openai } from '@ai-sdk/openai';
// import { streamText, UIMessage } from 'ai';
// import OpenAi from 'openai';

// Allow streaming responses up to 30 seconds
// export const maxDuration = 30;

// export async function POST(req: Request) {
//   try {
//     const { messages }: { messages: UIMessage[] } = await req.json();
//     const prompt  = "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What's a hobby you've recently started? || If you could have dinner with any historical figure, who would it be?|| What's a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment"
  
//     const result = streamText({
//       model: openai('gpt-4o'),
//       prompt: prompt,
//     });
  
//     return result.toUIMessageStreamResponse();
//   } catch (error) {
//     if(error instanceof Error){
//         const {name, message} = error;
//         return Response.json({
//             name,  
//             success : false,
//             message : message,
//         },{
//             status : 500
//         })
//     }else{
//         console.error("Error occured",error);
//         throw error;
//     }
//   }
// }


import { GoogleGenAI } from "@google/genai";

export async function POST(request : Request){
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMENI_API_KEY! });
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What's a hobby you've recently started? || If you could have dinner with any historical figure, who would it be?|| What's a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment",
    });
    if(!response.text){
      return Response.json({
        success : false,
        message : "Error while generating response"
      })
    }
    return Response.json({
      success : true,
      message : response.text
    })
  } catch (error) {
    console.error("Error while working with AI",error);
    return Response.json({
      success : false,
      message : "Error while working with AI"
    })
  }
}