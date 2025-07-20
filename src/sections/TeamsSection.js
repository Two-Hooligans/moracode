function TeamsSection() {
  return (
    <section className="w-full bg-white px-4 md:px-8  pb-20 md:pb-40 pt-[25%] md:pt-[35%]"> 
      <h2 className=" text-[32px] text-gray-900 mb-8 md:mb-32 tracking-wide max-w-4xl">
        BUILT FOR TEAMS THAT VALUE SECURITY, PERFORMANCE, AND TRANSPARENCY 
      </h2>
      <div className="mx-auto flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 items-center justify-center ">
          <p className="text-base text-gray-700 max-w-sm text-md">
            We are revolutionizing code analysis by putting privacy and security first. Our platform empowers developers to leverage AI while maintaining complete control over their code and data.
          </p>
        </div>
        <div className="flex-1 flex items-center justify-center items-center">
          <img
            src="assets/images/bg_gray-1.png" className="w-full" alt=""></img>
        </div>
      </div>
    </section>
  );
}

export default TeamsSection;