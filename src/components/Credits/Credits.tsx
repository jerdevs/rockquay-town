import HeartIcon from "../../assets/images/HeartIcon.png";

const Credits: React.FC = (): React.ReactElement => {
  return (
    <div className="px-8 pb-8">
      <div className="pb-4 text-red-700 flex">
        <div className="animate-bounce">
          <img src={HeartIcon} alt="How to play" />
        </div>
        <div className="pl-3">CREDITS</div>
      </div>
      <div>
        Inspired and credits to{" "}
        <a
          href="https://youtu.be/yP5DKzriqXA"
          target="_blank"
          rel="noreferrer"
          className="text-red-700"
        >
          Chris Courses
        </a>{" "}
        on YouTube for the development of this project.
      </div>
    </div>
  );
};

export default Credits;
