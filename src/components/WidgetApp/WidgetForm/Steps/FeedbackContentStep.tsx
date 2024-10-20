import { ArrowLeft } from "phosphor-react";
import { FormEvent, useState } from "react";
import { FeedbackType, feedbackTypes } from "..";
import { CloseButton } from "../../CloseButton";
import { ScreenshotButton } from "../ScreenshotButton";
import axios from "axios";

interface FeedbackContentStepProps {
  type: FeedbackType;
  onFeedbackRestartRequested: () => void;
  onFeedbackSent: () => void;
}

export function FeedbackContentStep({
  type,
  onFeedbackRestartRequested,
  onFeedbackSent,
}: FeedbackContentStepProps) {
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState("");

  const feedbackTypesInfo = feedbackTypes[type];

  async function handleSubmitFeedback(event: FormEvent) {
    event.preventDefault();

    try {
      const url = `${import.meta.env.VITE_API_URL}/feedback/new`;
      const data = { type, comment };
      await axios.post(url, data);
      onFeedbackSent();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <header>
        <button
          type="button"
          className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
          onClick={onFeedbackRestartRequested}
        >
          <ArrowLeft weight="bold" className="w-4 h-4" />
        </button>
        <span className="text-lx leading-6 flex items-center gap-2">
          <img
            src={feedbackTypesInfo.image.source}
            alt={feedbackTypesInfo.image.alt}
            className="w-6 h-6"
          />{" "}
          {feedbackTypesInfo.title}
        </span>
        <CloseButton />
      </header>
      <form onSubmit={handleSubmitFeedback} className="my-4 w-full">
        <textarea
          onChange={(event) => setComment(event.target.value)}
          className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-blue-600 focus:ring-blue-500 focus:ring-1 resize-none scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
          placeholder="Conte o seu problema com detalhes"
        />

        <footer className="flex gap-2 mt-2">
          <ScreenshotButton
            screenshot={screenshot}
            onScreenshotTook={setScreenshot}
          />

          <button
            type="submit"
            disabled={comment.length === 0}
            className="p-2 bg-blue-600 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-blue-600 transition-colors disabled:opacity-50 disabled:hover:bg-blue-600"
          >
            Enviar feedback
          </button>
        </footer>
      </form>
    </>
  );
}
