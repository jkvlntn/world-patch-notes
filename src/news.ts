import { NewsData } from "./types";

export let fetchNews = async (
	page: string
): Promise<[Array<NewsData>, string]> => {
	let url = "https://newsdata.io/api/1/latest?";
	const varsURL = "apikey=" + process.env.NEWS_API_KEY + "&prioritydomain=top";
	url += varsURL;
	if (page && page != "") {
		url += "&page=" + page;
	}

	let response = await fetch(url);
	if (!response.ok) {
		throw new Error("Failed to fetch from api");
	}
	let data = await response.json();
	const nextPage = data.nextPage || "";

	let newsList: Array<NewsData> = [];
	data.results.map((newsItem: NewsData) => {
		newsList.push({
			title: newsItem.title || "",
			description: newsItem.description || "",
		});
	});

	return [newsList, nextPage];
};

export let fetchFullNews = async (): Promise<Array<NewsData>> => {
	let fullNewsList: Array<NewsData> = [];
	let newsList: Array<NewsData> = [];
	let nextPage = "";
	for (let i = 0; i < 5; i++) {
		[newsList, nextPage] = await fetchNews(nextPage);
		fullNewsList.push(...newsList);
	}
	return fullNewsList;
};
