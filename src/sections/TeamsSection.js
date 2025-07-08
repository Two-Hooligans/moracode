function TeamsSection() {
  return (
    <section className="w-full bg-white px-8 pb-16" style={{paddingTop: '45%'}}> 
      <div className="mx-auto flex flex-col md:flex-row items-start gap-8">
        <div className="flex-1">
          <h2 className=" text-xl md:text-2xl font-bold text-gray-900 mb-6 tracking-wide">
            BUILT FOR TEAMS THAT VALUE SECURITY, PERFORMANCE, AND TRANSPARENCY 
          </h2>
          <p className=" text-base text-gray-700 max-w-xs">
            We are revolutionizing code analysis by putting privacy and security first. Our platform empowers developers to leverage AI while maintaining complete control over their code and data.
          </p>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full h-48 md:w-80 md:h-48 bg-gray-200 rounded-lg flex items-center justify-center">
            <span className=" text-gray-400">[ Image / Graphic ]</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TeamsSection;