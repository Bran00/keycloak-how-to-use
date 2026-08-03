const url =
  "http://host.docker.internal:3000/callback?session_state=RzHk1lKTSxDetVyVHeiAquda&iss=http%3A%2F%2Flocalhost%3A8080%2Frealms%2Ffullcycle-realm&code=88754e25-4f8f-0d45-05e1-1c415f946cdb.RzHk1lKTSxDetVyVHeiAquda.b42cf5f3-5b4b-4baf-86d7-e874a584a5f1";

const request1 = fetch(url);
const request2 = fetch(url);

Promise.all([request1, request2])
  .then(async (responses) => {
    return Promise.all(responses.map((response) => response.json()));
  })
  .then((jsons) => console.log(jsons));
