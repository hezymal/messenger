import React from "react";
import { Group } from "components/atoms/Group";
import { TextArea } from "components/atoms/TextArea";
import { Cell, Grid } from "components/atoms/Grid";
import { IconButton } from "components/moleculus/IconButton";

interface Props {
    text: string;
    onTextChange: (newText: string) => void;
    onSubmit: () => void;
}

export const InputMessage: React.FC<Props> = ({
    text,
    onTextChange,
    onSubmit,
}) => {
    return (
        <Grid height={100}>
            <Cell width={93} height={100} borderRight>
                <TextArea
                    placeholder="Here type..."
                    value={text}
                    height={100}
                    onChange={onTextChange}
                />
            </Cell>
            <Cell width={7} height={100}>
                <Group direction="vertical">
                    <IconButton
                        size="square-lg"
                        color="primary"
                        leftIcon="paper-plane"
                        onClick={onSubmit}
                    />
                    <IconButton
                        size="square-lg"
                        leftIcon="file"
                        onClick={() => {}}
                    />
                </Group>
            </Cell>
        </Grid>
    );
};
