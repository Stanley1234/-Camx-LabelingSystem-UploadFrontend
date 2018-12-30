import React, {Component} from "react";
import PowerDropzone from "./PowerDropzone"
import {UPLOAD_SERVER} from "../utils/Constant";
import {readImageAsBase64EncodedString} from "../utils/FileUtils";
import {retrieveImageContentFromEncodedString} from "../utils/ImageUtils";

class ImageUpload extends Component {

    constructor(props) {
        super(props);
        this.state = {
            imageHandles: []
        };
        this.powerDropzone = React.createRef();

        this.updateImageName = this.updateImageName.bind(this);
        this.upload = this.upload.bind(this);
        ImageUpload.uploadSingle = ImageUpload.uploadSingle.bind(this);
    }


    static async uploadSingle(name, encodedStr) {
        try {
            const buffer = retrieveImageContentFromEncodedString(encodedStr);

            const response = await fetch(UPLOAD_SERVER, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    encodedImage: buffer
                })
            });

            const responseJson = await response.json();

            if (response.status !== 200) {
                console.error(responseJson.error);
            } else {
                console.log(responseJson.message);
            }
        } catch (e) {
            console.error(e);
        }
    }

     upload() {
        for (let i = 0; i < this.state.imageHandles.length; i ++) {
            const imageBlob = this.state.imageHandles[i];

            readImageAsBase64EncodedString(imageBlob, ((name) => {
                return encodedString => {
                    // noinspection JSIgnoredPromiseFromCall
                    ImageUpload.uploadSingle(name, encodedString);
                }
            })(imageBlob.name));
        }

        this.powerDropzone.current.clearImage();
        this.setState({
           imageHandles: []
        });
    }

    updateImageName(imageHandles) {
        this.setState({
           imageHandles: imageHandles
        });
    }

    render() {
        return (
            <div>
                <PowerDropzone
                    imageUpdateHandler = {this.updateImageName}
                    ref = {this.powerDropzone}
                />

                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: 'center'
                    }}>
                    <p>
                        <input
                            type="button"
                            value="upload"
                            onClick={this.upload}
                        />
                        <br/>
                        You will upload {this.state.imageHandles.length} images
                    </p>
                </div>
            </div>
        );
    }
}

export default ImageUpload;
