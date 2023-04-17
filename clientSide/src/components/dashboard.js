import * as React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../App.css'


export default function Album() {

    const [temperature, setTemp] = useState('');
    const [humidity, setHum] = useState('');
    const [dhtLastUpdate, setDhtLastUpdate] = useState('');
    const [SoilMoisture, setSoilMoisture] = useState('');
    const [token, setToken] = useState("");
    const [isRain, setIsRain] = useState('');
    const [SoilTemperature, setSoilTemp] = useState('');


    const naviagate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setToken('datatoken')
                const response = await axios.post(`http://localhost:3002/sensorApi/data`, { token });

                if (response.data.success) {
                    setTemp(response.data.temperature);
                    setHum(response.data.humidity);
                    setDhtLastUpdate(response.data.lastUpdate);
                }
                return (response.data.temperature);
            } catch (error) {
                console.log("Error");
            }
        }
        const SoilMoisture = async () => {
            try {
                setToken('datatoken')
                const response = await axios.post(`http://localhost:3002/sensorApi/SoilMoisture`, { token });

                if (response.data.success) {
                    setSoilMoisture(response.data.value);
                }
            } catch (error) {
                console.log("Error");
            }
        }
        const rainCheck = async () => {
            try {
                setToken('datatoken')
                const response = await axios.post(`http://localhost:3002/sensorApi/isRain`, { token });

                if (response.data.success) {
                    setIsRain(response.data.isRain);
                }
            } catch (error) {
                console.log("Error");
            }
        }
        const SoilTempSensor = async () => {
            try {
                setToken('datatoken')
                const response = await axios.post(`http://localhost:3002/sensorApi/send/soilTemp`, { token });

                if (response.data.success) {
                    setSoilTemp(response.data.value);
                }
            } catch (error) {
                console.log("Error");
            }

        }
        setInterval(() => {
            fetchData();
            SoilMoisture();
            rainCheck();
            SoilTempSensor();
        }, 50);
    }, [token]);


    return (
        <>
            <div className="section-a">

                <div className="section-aa">
                    <div className="box">
                        <div className="left">
                            <span className="span01">
                                Farm Monitoring
                            </span>
                            <div className="left-a">
                                Agriculture is a vital sector of the economy that has been transformed by modern technology. Smart agriculture is an innovative approach that uses advanced technologies to increase crop yields, reduce waste, and optimize resource usage. One of the key technologies used in smart agriculture is the Internet of Things (IoT).
                            </div>
                        </div>
                        <div className="right">
                            <div className="right-a">
                                <div id='temperature'>
                                    Temperature: {temperature}°C
                                </div>
                            </div>
                            <div className="right-b">
                                <div id='humidity'>
                                    Humidity: {humidity} %
                                </div>
                            </div>
                            <div className="right-c">
                                <div id='SoilMoisture'>
                                    Soil Moisture: {SoilMoisture}
                                </div>
                            </div>
                            <div className="right-d">
                                <div id='SoilTemp'>
                                    Soil Temperature: {SoilTemperature}°C
                                </div>
                            </div>
                            
                        </div>
                        <div className="lastUpdate">
                            Last update on: {dhtLastUpdate}
                        </div>
                    </div>
                </div>


            </div>
            {/* <div className="section-b">

            </div> */}
            {/* <div className="section-c">

            </div> */}
        </>

    );
}