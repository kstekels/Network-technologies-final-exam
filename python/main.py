import json
import requests
import json

language = "en"
actual_topics = ["tesla", "apple", "nba", "amd", "intel", "microsoft", "bitcoin", "bmw", "spacex", "hyperloop", "iphone", "vw", "android", "business", "marvel", "dc", "netflix", "disney"]
sortBy = "publishedAt"
api_key = "f9e63637b7244cf4bf5cc7501c5724e3"

def api_call(pages, topics):
    articles = []
    for page in range(1, pages):
        for topic in topics:
            # main_topic = topics[page-1]
            api_link = f"https://newsapi.org/v2/everything?domains=wsj.com&apiKey={api_key}&language={language}&sortBy={sortBy}&page={page}&q={topic}"
            response = requests.get(api_link)
            print(response.status_code)
            articles.append(response.json()["articles"])
    return articles

if __name__ == "__main__":
    data = api_call(5, actual_topics)
    with open('./data/data.json', 'w') as file:
        json.dump(data, file)