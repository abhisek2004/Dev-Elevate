import axios from "axios";

function guessCategory(article){
    const text=`${article.title} ${article.description}`.toLowerCase();
    if(text.includes("internship") || text.includes("career")){
        return "intenships";
    }
    if(text.includes("ai") || text.includes("machine learning")){
        return "tech";
    }
    if(text.includes("developer") || text.includes("coding")){
        return "programming";
    }
    if(text.includes("engineering") || text.includes("education")){
        return "education";
    }
    if(text.includes("conference") || text.includes("event")){
        return "event";
    }
    return "general";
}
export const fetchTechFeedArticles = async (req, res) => {
    try {
        const {data}=await axios.get(`https://newsapi.org/v2/top-headlines`, {
            params: {
                q:"developer OR AI OR coding OR engineering OR internships OR full stack OR career",
                language:"en",
                sortBy:"publishedAt",
                pageSize:15,
                apiKey: process.env.NEWS_API_KEY,
            }
        });
        const articles=data.articles.map(article=>({
            title:article.title,
            source:article.source.name,
            publishedAt:article.publishedAt,
            description:article.description,
            category:guessCategory(article),
            url:article.url,
        }));
        res.json(articles);
    } catch (error) {
        console.error(" Tech feed fetch error:", error);
        res.status(500).json({ error: "Failed to fetch tech feed " });
    }
};