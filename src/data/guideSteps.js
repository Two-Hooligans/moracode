const steps = [
  {
    number: 1,
    title: (
      <>
        ACTIVATE
        <br />
        THE KEY
      </>
    ),
    content: (
      <>
        Activate the key by Logging in to Moracode. Don’t have it? Get one{" "}
        <a href="https://panel.moracode-dev.com/get-key" className="underline">
          here
        </a>
      </>
    ),
  },
  {
    number: 2,
    title: <>CONFIGURE</>,
    content: (
      <>
        Set your preferred Conversation, Indexing, and Embedding Model.
      </>
    ),
  },
  {
    number: 3,
    title: <>CODE</>,
    content: (
      <>
        Test our product using your code that runs locally on your machine, never leaving your cloud.
      </>
    ),
  },
];

export default steps;