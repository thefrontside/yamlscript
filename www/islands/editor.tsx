import { useState, useRef, useEffect } from "preact/hooks";


const defaultYaml = `
$<>:
  - $Typography:
      variant: 'body1'
      children:
        "No links defined for this entity. You can add links to your entity YAML as shown in the highlighted example below:"
  - $div:
      className: 'whatever'
      children:
        $CodeSnippet:
          language: 'yaml'
          text: >-
            metadata:
              name: example
              links:
                - url: https://dashboard.example.com
                  title: My Dashboard
                  icon: dashboard
          showLineNumbers: true
          highlightedNumbers: [3, 4, 5, 6]
  - $Button:
      text: "Read More"
      variant: "contained"
      color: "primary"
      target: "_blank"
      href: "https://backstage.io/docs/features/software-catalog/descriptor-format#links-optional"
`.replace(/:$/m, ': ');




export function Editor() {

  let ref = useRef(null);
  const editor = useRef<any>(null)
  const [value, setYaml] = useState<string | undefined>(defaultYaml);
  const __prevent_trigger_change_event = useRef<boolean | null>(null);
  const _subscription = useRef<any>(null);


  let lib = useAsync(async () => {
    if (ref.current) {
      let mod = await import(`${monacoSrc}`);

      self.MonacoEnvironment = {
        getWorker: function (moduleId, label) {
          console.dir({ moduleId, label });
          return new Worker(`./worker.js?label=${label}`, { type: 'module' });
        },
      }

      editor.current = mod.editor.create(ref.current, {
        language: 'yaml',
        readonly: false,
        hover: true,
        schemas: [],
        validate: false,
        value,
        minimap: {
          enabled: false,
        },

      });


      return mod;
    } else {
      return await new Promise(() => { });
    }
  }, [ref])

  useEffect(() => {
    if (editor.current) {
      /* editor.current.layout({
       *   height: window.innerHeight / 2,
       *   width: window.innerWidth / 2
       * }) */
      _subscription.current = editor.current.onDidChangeModelContent(() => {
        if (!__prevent_trigger_change_event.current) {
          setYaml(editor.current.getValue());
        }
      });
    }
  }, [editor.current]);

  useEffect(() => {
    if (editor.current) {
      const model = editor.current.getModel();
      __prevent_trigger_change_event.current = true;
      editor.current.pushUndoStop();

      // pushEditOperations says it expects a cursorComputer, but doesn't seem to need one.
      model.pushEditOperations(
        [],
        [
          {
            range: model.getFullModelRange(),
            text: value,
          },
        ],
        undefined
      );
      editor.current.pushUndoStop();
      __prevent_trigger_change_event.current = false;
    }
  }, [value]);

  useEffect(
    () => () => {
      if (editor.current) {
        editor.current.dispose();
        const model = editor.current.getModel();
        if (model) {
          model.dispose();
        }
      }
      if (_subscription.current) {
        _subscription.current.dispose();
      }
    },
    []
  );

  return (
    <div ref={ref} class="h-full">
      {lib.type === 'pending' && <>Loading...</>}
      {lib.type === 'rejected' && String(lib.error)}
    </div>
  )
}

export default Editor;
