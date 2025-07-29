function TeamsSection() {
  return (
    <section className="w-full bg-white px-4 md:px-4  pb-20 md:pb-28 pt-[45%] md:pt-[28rem]">
      <h2 className=" md:text-[32px] text-[24px] text-[#252525] mb-8 md:mb-32 tracking-wide max-w-4xl tracking-normal">
        BUILT FOR TEAMS THAT VALUE SECURITY, PERFORMANCE, AND TRANSPARENCY
      </h2>
      <div className="mx-auto flex flex-col md:flex-row items-center gap-8 bg-white">
        <div className="flex-1 items-center justify-center ">
          <p className="text-base text-[#252525] max-w-sm text-md tracking-normal">
            We are revolutionizing code analysis by putting privacy and security
            first. Our platform empowers developers to leverage AI while
            maintaining complete control over their code and data.
          </p>
        </div>
        <section className="flex-1 flex items-center justify-center items-center bg-white">
          <img
            src="assets/images/bg_gray-1.png"
            className="w-full"
            alt=""
          ></img>
        </section>
      </div>
    </section>
  );
}

export default TeamsSection;
