import bugImagesUrl from "../../assets/Bug.svg";
import ideiaImagesUrl from "../../assets/Idea.svg";
import thoughtImagesUrl from "../../assets/Thought.svg";
import { useState } from "react";
import { FeedbackTypeStage } from "./stages/FeedbackTypeStage";
import { FeedbackContentStage } from "./stages/FeedbackContentStage";
import { FeedbackSuccessStage } from "./stages/FeedbackSuccessStage";

export const feedbackTypes = {
  BUG: {
    title: 'Problema',
    image: {
      source: bugImagesUrl,
      alt: 'Image de insecto'
    },
  },
  IDEIA: {
    title: 'Ideia',
    image: {
      source: ideiaImagesUrl,
      alt: 'Imagem de uma lampada',
    },
  },
  OTHER: {
    title: 'Outro',
    image: {
      source: thoughtImagesUrl,
      alt: 'Image de um balao de pesamento',
    },
  },
};

export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm() {

  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);


  function handleRestartFeedback() {
    setFeedbackSent(false);
    setFeedbackType(null);
  }

  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
      {feedbackSent ? (
        <FeedbackSuccessStage onFeedbackRestartRequested={handleRestartFeedback} />
      ) : (
        <>
          {!feedbackType ?
            (
              <FeedbackTypeStage onFeedbackTypeChanged={setFeedbackType} />
            ) : (
              <FeedbackContentStage
                feedbackType={feedbackType}
                onFeedbackRestartRequested={handleRestartFeedback}
                onFeedbackSent={() => setFeedbackSent(true)}
              />
            )
          }
        </>
      )
      }
      <footer className="text-xs text-natural-400">
        Feito com ♥ pela  <a className="underline underline-offset-2" href="https://rocketseat.com.br" target="_blank" rel="noopener noreferrer">Rocketseat</a>
      </footer>
    </div>
  );
}