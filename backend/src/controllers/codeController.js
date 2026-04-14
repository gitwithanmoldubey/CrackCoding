import { ENV } from "../lib/env.js";

export async function executeCode(req, res) {
  try {
    if (!ENV.PISTON_BASE_URL) {
      return res.status(200).json({
        run: {
          output: "",
          stderr: "Code execution is not configured. Set PISTON_BASE_URL in backend/.env.",
        },
      });
    }

    const { language, code } = req.body;

    if (!language || !code) {
      return res
        .status(400)
        .json({ message: "Language and code are required." });
    }

    const pistonUrl = ENV.PISTON_BASE_URL.replace(/\/+$/, "") + "/execute";

    const response = await fetch(pistonUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language,
        version: req.body.version,
        files: [
          {
            name: req.body.filename || `main.${getFileExtension(language)}`,
            content: code,
          },
        ],
      }),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return res.status(response.status).json({
        message: "Code execution service error",
        statusText: response.statusText,
        details: data,
      });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Error in executeCode controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

function getFileExtension(language) {
  const extensions = {
    javascript: "js",
    python: "py",
    java: "java",
  };

  return extensions[language] || "txt";
}
