import { ArrowLeft } from "phosphor-react";
import { FormEvent, useEffect, useState } from "react";
import { FeedbackType, feedbackTypes } from "..";
import { CloseButton } from "../../CloseButton";
import { ScreenshotButton } from "../ScreenshotButton";
import axios from "axios";

interface FeedbackContentStepProps {
  type: FeedbackType;
  onFeedbackSent: () => void;
  onFeedbackRestartRequested: () => void;
}

export function FeedbackContentStep({
  type,
  onFeedbackSent,
  onFeedbackRestartRequested,
}: FeedbackContentStepProps) {
  const [screenshotUrl, setScreenshot] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [comment, setComment] = useState("");

  const companyId = import.meta.env.VITE_COMPANY_ID;

  const feedbackTypesInfo = feedbackTypes[type];

  async function handleSubmitFeedback(event: FormEvent) {
    event.preventDefault();

    try {
      setIsLoading(true);
      const url = `${import.meta.env.VITE_API_URL}/feedback/new`;
      const data = { type, comment, companyId, screenshotUrl };
      await axios.post(url, data);
      onFeedbackSent();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
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
          required
          onChange={(event) => setComment(event.target.value)}
          className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-blue-600 focus:ring-blue-500 focus:ring-1 resize-none scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
          placeholder="Conte o seu problema com detalhes"
        />

        <footer className="flex gap-2 mt-2">
          <ScreenshotButton
            screenshot={screenshotUrl}
            setScreenshot={setScreenshot}
          />

          <button
            type="submit"
            disabled={!screenshotUrl || isLoading}
            className="p-2 bg-blue-600 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-blue-600 transition-colors disabled:opacity-50 disabled:hover:bg-blue-600"
          >
            {isLoading ? "Enviando..." : "Enviar feedback"}
          </button>
        </footer>
      </form>
    </>
  );
}
