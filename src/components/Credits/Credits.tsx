const Credits: React.FC = (): React.ReactElement => {
  return (
    <div className="px-6 pb-8">
      <div className="pb-4 text-rose-800">Credits:</div>
      <div>
        Inspired and credits to{" "}
        <a
          href="https://youtu.be/yP5DKzriqXA"
          target="_blank"
          rel="noreferrer"
          className="text-rose-800"
        >
          Chris Courses
        </a>{" "}
        on YouTube for the development of this project.
      </div>
    </div>
  );
};

export default Credits;
