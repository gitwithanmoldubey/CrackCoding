// Code execution for demo purposes - JS runs in browser, others require Piston.

const LANGUAGE_VERSIONS = {
  javascript: { language: "javascript", version: "18.15.0" },
  python: { language: "python", version: "3.10.0" },
  java: { language: "java", version: "15.0.2" },
};

/**
 * @param {string} language - programming language
 * @param {string} code - source code to executed
 * @returns {Promise<{success:boolean, output?:string, error?: string}>}
 */
export async function executeCode(language, code) {
  try {
    const languageConfig = LANGUAGE_VERSIONS[language];

    if (!languageConfig) {
      return {
        success: false,
        error: `Unsupported language: ${language}`,
      };
    }

    if (language === "javascript") {
      // Run JS in browser
      const logs = [];
      const originalConsoleLog = console.log;
      console.log = (...args) => {
        logs.push(args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg)).join(' '));
      };

      try {
        // Use Function to run the code in global scope
        const func = new Function(code);
        func();
        console.log = originalConsoleLog;
        return {
          success: true,
          output: logs.join('\n') || 'Code executed successfully',
        };
      } catch (e) {
        console.log = originalConsoleLog;
        return {
          success: false,
          error: `JavaScript error: ${e.message}`,
        };
      }
    } else {
      return {
        success: false,
        error: `${language} execution requires Piston. Install Docker and run: docker run -d -p 8080:8080 --name piston ghcr.io/engineer-man/piston`,
      };
    }
  } catch (error) {
    return {
      success: false,
      error: `Failed to execute code: ${error.message}`,
    };
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
