import { FC } from 'react';
import * as ST from './styled';
import { Header, Image, Info } from '@pages/Main/components';
import { VideoPlayer } from '@components/VideoPlayer';
import VideoProcessor from "@components/VideoProcessor";
import {EditorVariants, useEditorTypeContext} from "@src/providers/EditorTypeProvider";
import {Video} from "@pages/Main/components/Video";

const Main: FC = () => {
  const { editorType } = useEditorTypeContext();

  return (
    <ST.Wrapper>
      <Header />
      <ST.Content>
        <Info />
        <ST.ImageContent>
          {editorType === EditorVariants.IMAGE && <Image/>}
          {editorType === EditorVariants.VIDEO && <Video/>}
        </ST.ImageContent>
      </ST.Content>
    </ST.Wrapper>
  )
}



export default Main;
