import RichTextEditor from "./RichTextEditor";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const QuestionEditor = ({ value, onChange }: Props) => {
  return (
    <RichTextEditor
      showDelete={true}
      placeholder="Type your question here..."
      value={value}
      onChange={onChange}
    />
  );
};

export default QuestionEditor;
