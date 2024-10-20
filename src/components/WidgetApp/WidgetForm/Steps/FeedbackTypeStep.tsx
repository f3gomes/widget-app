import { FeedbackType, feedbackTypes } from "..";
import { CloseButton } from "../../CloseButton";

interface FeedbackTypeStepProps {
  onFeedbackTypeChanged: (type: FeedbackType) => void;
}

export function FeedbackTypeStep({
  onFeedbackTypeChanged,
}: FeedbackTypeStepProps) {
  return (
    <>
      <header>
        <span className="text-lx leading-6">Deixe seu feedback</span>
        <CloseButton />
      </header>

      <div className="flex py-8 gap-2 w-full justify-center">
        {Object.entries(feedbackTypes).map(([key, value]) => {
          return (
            <button
              key={key}
              className="bg-zinc-800 rounded-lg py-5 w-24 flex flex-col items-center justify-center gap-2 border-2 border-transparent hover:border-blue-600 focus:border-blue-600 focus:outline-none"
              onClick={() => onFeedbackTypeChanged(key as FeedbackType)}
            >
              <img src={value.image.source} className="w-10" />
              <span>{value.title}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}
