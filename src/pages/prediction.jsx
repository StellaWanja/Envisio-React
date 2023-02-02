// import { useState } from 'react';
import { useContext } from 'react';
import { AppContext } from '../components/stateprovider';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import LeftSideBar from '../components/left-side-bar';
import RightSideBar from '../components/right-side-bar';
import '../styles/prediction.css';
import swal from 'sweetalert';

function Prediction() {

    const { handleSubmit } = useForm();
    const context = useContext(AppContext);
    const navigate = useNavigate();

    console.log(context.state.currentPatient.id);


    const predictionHandler = ({ radiusmean, texturemean, perimetermean, areamean, compactnessmean, concavitymean, perimeterse, arease, radiusworst, textureworst, perimeterworst, areaworst, compactnessworst, concavityworst }) => {
        // create data to be sent to the api for validation
        let userinput = {
            RadiusMean: radiusmean,
            TextureMean: texturemean,
            PerimeterMean: perimetermean,
            AreaMean: areamean,
            CompactnessMean: compactnessmean,
            ConcavityMean: concavitymean,
            PerimeterSe: perimeterse,
            AreaSe: arease,
            RadiusWorst: radiusworst,
            TextureWorst: textureworst,
            PerimeterWorst: perimeterworst,
            AreaWorst: areaworst,
            CompactnessWorst: compactnessworst,
            ConcavityWorst: concavityworst
        };

        fetch(
            'https://envisio-api.up.railway.app/api/v1/PredictionTest', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                "Authorization" : `Bearer ${context.state.userData.token}`
            },
            body: JSON.stringify(userinput),
        })

            .then(res => res.text())
            .then(result => {
                console.log(result)

                context.dispatch({
                    type: "ADD_RESULT",
                    payload: result,
                })
               navigate("/prediction-result")
            })
            .catch((err) => {
                swal({
                    title: 'Error!',
                    text: "Unable to complete request. Please try again after some time",
                    icon: "error",
                    button: "Close",
                });
				console.log({ err });
            });
    };


    return (
        <>
            <div className="dashboard-container">
                <LeftSideBar />

                <div className="prediction-page-container">
                    <div>
                        <h2>Prediction Test</h2>
                        <p>Please fill the form below for your prediction.
                            Note that this is a sample application <br /> and cannot be used as a substitute for real medical advice.</p>
                    </div>

                    <form className="prediction-form" onSubmit={handleSubmit(predictionHandler)}>
                        <div className="prediction-form-grid-container">
                            <div className="prediction-input-container">
                                <label>RADIUS-MEAN</label>
                                <input className="prediction-input" type='number' name='radiusmean' step='0.01' required />
                            </div>
                            <div className="prediction-input-container">
                                <label>TEXTURE-MEAN</label>
                                <input className="prediction-input" type='number' name='texturemean' step='0.01' required />
                            </div>
                            <div className="prediction-input-container">
                                <label>PERIMETER-MEAN</label>
                                <input className="prediction-input" type='number' name='perimetermean' step='0.01' required />
                            </div>
                            <div className="prediction-input-container">
                                <label>AREA-MEAN</label>
                                <input className="prediction-input" type='number' name='areamean' step='0.01' required />
                            </div>
                            <div className="prediction-input-container">
                                <label>COMPACTNESS-MEAN</label>
                                <input className="prediction-input" type='number' name='compactnessmean' step='0.01' required />
                            </div>
                            <div className="prediction-input-container">
                                <label>CONCAVITY-MEAN</label>
                                <input className="prediction-input" type='number' name='concavitymean' step='0.01' required />
                            </div>
                            <div className="prediction-input-container">
                                <label>PERIMETER-SE</label>
                                <input className="prediction-input" type='number' name='perimeterse' step='0.01' required />
                            </div>
                            <div className="prediction-input-container">
                                <label>AREA-SE</label>
                                <input className="prediction-input" type='number' name='arease' step='0.01' required />
                            </div>
                            <div className="prediction-input-container">
                                <label>RADIUS-WORST</label>
                                <input className="prediction-input" type='number' name='radiusworst' step='0.01' required />
                            </div>
                            <div className="prediction-input-container">
                                <label>TEXTURE-WORST</label>
                                <input className="prediction-input" type='number' name='textureworst' step='0.01' required />
                            </div>
                            <div className="prediction-input-container">
                                <label>PERIMETER-WORST</label>
                                <input className="prediction-input" type='number' name='perimeterworst' step='0.01' required />
                            </div>
                            <div className="prediction-input-container">
                                <label>AREA-WORST</label>
                                <input className="prediction-input" type='number' name='areaworst' step='0.01' required />
                            </div>
                            <div className="prediction-input-container">
                                <label>COMPACTNESS-WORST</label>
                                <input className="prediction-input" type='number' name='compactnessworst' step='0.01' required />
                            </div>
                            <div className="prediction-input-container">
                                <label>CONCAVITY-WORST</label>
                                <input className="prediction-input" type='number' name='concavityworst' step='0.01' required />
                            </div>
                        </div>
                        <div>
                            <button className="form-submit" id="prediction-submit-btn" type='submit'>
                                Get Result</button>
                        </div>

                    </form>
                </div>

                <RightSideBar />
            </div>
        </>
    )
}

export default Prediction;