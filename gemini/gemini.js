const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});


async function evaluateMockInterview(textQuestion, textResponse) {
    const prompt = `This is a mock interview scenario for practicing non-technical questions. The candidate is asked the question:
  
  ${textQuestion}
  
  The candidate responds with:
  
  ${textResponse}

  Ignore the Spelling Errors because this response is converted from audio to text
  
  Please analyze the candidate's response and provide the following feedback:
  
  * Score (0-5): Rate the overall effectiveness of the response based on clarity, relevance, and persuasiveness.
  * Review: Identify up to 3 key areas for improvement, with specific suggestions for addressing them (presented as an array of objects with "mistake" and "solution" properties).
  * Best Answer: provide an example of a stronger response that demonstrates best practices in easy languge.
  
  **Note:** Consider the following criteria when evaluating the response:
    * Relevance to the question
    * Clarity and conciseness
    * Demonstration of skills and experience
    * Enthusiasm and interest in the position
    * Alignment with the job description
    
  
    Your respponse should be an json object so that i can easyly store this in an varible that contains key 3 "score","review" and "bestAnswer". in score just store the number. in Review Store the Array of Object in each object it will contain the mistakekey and feedback and in bestAnswer just a String that contains the best ans. and genrate your response accordingly so you can return me an object that i mention
  
  
  `;
  
    const result = await model.generateContent(prompt);
    const response = await result.response;
    // console.log(response);
    const text = response.text();
    console.log(text);
    const newtext = text.slice(7,-5);
    return JSON.parse(newtext);
  }
  


  module.exports  = {evaluateMockInterview};