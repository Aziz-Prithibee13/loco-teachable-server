const express = require("express");
const cors = require("cors");
const teachableMachine = require("@sashido/teachablemachine-node");

require("dotenv").config();

const app = express();

const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());


async function run() {
    try {
        const model = new teachableMachine({
            modelUrl: "https://teachablemachine.withgoogle.com/models/ZqbOTYYBL/",
        });

        app.post("/classification", async (req, res) => {
            const url = req.body.url;

            console.log(url);

            return await model
                .classify({
                    imageUrl: url,
                })
                .then((predictions) => {
                    console.log(predictions);
                    return res.send(predictions);
                })
                .catch((e) => {
                    console.error(e);
                    res.status(500).send("Something went wrong!");
                });
        });
    }
    finally {
        /* await client.close(); */
    }
}

run().catch(console.dir);



app.get("/", (req, res) => {
    res.send("Birdly Running");
  });
  
  app.listen(port, () => {
   
    console.log("Birdly running in port ", port);
  });