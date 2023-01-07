import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [chatInput, setChatInput] = useState("");
  const [result, setResult] = useState([]);

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ chat: chatInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult([...result, data.result]);
      setChatInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>OpenAI chatbot</title>
        <link rel="icon" href="/chat.png" />
      </Head>

      <main className={styles.main}>
        <div className={styles.header}>
          <img src="/chat.png" className={styles.icon} />
          <h3>Chat on OpenAI</h3>
        </div>
        <div className={styles.result}>
          <ul>
            {result.map((text) => (
              <li>
                <img src="/AI.png" />
                : {text}
              </li>
            ))}
          </ul>
        </div>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="chat"
            placeholder="文章を入力してください"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
          />
          <input type="submit" value="送信" />
        </form>
      </main>
    </div>
  );
}
