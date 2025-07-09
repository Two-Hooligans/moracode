export default function SetupGuideSection() {
  return (
    <section className="bg-white py-20 px-4 md:px-16">
      <div className=" mx-auto">
        <h2 className=" text-3xl md:text-4xl font-normal text-gray-900 mb-20 leading-snug">
          START EXPLORING THE PRODUCT AND<br />
          VALIDATE ITS PERFORMANCE, SECURITY,<br />
          AND RELIABILITY FIRSTHAND
        </h2>

        <div className=" text-xl mb-8">SET UP GUIDE:</div>

        <div className="flex flex-col md:flex-row gap-12 md:gap-0 border-t border-gray-300">
          {/* Step 1 */}
          <div className="flex-1 pt-8 pr-8 md:border-t-0 border-black relative">
            <div className="flex items-start gap-4">
              <span className="text-5xl font-normal ">1</span>
              <div>
                <div className="text-lg  font-normal">ACTIVATE<br />THE KEY</div>
              </div>
            </div>
            <div className="mt-6 text-xs text-gray-700 ">
              Activate the key by Logging in to Moracode.<br />
              Don’t have it? Get one <a href="#" className="underline">here</a>
            </div>
          </div>
          {/* Step 2 */}
          <div className="flex-1 pt-8 px-0 md:px-8 md:border-t-0 border-gray-300 relative ">
            <div className="flex items-start gap-4">
              <span className="text-5xl font-normal  text-gray-400">2</span>
              <div>
                <div className="text-lg  font-normal text-gray-400">CONFIGURE</div>
              </div>
            </div>
            <div className="mt-6 text-xs text-gray-700 ">
              Set your proffered Conversation, Indexing and<br />
              Embedding Model
            </div>
          </div>
          {/* Step 3 */}
          <div className="flex-1 pt-8 px-0 md:px-8 border-gray-300 relative">
            <div className="flex items-start gap-4">
              <span className="text-5xl font-normal  text-gray-400">3</span>
              <div>
                <div className="text-lg  font-normal text-gray-400">CODE</div>
              </div>
            </div>
            <div className="mt-6 text-xs text-gray-700 ">
              Test our product using your code that runs locally on<br />
              your machine, never leaving your cloud
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}