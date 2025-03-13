import { fetchPatchNotes } from "./generator";
import { fetchFullNews } from "./news";

fetchFullNews().then((newsData) => {
	fetchPatchNotes(newsData).then(() => {
		console.log("DONE");
	});
});
