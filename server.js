// a express server, which will handle api requests coming in and respond back with a json object, it will use body parser and cors 
const OpenAI = require('openai');
const { Configuration, OpenAIApi } = OpenAI;


require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3001
const app = express();

const configuration = new Configuration({
  organization: "org-KjbHTuWOJrNuM4k3KUrbNKAJ",
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


app.use(bodyParser.json());
app.use(cors());



// app.get('/', async (req, res) =>
//   res.json({
//     message: 'Hello World'
//   } 
//   )
// );

app.post('/', async (req, res) => {
  const {message} = req.body;
  const response = await openai.createCompletion(
    // {
    //   "model": "text-davinci-003",
    //   "prompt": `Pretend you are Steve Jobs. Answer with motivational content.
    //    Steve: How can i help you today?
    //    Person: I want some motivation.
    //    Steve: You are amazing, You can create any type of business you want.
    //    Person: ${message}`,
    //   "max_tokens": 10,
    //   "temperature": 0,
    // }
    {
      "model": "text-davinci-003",
      "prompt": `Pretend you are a doctor. Answer with a medical background.
       Answer: How can i help you today?
      
       Person: ${message}`,
      "max_tokens": 100,
      "temperature": 0,
    })
  console.log(response.data);
  if (response.data.choices[0].text) {
   
      res.json({
        message: response.data.choices[0].text
      });
    
  }

}

);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


