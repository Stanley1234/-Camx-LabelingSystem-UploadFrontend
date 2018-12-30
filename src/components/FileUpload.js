import React, {Component} from "react";


class FileUpload extends Component {
    constructor(props) {
        super(props);
        this.uploadImage = React.createRef();
        this.handleUpload = this.handleUpload.bind(this);
    }

    uploadToServer(body) {
        fetch('http://localhost:8080/upload', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
            .then((response) => response.text())
            .then((response) => console.log(response))
            .catch((error) => console.log(error));
    }

    handleUpload() {
        const fileObj = this.uploadImage.current.files[0];
        const freader = new FileReader();
        var fileContent = '';
        var global = this;

        freader.readAsDataURL(fileObj);
        freader.onload = function() {
            fileContent = freader.result.split(",")[1];

            console.log("image name: " + fileObj.name);

            var body = {
                name: fileObj.name,
                encodedImage: fileContent
            };

            global.uploadToServer(body);
        };
    }

    render() {
        return (
            <div>
                <input id="file" ref={this.uploadImage} type="file" />
                <button onClick={this.handleUpload}>Upload</button>
            </div>
        );
    }
}

export default FileUpload;
