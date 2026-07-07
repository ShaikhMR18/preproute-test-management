import RichTextEditor from "./RichTextEditor";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const SolutionEditor = ({ value, onChange }: Props) => {
  return (
    <RichTextEditor
      title="Add Solution"
      showDelete={false}
      showToolbar={false}
      placeholder="Type solution here..."
      value={value}
      onChange={onChange}
      minHeight={180}
    />
  );
};

export default SolutionEditor;
