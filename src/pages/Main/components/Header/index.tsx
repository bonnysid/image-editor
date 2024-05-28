import {FC} from 'react';
import * as ST from './styled';
import {EditorVariants, useEditorTypeContext} from "@src/providers/EditorTypeProvider";
import {Button} from "@src/components";

export const Header: FC = () => {
    const { editorType, onChangeEditorType } = useEditorTypeContext();

    const handleClickImage = () => {
        if (editorType !== EditorVariants.IMAGE) {
            onChangeEditorType(EditorVariants.IMAGE)
        }
    }

    const handleClickVideo = () => {
        if (editorType !== EditorVariants.VIDEO) {
            onChangeEditorType(EditorVariants.VIDEO)
        }
    }

    return (
        <ST.Wrapper>
            <Button text="Изображение" onClick={handleClickImage} isGroupItem isFirst isActive={editorType === EditorVariants.IMAGE} />
            <Button text="Видео" onClick={handleClickVideo} isGroupItem isActive={editorType === EditorVariants.VIDEO}/>
        </ST.Wrapper>
    )
}
