import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from '../../API/axios';
import RecordingBox from './RecordingBox/RecordingBox';

// TODO: Set 

function Record() {
    const [prompt, setPrompt] = useState('');
    const [desc, setDesc] = useState('');
    const [promptID, setPromptID] = useState('');

    const [validatedPrompt, setValidatedPrompt] = useState(false);
    const { prompt_id_url } = useParams();

    // Call database for prompt associated with promptid in queryParameters.
    useEffect(() => {
        if (Number.isInteger(Number(prompt_id_url)) && prompt_id_url !== null && !validatedPrompt) {
            try {
                axios.get('/api/getprompt?prompt_id=' + prompt_id_url).then((response) => {
                    if (response.data !== '') {
                        setValidatedPrompt(true);
                        setPromptID(response.data.prompt_id);
                        setPrompt(response.data.prompt);
                        setDesc(response.data.description);
                    }
                });
            } catch (e) {
                console.log("Axios fail :(")
            }
        }
    }, [])


    return (
        <div className='recordpage'>
            <h1>Record</h1>
            {validatedPrompt ?
                <RecordingBox prompt={prompt} desc={desc} promptid={promptID}/>
                :
                <>
                <p>Welcome to the record page! Since you didn't put a promptid in your url (or it's not valid for whatever reason), here are some instructions on how to record.</p>
                <ol>
                    <li>Contact your researcher and get the direct prompt link from them.</li>
                    <li>Review the prompt on the screen before beginning recording.</li>
                    <li>Click the large record button to begin recording. NOTE, you may have to grant permissions for your web browser to access your microphone.</li>
                    <h3>INSTRUCTIONS IMAGE HERE</h3>
                    <li>Once you're done recording, click the large record button to stop recording. If the timer runs out, the recording will stop automatically.</li>
                    <li>Enter the required information (denoted with an asterisk), then optionally fill out the remaining fields. The optional information will likely help the researcher.</li>
                    <li>Hit submit and you're done!</li>
                </ol>
                </>}
        </div>
    )
}

export default Record