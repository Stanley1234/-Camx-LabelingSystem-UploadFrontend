import React, {Component} from 'react'
import Dropzone from 'react-dropzone'

class PowerDropzone extends Component {

    constructor(props) {
        super(props);

        this.imageUploader = React.createRef();
        this.onDrop = this.onDrop.bind(this);
        this.clearImage = this.clearImage.bind(this);
    }


    onDrop(acceptedFiles) {
        // noinspection JSUnresolvedFunction
        this.props.imageUpdateHandler(acceptedFiles);
    }

    clearImage() {
        this.imageUploader.current.setState({
           acceptedFiles: [],
           draggedFiles: [],
           rejectedFiles: []
        });
    }

    render() {
        return (
            <div>
                <Dropzone
                    onDrop={this.onDrop}
                    ref={this.imageUploader}>

                    {({getRootProps, getInputProps, isDragActive}) => {
                        return (
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                {
                                    isDragActive ?
                                        <p>Drop files here...</p> :
                                        <p>Try dropping some files here, or click to select files to upload.</p>
                                }
                            </div>
                        )
                    }}
                </Dropzone>
            </div>
        );
    }
}

export default PowerDropzone;
