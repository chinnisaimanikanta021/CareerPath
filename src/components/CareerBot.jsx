import React, { useState, useEffect, useRef } from "react";
import { Send, X, Bot, User, ArrowRight, Sparkles } from "lucide-react";
import { careerData } from "../data/careerData";

const CareerBot = ({ isOpen, setIsOpen }) => {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hi! I am your AI Career Assistant. How can I help you find your dream path today?",
    },
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const generateResponse = (query) => {
    const q = query.toLowerCase();

    // Education keywords
    const educationKeywords = {
      tenth: ["10th", "after 10", "after tenth"],
      inter: ["inter", "12th", "after 12"],
      diploma: ["diploma", "polytechnic"],
      btech: ["btech", "engineering", "degree"],
      iti: ["iti", "technical"],
    };

    let detectedEdu = null;

    Object.keys(educationKeywords).forEach((level) => {
      educationKeywords[level].forEach((word) => {
        if (q.includes(word)) {
          detectedEdu = level;
        }
      });
    });

    let matchedBranches = [];
    let matchedJobs = [];

    const stopWords = ["the", "and", "for", "with", "after", "jobs", "career", "suggest", "some", "what", "how", "become", "can", "you", "tell", "about", "want", "know", "please", "path", "paths", "best", "good"];
    const queryWords = q.split(/[\s,]+/).filter(w => w.length > 2 && !stopWords.includes(w));

    careerData.forEach((edu) => {
      edu.branches.forEach((branch) => {
        const branchTitle = branch.title.toLowerCase();
        let isBranchMatch = (q.length > 2 && branchTitle.includes(q)) || q.includes(branchTitle);

        if (!isBranchMatch && queryWords.length > 0) {
          isBranchMatch = queryWords.some(w => branchTitle.includes(w));
        }

        if (isBranchMatch) {
          if (!matchedBranches.some(b => b.id === branch.id)) {
            matchedBranches.push(branch);
          }
        }

        branch.jobs.forEach((job) => {
          const jobTitle = job.title.toLowerCase();
          let isJobMatch = (q.length > 2 && jobTitle.includes(q)) || q.includes(jobTitle);

          if (!isJobMatch && queryWords.length > 0) {
            isJobMatch = queryWords.some(w => jobTitle.includes(w));
          }

          if (isJobMatch) {
            if (!matchedJobs.some(j => j.job.id === job.id)) {
              matchedJobs.push({ job, branch });
            }
          }
        });
      });
    });

    // Job response
    if (matchedJobs.length > 0) {
      let response = "I found these matching career paths for you:\n\n";
      matchedJobs.forEach((match, index) => {
        response += `💼 ${index + 1}. ${match.job.title} (${match.branch.title} field)\n`;
        if (match.job.description) {
          response += `📝 ${match.job.description}\n`;
        }
        response += "\n";
      });
      response += "Explore more in the career section of this app.";
      return response;
    }

    // Branch response
    if (matchedBranches.length > 0) {
      let response = "Here are some branches relating to your search:\n\n";
      matchedBranches.forEach((branch, index) => {
        const jobList = branch.jobs.slice(0, 3).map((job) => job.title).join(", ");
        response += `📚 ${index + 1}. ${branch.title}\nCareers: ${jobList}\n\n`;
      });
      return response.trim();
    }

    // Education responses
    if (detectedEdu === "tenth") {
      return `🎓 After 10th you have these career paths:

1️⃣ Diploma (Polytechnic)

2️⃣ ITI Trades

3️⃣ Intermediate (MPC / BiPC / Commerce)

From there you can go to engineering, degree, or technical jobs.`;
    }

    if (detectedEdu === "diploma") {
      return `🎓 After Diploma you can:

• Do B.Tech (Lateral Entry)

• Get technician jobs

• Apply for government jobs

Popular branches include CSE, ECE, Mechanical, Civil.`;
    }

    if (detectedEdu === "iti") {
      return `🛠 ITI leads to skill-based jobs like:

• Electrician

• Welder

• Mechanic

• Technician

Many ITI professionals also start their own businesses.`;
    }

    if (detectedEdu === "btech") {
      return `🎓 After B.Tech you can become:

• Software Developer

• Data Engineer

• Embedded Engineer

• Civil Engineer

You can also pursue higher studies like M.Tech or MBA.`;
    }

    // Greeting
    if (q.includes("hello") || q.includes("hi")) {
      return "Hello! I am your career guide. You can ask things like 'Careers after 10th', 'Jobs in Mechanical', or 'Diploma careers'.";
    }

    // General career help
    if (q.includes("job") || q.includes("salary") || q.includes("career")) {
      return "I can help you explore careers across Diploma, ITI, B.Tech and many engineering branches. Try asking about Mechanical, Civil, Software, or careers after 10th.";
    }

    return "I'm not sure I understand. Try asking about careers after 10th, Diploma branches, ITI trades, or engineering jobs.";
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    setTimeout(() => {
      const botResponse = { role: "bot", text: generateResponse(input) };
      setMessages((prev) => [...prev, botResponse]);
    }, 600);
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "30px",
        right: "30px",
        zIndex: 1000,
        fontFamily: "inherit",
      }}
    >
      <div
        className="glass-panel"
        style={{
          width: "380px",
          height: "550px",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          animation: "slideUp 0.3s ease-out",
          boxShadow: "0 20px 50px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            padding: "20px",
            background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
            color: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                background: "white",
                padding: "5px",
                borderRadius: "8px",
              }}
            >
              <Bot size={22} color="#2563eb" />
            </div>
            <div>
              <div style={{ fontWeight: "700", fontSize: "1rem" }}>
                AI Career Bot
              </div>
              <div style={{ fontSize: "0.7rem", opacity: 0.9 }}>
                Always Active
              </div>
            </div>
          </div>
          <X
            size={20}
            style={{ cursor: "pointer" }}
            onClick={() => setIsOpen(false)}
          />
        </div>

        <div
          style={{
            flex: 1,
            padding: "20px",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            background: "rgba(255,255,255,0.5)",
          }}
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                maxWidth: "85%",
                display: "flex",
                gap: "12px",
                flexDirection: msg.role === "user" ? "row-reverse" : "row",
              }}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "10px",
                  background: msg.role === "user" ? "#f1f5f9" : "#2563eb",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {msg.role === "user" ? (
                  <User size={18} color="#64748b" />
                ) : (
                  <Bot size={18} color="white" />
                )}
              </div>

              <div
                style={{
                  padding: "14px",
                  borderRadius:
                    msg.role === "user"
                      ? "18px 4px 18px 18px"
                      : "4px 18px 18px 18px",
                  fontSize: "0.95rem",
                  lineHeight: "1.5",
                  background: msg.role === "user" ? "#2563eb" : "white",
                  color: msg.role === "user" ? "white" : "#1e293b",
                }}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        <form
          onSubmit={handleSend}
          style={{
            padding: "20px",
            background: "white",
            borderTop: "1px solid #f1f5f9",
            display: "flex",
            gap: "12px",
          }}
        >
          <input
            type="text"
            placeholder="Type your question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{
              flex: 1,
              border: "1px solid #e2e8f0",
              padding: "12px",
              borderRadius: "10px",
              outline: "none",
            }}
          />

          <button
            type="submit"
            style={{
              background: "#2563eb",
              color: "white",
              width: "45px",
              height: "45px",
              borderRadius: "10px",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Send size={20} />
          </button>
        </form>
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default CareerBot;
