import OpenAI from "openai";
import { NewsData } from "./types";

const instructions = `You are an AI tasked with generating a daily summary of the most important global events in the style of video game patch notes. Organize the information into three categories: New Features, Balance Changes, and Bug Fixes.
Each category should follow this structure:
New Features
Highlight major new developments, policies, discoveries, or societal changes as if they were newly introduced game mechanics.
Balance Changes
Describe significant geopolitical, economic, or environmental shifts as balance adjustments. Include policy changes, major legal rulings, and economic shifts that affect populations.
Bug Fixes
Summarize unexpected or unfortunate events, controversies, or improvements to existing problems using a 'bug fix' analogy. This can include corrections to past mistakes, resolved conflicts, or notable failures.
Maintain a concise, slightly playful but informative tone, similar to patch notes for a major online game. Write 5-8 patch notes for each section.`;

export let fetchPatchNotes = async (
	newsData: Array<NewsData>
): Promise<string> => {
	const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
	const newsJSON = require("../data.json");
	const response = await client.responses.create({
		model: "gpt-4o",
		instructions: instructions,
		input: JSON.stringify(newsJSON),
	});
	return response.output_text;
};
