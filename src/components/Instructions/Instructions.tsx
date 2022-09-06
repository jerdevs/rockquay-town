import ReactDOMServer from "react-dom/server";
import ArrowKeys from "../../assets/images/ArrowKeys.png";
import WASDKeys from "../../assets/images/WASDKeys.png";
import SpacebarKey from "../../assets/images/SpacebarKey.png";
import { instructions, KeyImages } from "./Instructions.utils";
import ThinkingIcon from "../../assets/images/ThinkingIcon.png";

const Instructions: React.FC = (): React.ReactElement => {
  const getKeyImage = (key: string): React.ReactElement => {
    let src = "";
    switch (key) {
      case KeyImages.WASD_KEYS:
        src = WASDKeys;
        break;
      case KeyImages.ARROW_KEYS:
        src = ArrowKeys;
        break;
      case KeyImages.SPACEBAR_KEY:
        src = SpacebarKey;
        break;
    }
    return <img className="mx-3 h-6 w-auto" src={src} alt={key} />;
  };

  const getInstruction = (instruction: string): React.ReactElement => {
    const images: string[] = instruction.match(/\[(.*?)\]/g) || [];
    let updatedInstruction = instruction;
    if (!!images.length) {
      images.forEach((imageKey: string): void => {
        updatedInstruction = updatedInstruction.replace(
          imageKey,
          ReactDOMServer.renderToStaticMarkup(
            getKeyImage(imageKey.replace(/[[\]']+/g, ""))
          )
        );
      });
    }
    return <div dangerouslySetInnerHTML={{ __html: updatedInstruction }}></div>;
  };

  const getInstructions = (): React.ReactElement => {
    return (
      <>
        {instructions.map(
          (instruction: string, index: number): React.ReactElement => {
            return (
              <div
                key={index}
                className={`${index !== instructions.length - 1 && "pb-3"}`}
              >
                {getInstruction(instruction)}
              </div>
            );
          }
        )}
      </>
    );
  };

  return (
    <div className="px-8 pb-8">
      <div className="pb-4 text-orange-500 flex">
        <div className="animate-bounce">
          <img src={ThinkingIcon} alt="How to play" />
        </div>
        <div className="pl-3">HOW TO PLAY</div>
      </div>
      {getInstructions()}
    </div>
  );
};

export default Instructions;
