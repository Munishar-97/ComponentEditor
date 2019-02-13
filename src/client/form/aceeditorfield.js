import React from "react";
import AceEditor from "react-ace";
import "brace/mode/c_cpp";
import "brace/theme/monokai";

export class AceEditorField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      detached: false,
      data: null
    }
  }

  componentDidUpdate(prevProps) {
    if ((!this.state.detached) && (this.props.formData != prevProps.formData))
      this.setState({ data: this.props.formData });
  }

  render() {
    return (
      <div className={this.props.classNames}>
        <AceEditor
          mode="c_cpp"
          theme="monokai"
          className={this.props.className}
          value={this.state.detached ? this.state.data : this.props.formData}
          name={this.props.id}
          onChange={value => {
            // detach and use internal state for content,
            // otherwise redrawing after any change impacts cursor position
            this.setState({ detached: true, data: value })
            this.props.onChange(value)
          }}
          setOptions={{
            showLineNumbers: true,
            tabSize: 2,
          }}
          minLines={7}
          maxLines={7}
          editorProps={{ $blockScrolling: true }}
          width="100%"
        />
      </div>
    );
  }
}