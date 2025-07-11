const faqs = [
  {
    question: `How does the "Bring Your Own Key" model work?`,
    answer:
      `MoraCode operates on a "Bring Your Own Key" (BYOK) basis, meaning you provide your own API key from supported LLM providers. Simply configure your API key from Anthropic, Google, OpenAI, or any OpenRouter-supported model, and you can use MoraCode for free with your chosen AI provider. You only pay your LLM provider directly for the API usage.e are revolutionizing code analysis by putting privacy and security first. Our platform empowers developers to leverage AI while maintaining complete control over their code and data.`,
  },
  {
    question: "Is my code and data private?",
    answer: `
    Absolutely. MoraCode is built with privacy as a core principle:
    <ul style="list-style-type: disc; padding-left: 20px;">
      <li>All code databases are stored locally on your machine</li>
      <li>Nothing leaves your local environment except direct communication with your chosen LLM provider</li>
      <li>MoraCode developers cannot see, access, or store any of your code or data</li>
      <li>We do not train on your code or data in any way</li>
      <li>All communication happens directly between your local machine and your selected LLM provider</li>
    </ul>
    </br>
    Important privacy note: While your code is sent to your LLM provider during indexing, MoraCode itself never stores, accesses, or retains this information. The communication happens directly between your local machine and your chosen LLM provider. Once indexed, all subsequent access to your code database happens locally without further LLM calls until you update or re-index your code.
  `,
  },
  {
    question: "What happens to my API key?",
    answer:
      `Your API key is stored locally in your IDE's secure settings. MoraCode uses it only to authenticate with your chosen LLM provider. We never have access to your API keys, and they never leave your local machine except for direct API calls to your selected provider.`,
  },
  {
    question: "Can MoraCode handle large codebases?",
    answer:
      `
    Yes, MoraCode is specifically designed and optimized for very large codebases. Whether you're working with enterprise-scale applications, monorepos, or complex multi-module projects with millions of lines of code, MoraCode can efficiently index and analyze your entire codebase locally.
    </br></br>Our advanced indexing system is built to:</br></br>
    <ul style="list-style-type: disc; padding-left: 20px;">
      <li>Handle codebases of any size without performance degradation</li>
      <li>Efficiently process and understand complex code relationships across large projects</li>
      <li>MoraCode developers cannot see, access, or store any of your code or data</li>
      <li>Maintain fast response times even with extensive code databases</li>
      <li>Scale intelligently based on your project's complexity and size</li>
    </ul>
  `,
  },
  {
    question: "How do I get support?",
    answer:
      `For technical support, feature requests, or questions, please visit our documentation or contact our support team through the official MoraCode website. We're committed to helping you get the most out of your AI-powered development experience.`,
  },
];

export default faqs;