const fs = require("fs");
const axios = require("axios");

const diff = fs.readFileSync("pr.diff", "utf-8");

async function reviewPR() {
  try {
    const response = await axios.post(
      "https://api.deepseek.com/v1/chat/completions",
      {
        model: "deepseek-chat",
        messages: [
          {
            role: "system",
            content: "You are a senior developer reviewing a pull request."
          },
          {
            role: "user",
            content: `Review this PR:\n\n${diff}`
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const review = response.data.choices[0].message.content;

    console.log(review);

    const prNumber = process.env.GITHUB_REF.split("/")[2];
    const repo = process.env.GITHUB_REPOSITORY;

    await axios.post(
      `https://api.github.com/repos/${repo}/issues/${prNumber}/comments`,
      {
        body: `🤖 AI Review:\n\n${review}`
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
        }
      }
    );

  } catch (err) {
    console.error(err);
  }
}

reviewPR();