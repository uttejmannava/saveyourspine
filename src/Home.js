import * as tf from "@tensorflow/tfjs"
import * as posenet from "@tensorflow-models/posenet"
import Webcam from "react-webcam";
import { useRef, useState } from "react";

const Home = () => {
    const webcamRef = useRef(null)
    
    const [cameraPermission, setCameraPermission] = useState(false)
    const [posture, setPosture] = useState(null)

    const handleCameraAccess = () => {
        setCameraPermission(true)
    }

    const runPosenet = async () => {
        const net = await posenet.load({
            inputResolution: {width: 640, height: 480},
            scale: 0.5 //balance between accuracy and speed
        })

        setInterval(() => {
            detect(net)
        }, 5000)

    }

    const detect = async (net) => {
        if (typeof webcamRef.current !== 'undefined' && webcamRef.current !== null && webcamRef.current.video.readyState === 4) {
            const video = webcamRef.current.video
            const videoWidth = webcamRef.current.video.videoWidth
            const videoHeight = webcamRef.current.video.videoHeight 

            //force video dimensions
            webcamRef.current.video.width = videoWidth
            webcamRef.current.video.height = videoHeight

            //make detections with posenet
            const pose = await net.estimateSinglePose(video)

            //check if posture is good and update state accordingly
                //shoulders sloped weird
                //shoulders off screen (check score, same threshold as for drawKeypoints)
                //shoulders slouched

            const x1 = pose.keypoints[5].position.x;
            const y1 = pose.keypoints[5].position.y;

            const x2 = pose.keypoints[6].position.x;
            const y2 = pose.keypoints[6].position.y;

            const slope = Math.abs((y2-y1)/(x2-x1))

            //check for sitting straight and level
            const straightShoulders = (slope < 0.15)
            
            //general check for if shoulders are in frame; can catch other posture issues
            const shouldersVisible = (pose.keypoints[5].score > 0.2 || pose.keypoints[6].score > 0.2)
            
            //check for slouching; left and right shoulder not too close to edge of camera feed
            //const sittingUp = (pose.keypoints[5].position.x > videoWidth*0.25 && pose.keypoints[6].position.x < videoWidth*0.75)
            const sittingUp = Math.abs(pose.keypoints[0].position.y - ((y1+y2)/2)) > 5

            const goodPosture = (straightShoulders && shouldersVisible && sittingUp)

            const favicon = document.querySelector("link[rel='icon']")

            if (!goodPosture) {
                if (posture !== "SIT STRAIGHT 👹") {
                    setPosture("SIT STRAIGHT 👹")
                    document.title = "SIT STRAIGHT"
                    favicon.href = "/ogre.ico"
                }
            } else {
                if (posture !== "NICE ✅") {
                    setPosture("NICE ✅")
                    document.title = "GOOD JOB"
                    favicon.href = "/checkmark.ico"
                }
            }

            tf.dispose(pose)
            tf.disposeVariables()
        }
    }

    runPosenet()

    return (  
        <div className="home" id="home">
            { !cameraPermission && <div className="no-camera">waiting for camera permissions</div> } 
            <div className="camera-container">
                <Webcam ref={webcamRef} className="camera-feed" mirrored="true" onUserMedia={handleCameraAccess}/>
            </div>
            <div className="posture">
                <p className="posture-text">{posture}</p>
            </div>
            {posture && <div className="plug">a dumb web app by <a rel="noopener noreferrer" className="plug-link" href="https://www.linkedin.com/in/uttejmannava" target="_blank">uttej</a></div> }
        </div>
    );
}
 
export default Home;