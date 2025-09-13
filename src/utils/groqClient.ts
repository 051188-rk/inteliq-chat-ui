export async function sendChatMessage(messages: Array<{role: string; content: string}>): Promise<string> {
    try {
      const apiKey = import.meta.env.VITE_GROQ_API_KEY;
      
      if (!apiKey) {
        console.warn('Groq API key not found, using placeholder response');
        return "I'm a placeholder response since the API key is not configured. Please add your GROQ_API_KEY to the .env file.";
      }
  
      const { Groq } = await import('groq-sdk');
      const groq = new Groq({ 
        apiKey,
        dangerouslyAllowBrowser: true 
      });
  
      const chatCompletion = await groq.chat.completions.create({
        model: 'openai/gpt-oss-20b',
        messages: [
            {
              "role": "user",
              "content": ""
            }
          ],
        temperature: 1,
        max_tokens: 8192,
        top_p: 1,
        stream: true
      });
  
      let result = '';
      for await (const chunk of chatCompletion) {
        result += chunk.choices[0]?.delta?.content || '';
      }
      
      return result || "I received your message but couldn't generate a response.";
    } catch (error) {
      console.error('Error calling Groq API:', error);
      return "Sorry, I encountered an error while processing your request.";
    }
  }
  