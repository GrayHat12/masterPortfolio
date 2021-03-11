import React from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useHistory } from "react-router-dom";
import { greeting, settings } from "../portfolio";

export default function VoiceCommands(props) {
  const [canrecord, setcanrecord] = React.useState(true);
  const history = useHistory();

  const commands = [
    {
      command: [
        /.*resume.*/i,
        /.*see my resume.*/i,
        /.*CV.*/i,
        /.*curriculum\s?vitae.*/i,
      ],
      callback: (command) => {
        console.log(transcript, command);
        resetTranscript();
        let anchor = document.createElement("a");
        anchor.href = greeting.resumeLink;
        anchor.target = "_blank";
        anchor.click();
        anchor.remove();
      },
      bestMatchOnly: true,
      isFuzzyMatch: false,
    },
    {
      command: [
        /.*splash.*/i,
        /.*logo.*/i,
        /.*sign.*/i,
        /.*signature.*/i,
        /.*brand(ing)?.*/i,
        /.*brand.*/i,
      ],
      callback: (command) => {
        console.log(transcript, command);
        resetTranscript();
        if (settings.isSplash) history.push("/splash");
      },
      bestMatchOnly: true,
      isFuzzyMatch: false,
    },
    {
      command: [
        /.*scroll.*bottom.*/i,
        /.*bottom.*page.*/i,
        /.*page.*bottom.*/i,
        /.*down.*/i,
        /.*scroll.*down.*/i,
      ],
      callback: (command) => {
        console.log(transcript, command);
        resetTranscript();
        window.scrollTo(0, window.scrollY + window.screen.height);
      },
      bestMatchOnly: true,
      isFuzzyMatch: false,
    },
    {
      command: [
        /.*scroll.*up.*/i,
        /.*top.*page.*/i,
        /.*page.*up.*/i,
        /.*up.*/i,
        /.*scroll.*top.*/i,
        /.*top.*/i,
      ],
      callback: (command) => {
        console.log(transcript, command);
        resetTranscript();
        let tel = document.getElementById("topButton");
        if (tel) tel.click();
      },
      bestMatchOnly: true,
      isFuzzyMatch: false,
    },
    {
      command: [
        /.*home.*/i,
        /.*home\s?page.*/i,
        /.*intro.*/i,
        /.*beginning.*/i,
      ],
      callback: (command) => {
        console.log(transcript, command);
        resetTranscript();
        history.push("/home");
      },
      bestMatchOnly: true,
      isFuzzyMatch: false,
    },
    {
      command: [
        /.*education.*/i,
        /.*school.*/i,
        /.*college.*/i,
        /.*higher\s?studies.*/i,
        /.*degree.*/i,
        /.*certificates?.*/i,
      ],
      callback: (command) => {
        console.log(transcript, command);
        resetTranscript();
        history.push("/education");
      },
      bestMatchOnly: true,
      isFuzzyMatch: false,
    },
    {
      command: [
        /.*(work)?\s?experience.*/i,
        /.*professional.*/i,
        /.*work.*/i,
        /.*internships?.*/i,
        /.*experience.*/i,
      ],
      callback: (command) => {
        console.log(transcript, command);
        resetTranscript();
        history.push("/experience");
      },
      bestMatchOnly: true,
      isFuzzyMatch: false,
    },
    {
      command: [
        /.*projects?.*/i,
        /.*samples?.*/i,
        /.*codes?.*/i,
        /.*projects?.*/i,
        /.*repos?.*/i,
        /.*repositor(y|ies).*/i,
      ],
      callback: (command) => {
        console.log(transcript, command);
        resetTranscript();
        history.push("/projects");
      },
      bestMatchOnly: true,
      isFuzzyMatch: false,
    },
    {
      command: [
        /.*open\s?source.*/i,
        /.*contributions?.*/i,
        /.*pull\s?requests?.*/i,
        /.*issues?.*/i,
      ],
      callback: (command) => {
        console.log(transcript, command);
        resetTranscript();
        history.push("/opensource");
      },
      isFuzzyMatch: false,
      bestMatchOnly: true,
    },
    {
      command: [
        /.*contact.*/i,
        /.*phone\snumber.*/i,
        /.*email\s?accounts?.*/i,
        /.*get\s?in\s?touch.*/i,
      ],
      callback: (command) => {
        console.log(transcript, command);
        resetTranscript();
        history.push("/contact");
      },
      isFuzzyMatch: false,
      bestMatchOnly: true,
    },
  ];

  const { transcript, resetTranscript } = useSpeechRecognition({ commands });

  React.useEffect(() => {
    if (canrecord)
      SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
    let unlisten = history.listen((loc, action) => {
      window.scrollTo(0, 0);
    });
    return () => {
      if (canrecord) SpeechRecognition.stopListening();
      unlisten();
    };
  }, []);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    setcanrecord(false);
  }

  return <>{props.children}</>;
}
