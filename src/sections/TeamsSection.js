function TeamsSection() {
  return (
    <section className="w-full bg-white px-8 pb-52 " style={{paddingTop: '55%'}}> 
      <h2 className=" text-xl md:text-4xl text-gray-900 mb-8 md:mb-32 tracking-wide max-w-5xl">
        BUILT FOR TEAMS THAT VALUE SECURITY, PERFORMANCE, AND TRANSPARENCY 
      </h2>
      <div className="mx-auto flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 items-center justify-center ">
          <p className="text-base text-gray-700 max-w-sm text-xl">
            We are revolutionizing code analysis by putting privacy and security first. Our platform empowers developers to leverage AI while maintaining complete control over their code and data.
          </p>
        </div>
        <div className="flex-1 flex items-center justify-center items-center">
          <img
            src="assets/images/bg_gray-1.png" className="w-full"></img>
        </div>
      </div>
    </section>
  );
}

export default TeamsSection;