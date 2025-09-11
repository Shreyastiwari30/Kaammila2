import React, { useState, useEffect } from "react";
import Answers from "./Answers";
import { url } from "../utils/constant";
import { useSelector } from "react-redux";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import faqData from "../data/faq.json";


function Gpt() {
  const user = useSelector((store) => store.user);
  const [chats, setChats] = useState(() => {
    const saved = localStorage.getItem("chats");
    return saved ? JSON.parse(saved) : [];
  });

  const [activeChatId, setActiveChatId] = useState(() => {
    return localStorage.getItem("activeChatId") || null;
  });

  const [question, setQuestion] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!activeChatId) createNewChat();
  }, []);

  const createNewChat = () => {
    const newChat = {
      id: Date.now().toString(),
      title: `Chat ${chats.length + 1}`,
      history: [],
    };
    const updated = [...chats, newChat];
    setChats(updated);
    setActiveChatId(newChat.id);
    localStorage.setItem("chats", JSON.stringify(updated));
    localStorage.setItem("activeChatId", newChat.id);
  };

  const askQuestion = async () => {
  if (!question.trim()) return;

  
  const faqAnswer = findFAQAnswer(question);
  let parts;

  if (faqAnswer) {
    parts = [faqAnswer];
  } else {
  
    try {
      const payload = { contents: [{ parts: [{ text: question }] }] };

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

      parts = raw
        .split(/\n|\*\*\d+\.\s|\*\*/g)
        .map((s) => s.trim())
        .filter(Boolean);
    } catch (err) {
      console.error("Error:", err);
      parts = ["Sorry, something went wrong. Please try again."];
    }
  }

  
  const newQA = { question, answers: parts };

  const updatedChats = chats.map((chat) =>
    chat.id === activeChatId
      ? { ...chat, history: [...chat.history, newQA] }
      : chat
  );

  setChats(updatedChats);
  localStorage.setItem("chats", JSON.stringify(updatedChats));
  setQuestion("");
};


  const activeChat = chats.find((chat) => chat.id === activeChatId);

const findFAQAnswer = (query) => {
  const lowerQ = query.toLowerCase();

  
  for (let faq of faqData.general) {
    for (let q of faq.questions) {
      if (lowerQ.includes(q.toLowerCase())) {
        return faq.answer;
      }
    }
  }

  
  for (let category in faqData.categories) {
    for (let faq of faqData.categories[category]) {
      for (let q of faq.questions) {
        if (lowerQ.includes(q.toLowerCase())) {
          return faq.answer;
        }
      }
    }
  }

  return null;
};



  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-r from-gray-800 via-purple-950 to-gray-900 text-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "block" : "hidden"
        } lg:block fixed lg:static z-40 top-0 left-0 w-72 h-screen bg-gray-900/80 backdrop-blur-md px-5 py-6 border-r border-gray-700`}
      >
        <div className="flex justify-between items-center mb-6">
          <span className="text-xl font-bold text-purple-400">Chats</span>
        </div>

        <button
          onClick={createNewChat}
          className="text-purple-400 hover:text-purple-300 font-medium mb-4 block"
        >
          + New Chat
        </button>

        <input
          type="text"
          placeholder="🔍 Search..."
          className="bg-gray-800 text-white w-full rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <ul className="space-y-2 overflow-y-auto max-h-[65vh] pr-1">
          {chats.map((chat) => (
            <li
              key={chat.id}
              onClick={() => {
                setActiveChatId(chat.id);
                localStorage.setItem("activeChatId", chat.id);
                setSidebarOpen(false);
              }}
              className={`px-4 py-2 rounded-lg cursor-pointer transition ${
                activeChatId === chat.id
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md"
                  : "bg-gray-800/60 hover:bg-gray-700"
              }`}
            >
              {chat.title}
            </li>
          ))}
        </ul>

        <Button variant="secondary" className="mt-10 w-full">
          <Link to="/">← Back to Home</Link>
        </Button>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 p-6 lg:ml-24 relative flex flex-col">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          GPT Assistant
        </h1>
        <h2 className="text-center text-lg text-gray-300 mb-6">
          Welcome back, ask anything you’d like ✨
        </h2>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto space-y-6 max-h-[70vh] pb-20">
          {activeChat?.history.map((entry, idx) => (
            <div key={idx} className="flex flex-col gap-4">
              {/* User Bubble */}
              <div className="ml-auto max-w-[75%] bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-2xl shadow-md">
                <p className="font-semibold">Q: {entry.question}</p>
              </div>

              {/* AI Bubble */}
              <div className="mr-auto max-w-[75%] bg-gray-800 p-4 rounded-2xl shadow-md border border-gray-700">
                <ul className="space-y-2 text-gray-200 list-disc list-inside">
                  {entry.answers.map((ans, i) => (
                    <li key={i}>
                      <Answers ans={ans} index={i} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[95%] sm:w-4/5 lg:w-2/3 xl:w-1/2 bg-gray-900/90 border border-gray-700 text-white rounded-full h-14 shadow-xl flex items-center justify-between px-4 z-50">
          <input
            onChange={(e) => setQuestion(e.target.value)}
            value={question}
            type="text"
            placeholder="💬 Type your question..."
            className="bg-transparent w-full rounded-full px-4 py-2 outline-none placeholder:text-gray-400"
          />
          <button
            onClick={askQuestion}
            className="bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full px-5 py-1.5 ml-4 hover:scale-105 transition-transform"
          >
            Ask
          </button>
        </div>
      </div>
    </div>
  );
}

export default Gpt;
