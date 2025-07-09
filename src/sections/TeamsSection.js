function TeamsSection() {
  return (
    <section className="w-full bg-white px-8 pb-16 " style={{paddingTop: '45%'}}> 
      <h2 className=" text-xl md:text-2xl text-gray-900 mb-8 md:mb-32 tracking-wide max-w-2xl">
        BUILT FOR TEAMS THAT VALUE SECURITY, PERFORMANCE, AND TRANSPARENCY 
      </h2>
      <div className="mx-auto flex flex-col md:flex-row items-start gap-8">
        <div className="flex-1">
          <p className=" text-base text-gray-700 max-w-xs">
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