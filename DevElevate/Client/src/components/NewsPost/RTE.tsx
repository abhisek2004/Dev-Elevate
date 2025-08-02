import React from "react";
import { Control, Controller } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";

interface RTEProps {
  name?: string;     
  control: Control<any>;
  label?:string;
}

const RTE:React.FC<RTEProps> =({ name = "content", control, label }) => {
  return (
    <div>
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Editor
            apiKey="kmegfrfp0z6f2lhgso5vcr5qluyns0945j8vmyyil347qp7w"
            init={{
              height: 500,
              menubar: true,
              plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
              ],
              toolbar:
                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            value={field.value}
            onEditorChange={field.onChange}
          />
        )}
      />
    </div>
  );
};
export default RTE;
