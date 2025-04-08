import express from 'express';
import asyncHandler from 'express-async-handler';
import OpenAI from "openai";

const app = express()
app.use(express.json())

const PORT = 7000;

const openai = new OpenAI({
    apiKey: "",
});

app.listen(PORT, async () => {
    console.log(`Server listening on port ${PORT}...`);
})

app.post('/albumbot', asyncHandler(async(req,res) => {
    const request = req.body.message
    console.log("Recieved request: ", request)

    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        store: true,
        messages: [
            {role: "user", content: request}
        ]
    })
    console.log("Responded with : ", completion.choices[0].message.content)
    if (completion) {
        res.status(201).json(completion.choices[0].message.content)
    }
    else {
        res.status(400).send({error : "Error generating response."})
    }
}));

