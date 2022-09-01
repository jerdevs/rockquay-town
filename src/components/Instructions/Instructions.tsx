import { keys, getArrowKeyClassName, instructions } from "./Instructions.utils";

const Instructions: React.FC = (): React.ReactElement => {
  const getKey = (key: string): React.ReactElement => {
    return (
      <div className="border-black border-solid border-2 p-1 rounded-md">
        {key}
      </div>
    );
  };

  const getInstructionWithKey = (): React.ReactElement => {
    return (
      <div className="pb-3 flex flex-wrap">
        <div className="flex items-center leading-6">1. Use </div>
        <div className="pl-2 flex">
          {keys.map((key: string): React.ReactElement => {
            return (
              <div key={key} className="mr-2">
                {getKey(key)}
              </div>
            );
          })}
        </div>
        <div className="flex items-center leading-6">or</div>
        <div className="pl-2 flex">
          {Array(4)
            .fill("<")
            .map((key: string, index: number): React.ReactElement => {
              return (
                <div key={index} className={getArrowKeyClassName(index)}>
                  {getKey(key)}
                </div>
              );
            })}
        </div>
        <div className="flex items-center leading-6">to move player.</div>
      </div>
    );
  };

  const getInstructions = (): React.ReactElement => {
    return (
      <>
        {instructions.map(
          (instruction: string, index: number): React.ReactElement => {
            return (
              <div key={index} className="pb-3">
                {index + 2}. {instruction}
              </div>
            );
          }
        )}
      </>
    );
  };

  return (
    <div className="px-6 py-8">
      <div className="pb-4">How to play:</div>
      {getInstructionWithKey()}
      {getInstructions()}
    </div>
  );
};

export default Instructions;
