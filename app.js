'use strict';

const RB = ReactBootstrap;
const renderer = new marked.Renderer();

const Editor = (props) => {
    return (
        <RB.Card>
            <RB.Card.Header>Editor</RB.Card.Header>
            <RB.Form.Control
                id="editor"
                as="textarea"
                style={{ height: '300px' }}
                value={ props.text }
                onChange={props.onChange}
            />
        </RB.Card>
    );
}

const Preview = (props) => {
    return (
        <RB.Card>
            {/* <RB.Card.Body> */}
                <RB.Card.Header>Preview</RB.Card.Header>
                <RB.Card.Text id="preview"
                    className="p-2"
                    dangerouslySetInnerHTML={{
                    __html: marked(props.text, {
                        gfm: true,
                        breaks: true
                    })
                }}></RB.Card.Text>
            {/* </RB.Card.Body> */}
        </RB.Card>
    );
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            markdown: `# h1
## h2
[google](www.google.com)
\` inline code \` 
\`\`\`
code block
\`\`\` 
- list 1
    - list 2

> block quote
![alt text](https://picsum.photos/seed/picsum/300/100 "Title")
***bold text***`
        };

        this.handleEditorChange = this.handleEditorChange.bind(this);
    }

    handleEditorChange(e) {
        this.setState({
            markdown: e.target.value
        });
    }

    render() {
        return (
            <RB.Container className="mt-5">
                <RB.Row>
                    <RB.Col md={12}>
                        <Editor text={this.state.markdown} onChange={this.handleEditorChange} />
                    </RB.Col>
                </RB.Row>
                <RB.Row className="mt-3">
                    <RB.Col md={12}>
                        <Preview text={this.state.markdown} />
                    </RB.Col>
                </RB.Row>
            </RB.Container>
        );
    }
}

ReactDOM.render(
    <App />, 
    document.getElementById('app')
);