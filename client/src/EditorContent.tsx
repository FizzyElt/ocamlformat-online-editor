import { Tabs } from "@chakra-ui/react";
import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";

import Editor from "./components/editor";
import { Config } from "./type";

interface EditorContentProps {
    config: Config;
}

const EditorContent = ({ config }: EditorContentProps): React.ReactNode => {
    const [content, setContent] = useState("");
    const [tab, setTab] = useState<string | null>("source");
    const [triggerKey, setTriggerKey] = useState<number>(0);
    const firstRef = useRef<boolean>(false);

    const deferContent = useDeferredValue(content);

    const formattedContent = useMemo(() => {
        const configEntries = Object.entries(config).filter(([_, value]) => value !== "");

        if (window.ocamlFmt.format) {
            try {
                const result = window.ocamlFmt.format(configEntries, deferContent);
                return result || "";
            } catch {
                return "";
            }
        }

        return "";
    }, [deferContent, config]);

    useEffect(() => {
        setTriggerKey((prev) => prev + 1);
    }, [formattedContent]);

    useEffect(() => {
        if (firstRef.current && content !== "") {
            setTab("formatted");
        } else {
            firstRef.current = true;
        }
    }, [config]);

    return (
        <Tabs.Root lazyMount size="lg" value={tab} onValueChange={(e) => setTab(e.value)} h="full">
            <Tabs.List>
                <Tabs.Trigger value="source">Source</Tabs.Trigger>
                <Tabs.Trigger value="formatted">Formatted</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="source" h="90dvh">
                <Editor
                    triggerKey={0}
                    boxSizing="content-box"
                    h="full"
                    codeContent={content}
                    onCodeChange={setContent}
                />
            </Tabs.Content>
            <Tabs.Content value="formatted" h="90dvh">
                <Editor
                    triggerKey={triggerKey}
                    boxSizing="content-box"
                    h="full"
                    readOnly
                    codeContent={formattedContent}
                    onCodeChange={() => {}}
                />
            </Tabs.Content>
        </Tabs.Root>
    );
};

export default EditorContent;
