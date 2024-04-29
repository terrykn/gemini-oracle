import runGemini from './Gemini';

async function CreateSearch(articleSearch, customSearch) {
    let search = '';

    if (articleSearch.length > 1) {
        const createArticleSearch = await runGemini(
            `Imagine hypothetically you are doing a search on Twitter.
            Output ONLY EXACTLY what you would type in for that one single search prompt
            and NOTHING ELSE, with goal to find specific information on topics
            of a news article titled: ${articleSearch}. Should only be no more than 3-4 words! 
            Less is better when searching.
            The search should have NO symbols, NO hashtags, only TEXT,
            and DOES NOT INCLUDE THE NAME OF THE NEWS OUTLET OF THE ARTICLE`
        );
        search = createArticleSearch;
    } else if (customSearch.length > 1) {
        search = customSearch;
    }

    return search;
}

export default CreateSearch;