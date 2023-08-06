const fs = require("fs");
const fetch = require("node-fetch");
const express = require("express");
const app = express();

app.get("/", (request, response) => {
	response.sendFile(__dirname + "/thoughts.html");
});

app.get("/thoughts.html", (request, response) => {
	response.sendFile(__dirname + "/thoughts.html");
});

app.get("/think", (request, response) => {
	response.sendFile(__dirname + "/think.html");
});

app.get("/think.html", (request, response) => {
	response.sendFile(__dirname + "/think.html");
});

app.get("/about", (request, response) => {
	response.sendFile(__dirname + "/about.html");
});

app.get("/about.html", (request, response) => {
	response.sendFile(__dirname + "/about.html");
});

app.get("/privacy", (request, response) => {
	response.sendFile(__dirname + "/privacy.html");
});

app.get("/privacy.html", (request, response) => {
	response.sendFile(__dirname + "/privacy.html");
});

app.get("/terms", (request, response) => {
	response.sendFile(__dirname + "/terms.html");
});

app.get("/terms.html", (request, response) => {
	response.sendFile(__dirname + "/terms.html");
});

app.get("/logo", (request, response) => {
	response.sendFile(__dirname + "/logo.png");
});

app.get("/logo.png", (request, response) => {
	response.sendFile(__dirname + "/logo.png");
});

app.get("/thoughts.json", (request, response) => {
	response.sendFile(__dirname + "/thoughts.json");
});

app.get("/manifest.json", (request, response) => {
	response.sendFile(__dirname + "/manifest.json");
});

app.get("/sitemap.txt", (request, response) => {
	response.sendFile(__dirname + "/sitemap.txt");
});

app.get("/service-worker.js", (request, response) => {
	response.sendFile(__dirname + "/service-worker.js");
});

app.get("/apk", (request, response) => {
	response.redirect("https://ozarksmade.net/apps/all-thoughts/AllThoughts_release.apk");
});

app.get("/app", (request, response) => {
	response.redirect("https://ozarksmade.net/apps/app.html#id=all-thoughts");
});

app.get("/add", (request, response) => {
	if(request.get("user-agent") == "okhttp/3.9.1" || request.headers.referer == "https://allthoughts.ozarksmade.net/think.html") {
		if(request.headers.newthought) {
	    	fs.readFile("./thoughts.json", (err, unparsedThoughts) => {
				var thoughts = JSON.parse(unparsedThoughts);
				var newthought = JSON.parse(request.headers.newthought);
				thoughts.thoughts.push(newthought);
				fs.writeFileSync("./thoughts.json", JSON.stringify(thoughts, null, 4));
				response.sendStatus(202);
			});
	    }
	}
	else {
		response.sendStatus(403);
	}
});

app.get("/jwt", (request, response) => {
	const token = JSON.parse(request.headers.token);
	const {OAuth2Client} = require('google-auth-library');
	const client = new OAuth2Client(token.clientId);
	async function verify() {
		const ticket = await client.verifyIdToken({
			idToken: token.credential,
		    audience: token.clientId
		});
		const payload = ticket.getPayload();
		response.send(payload);
	}
	verify().catch(console.error);
});

const listener = app.listen(2022, () => {
	console.log("AllThoughts is now online at https://allthoughts.ozarksmade.net. If you hosted AllThoughts locally, it is now live on all IP Addresses at port " + listener.address().port);
});

function fetchServer() {
	fetch("https://allthoughts.ozarksmade.net");
}

setInterval(fetchServer, 600000);
