// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import openai from '@/utils/openai';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const prompt = req.query.prompt;

  if (!prompt) {
    return res.status(400).json({error: "Prompt missing"})
  }

  if (prompt.length > 100) {
    return res.status(400).json({error: "Prompt too long"})
  }

  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Briefly answer the following question about UCLA: ${prompt} \n
    Answer: `,
    max_tokens: 500,
    temperature: 0.1,
    presence_penalty: 0,
    frequency_penalty: 0,
  });
  console.log("Completion: ", completion);
  const answerText = completion.data.choices[0].text;
  res.status(200).json({answerText})
  //receieve some user data, ask ChatGPT to generate something and return to the user

}
