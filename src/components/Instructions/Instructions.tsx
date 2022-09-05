import ReactDOMServer from "react-dom/server";
import ArrowKeys from "../../assets/images/ArrowKeys.png";
import WASDKeys from "../../assets/images/WASDKeys.png";
import SpacebarKey from "../../assets/images/SpacebarKey.png";
import { instructions, KeyImages } from "./Instructions.utils";
import ThinkingIcon from "../../assets/images/ThinkingIcon.png";

const Instructions: React.FC = (): React.ReactElement => {
  const getKeyImage = (key: string): React.ReactElement => {
    switch (key) {
      case KeyImages.WASD_KEYS:
        return <img className="mx-3" src={WASDKeys} alt="WASD Keys" />;
      case KeyImages.ARROW_KEYS:
        return <img className="mx-3" src={ArrowKeys} alt="Arrow Keys" />;
      case KeyImages.SPACEBAR_KEY:
        return <img className="mx-3" src={SpacebarKey} alt="Spacebar Key" />;
    }
    return <></>;
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
      <div className="pb-4 text-blue-800 flex">
        <div>
          <img src={ThinkingIcon} alt="How to play" />
        </div>
        <div className="pl-3">HOW TO PLAY</div>
      </div>
      {getInstructions()}
    </div>
  );
};

export default Instructions;
