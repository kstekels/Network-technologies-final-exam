import json

titles = []
objects = []
with open("./data/data.json", "r") as file:
    data = json.load(file)
    

    for i in range(0,len(data)-1):
        print(f"Iteration: {i}")
        for j in range(0,len(data[i])-1):
            # print(data[i][j])
            if data[i][j]["title"] not in titles:
                titles.append(data[i][j]["title"])
                objects.append(data[i][j])

        # print(data[0]["title"])

with open("./data/sorted_data.json", "w") as f:
    json.dump(objects, f)