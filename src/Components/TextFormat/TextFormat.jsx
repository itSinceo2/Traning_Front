import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";


const TextFormat = ({ name, initialValue, handleChange  }) => {
    const editorRef = useRef(null);

    const handleEditorChange = () => {
        if (handleChange) {
            handleChange(editorRef.current.getContent(), name);
        }
    };
    return (
        <>
            <Editor
                apiKey='7cn0s3sy89eycfjccfl2vqcvcy469bewfc9l05evzgc672zi'
                onInit={(e, editor) => editorRef.current = editor}
                initialValue={initialValue}
                onChange={handleEditorChange}
                init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                    ],
                    toolbar: 'undo redo | blocks | ' +
                        'bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
            />
        </>
    );
}

export default TextFormat;