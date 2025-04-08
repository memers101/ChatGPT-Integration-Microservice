const userMessage = "What is 3 times 7?"

const response = await fetch('http://localhost:7000/albumbot', {
    method: 'POST',
    body: JSON.stringify({message: userMessage}),
    headers: {'Content-Type':'application/json'}
})
const responseContent = JSON.parse(await new Response(response.body).text())
console.log(responseContent)