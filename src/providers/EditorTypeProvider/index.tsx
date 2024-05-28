import { createContext, FC, PropsWithChildren, useContext, useState } from 'react';

export enum EditorVariants {
    IMAGE = 'image',
    VIDEO = 'video',
};

export type EditorTypeContextState = {
    editorType: EditorVariants;
    onChangeEditorType: (type: EditorVariants) => void;
}

const EditorTypeContext = createContext<EditorTypeContextState>({} as EditorTypeContextState);

export const useEditorTypeContext = () => useContext(EditorTypeContext);

export const EditorTypeProvider: FC<PropsWithChildren> = ({ children }) => {
    const [editorType, setEditorType] = useState<EditorVariants>(EditorVariants.IMAGE);

    return (
        <EditorTypeContext.Provider value={{
            editorType,
            onChangeEditorType: setEditorType,
        }}>
            {children}
        </EditorTypeContext.Provider>
    )
}
