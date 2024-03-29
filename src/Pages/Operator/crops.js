import React, { useState, useEffect } from 'react'
import Header from '../../Components/Header'
import Sidebar from '../../Components/Sidebar'
import './crops.css'
import Link from '@mui/material/Link';
import { Button } from '@mui/material'
import { Grid } from '@mui/material'
import { Typography } from '@mui/material'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import DoneIcon from '@mui/icons-material/Done';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit'


import field_area_map from '../../assets/images/Operators/field_area_map.png'
import Banner_crops_2 from '../../assets/images/Operators/Banner_crops_2.png'
import irrigation from '../../assets/images/Operators/irrigation.png'
import { fetchAddedEvents } from '../../Services/Events/actions';
import { connect } from 'react-redux';
import { GoogleMap, LoadScript, Polygon, Marker } from '@react-google-maps/api';

import { fetchCrops } from '../../Services/Operator/actions';
import { useParams, useLocation } from 'react-router-dom';

const apiKey = 'AIzaSyCg8i1Q_GVHIXChAbBgQerjyUgfNBvRfks';
const dots1 = [
    { lat: 20.5937, lng: 78.9629 },
    { lat: 20.5937, lng: 80.9629 },
    { lat: 21.9937, lng: 80.9629 },
    { lat: 21.9937, lng: 78.9629 },
    { lat: 20.5937, lng: 78.9629 }
];
const dots2 = [
    { lat: 20.5937, lng: 80.9629 },
    { lat: 20.5937, lng: 82.9629 },
    { lat: 21.9937, lng: 82.9629 },
    { lat: 21.9937, lng: 80.9629 },
    { lat: 20.5937, lng: 80.9629 }
];
const path1 = dots1.map(dot => ({ lat: dot.lat, lng: dot.lng }));
const path2 = dots2.map(dot => ({ lat: dot.lat, lng: dot.lng }));
const totalLat = dots2.reduce((sum, coord) => sum + coord.lat, 0);
const totalLng = dots2.reduce((sum, coord) => sum + coord.lng, 0);
const avgLat = totalLat / dots2.length;
const avgLng = totalLng / dots2.length;

// Center point
const whiteMarkerIcon = {
    url: 'https://maps.google.com/mapfiles/kml/paddle/wht-circle.png',
    // scaledSize: new window.google.maps.Size(32, 32),
};
function Crops({ fetchAddedEvents, fetchCrops }) {
    const { cropid } = useParams();
    const { id } = useParams();
    const location = useLocation();


    const [addedevents, setaddedEvents] = useState([])
    const [crops, setCrops] = useState([]);

    const Item = styled(Paper)(({ theme }) => ({
        // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        color: theme.palette.text.secondary,
    }));
    useEffect(() => {
        fetchAddedEvents()
            .then((data) => {
                setaddedEvents(data);
            })
            .catch(err => console.log(err));

        fetchCrops()
            .then((data) => {
                console.log(data);
                const cropsdata = data.filter((p) => p.id === parseInt(cropid, 10));
                setCrops(cropsdata);
                console.log(crops);
            })
            .catch(err => console.log(err))
    }, []);
    const generateGridEvents = () => {
        return addedevents.map((event, index) => (
            <Grid xs={6}>
                <Link href={'/events/add-event' + `/${event.id}`} sx={{ textDecoration: 'none', color: 'black' }}>

                    <Item className='seed' sx={{ background: '#ebeaea1f' }}>
                        <div style={{ display: 'grid' }}>
                            <Typography variant='p' sx={{ fontWeight: 'bold' }}>{event.event_group}</Typography>
                            <Typography variant='p'>Submited on {event.date}, {event.time}</Typography>
                        </div>
                        <DoneIcon sx={{ color: 'green' }} className='doneicon' />
                    </Item>
                </Link>
            </Grid>
        ))
    }

    const generateCrops = () => {
        return crops.map((crop, index) => (
            <Item sx={{ boxShadow: '0px 0px 12px 0px #0000001F', paddingBottom: 2 }}>
                <div className='sourgham-details'>

                    <img src={Banner_crops_2}></img>
                    <Typography variant='p' className='name'>{crop.crop_name}</Typography>
                    <Typography variant='p' className='address'>{crop.landparcel_name}</Typography>
                    <Link href={'/operator/profile/landparcel/add-crops/' + `${crop.id}`} style={{ textDecoration: "none", color: "black" }}><EditIcon sx={{ "&:hover": { color: 'blue' }, cursor: 'pointer', ml: 20, mt: -8, position: 'absolute' }} /></Link>
                    <Grid container sx={{ mt: 3, textAlign: 'center' }}>
                        <Grid xs={4}>
                            <Typography variant='p' className='n'><b>{crop.acres}</b></Typography>
                        </Grid>
                        <Grid xs={4}>
                            <div>
                                <Typography variant='p' className='n'><b>{crop.area_owned}</b></Typography>
                            </div>
                        </Grid>
                        <Grid xs={4}>
                            <div>
                                <Typography variant='p' className='n'><b>{crop.crop_age}</b></Typography>
                            </div>
                        </Grid>
                    </Grid>

                    <Grid container sx={{ textAlign: 'center' }}>
                        <Grid xs={4}>
                            <Typography variant='p' className='t'>Acres</Typography>
                        </Grid>
                        <Grid xs={4}>
                            <Typography variant='p' className='t'>Area Owned</Typography>
                        </Grid>
                        <Grid xs={4}>
                            <Typography variant='p' className='t'>Crop age</Typography>
                        </Grid>

                    </Grid>
                </div>
                <hr style={{ margin: '20px' }} />

                <div className='details'>
                    <Typography variant='p' className='title'>Details</Typography>

                    <div className='content'>
                        <Typography variant='p'>Cropping systems</Typography>
                        <b><Typography variant='p'>{crop.cropping_systems}</Typography></b>

                    </div>
                    <div className='content'>
                        <Typography variant='p'>Water resources</Typography>
                        <b><Typography variant='p'>{crop.water_resources}</Typography></b>

                    </div>
                    <div className='content'>
                        <Typography variant='p'>Water Sample Test</Typography>
                        <b><Typography variant='p'>{crop.water_sample_test}</Typography></b>

                    </div>
                    <div className='content'>
                        <Typography variant='p'>Irrigation Status</Typography>
                        <b><Typography variant='p'>{crop.irrigation_status}</Typography></b>

                    </div>

                </div>
            </Item>
        ))
    }


    return (
        <>
            <Header />
            <Sidebar />
            <Box sx={{ margin: '100px 20px 50px 300px' }}>
                <Grid container>
                    <Grid xs={10}>
                        <Breadcrumbs sx={{
                            textDecoration: 'none'
                        }}
                            separator={<NavigateNextIcon fontSize="small" />}
                            aria-label="breadcrumb">

                            <Link underline='hover' color='inherit' href="/operator">Operator</Link>
                            <Link underline='hover' color='inherit' href={'/operator/' + `${id}` + '/profile'}>Profile</Link>
                            <Link underline='hover' color='inherit' href={'/operator/' + `${id}` + '/profile/landparcel'}>Landparcel</Link>
                            <Link underline='hover' color='inherit' href={'/operator/' + `${id}` + '/profile/landparcel/crops'}>Crops</Link>


                        </Breadcrumbs>
                        <div className='title'>
                            <Typography variant='p'>Chennaiah Polam</Typography>
                        </div>
                    </Grid>
                    <Grid xs={2}>
                        <Link href='/events/add-event/0' sx={{ textDecoration: 'none' }}>
                            <Button variant='contained'
                                sx={{

                                    fontSize: '12px',
                                    height: '40px',
                                    color: 'black',
                                    background: 'rgba(140, 216, 103, 1)',
                                    border: '1px solid black',
                                    borderRadius: '5px',
                                    width: '100%'
                                }}>Add Events</Button>
                        </Link>
                    </Grid>
                </Grid>


                <Grid container sx={{ mt: 3 }}>
                    <Grid xs={4.5} sx={{ mb: 5 }}>
                        {generateCrops()}

                    </Grid>
                    <Grid xs={7.5}>
                        <Grid xs={12}>
                            <div sx={{ boxShadow: '0px 0px 12px 0px #0000001F', paddingBottom: 2, ml: 2 }}>
                                <div style={{ height: '300px', marginLeft: '20px' }}>

                                    <LoadScript googleMapsApiKey={apiKey}>
                                        <GoogleMap
                                            mapContainerStyle={{ height: '100%', width: '100%' }}
                                            center={{ lat: 20.5937, lng: 78.9629 }}
                                            zoom={6}
                                            options={{ mapTypeId: 'satellite' }}
                                        >
                                            <Polygon
                                                path={path1}
                                                options={{
                                                    strokeColor: 'yellow',
                                                    strokeOpacity: 0.8,
                                                    strokeWeight: 2,
                                                }}
                                            />

                                            {dots1.map((dot, index) => (
                                                <div key={index} position={{ lat: dot.lat, lng: dot.lng }} />
                                            ))}
                                            <Polygon
                                                path={path2}
                                                options={{
                                                    strokeColor: 'yellow',
                                                    strokeOpacity: 0.8,
                                                    strokeWeight: 2,
                                                    fillColor: 'lightgreen',
                                                    fillOpacity: 0.20
                                                }}
                                            />

                                            {dots2.map((dot, index) => (
                                                <div key={index} position={{ lat: dot.lat, lng: dot.lng }} />
                                            ))}
                                            <Marker position={{ lat: avgLat, lng: avgLng }}
                                                label={{
                                                    text: 'Seed and Seedlings',
                                                    color: 'black',
                                                    fontWeight: 'bold',
                                                    className: 'marker-label'
                                                }}
                                                icon={whiteMarkerIcon}
                                            />

                                        </GoogleMap>
                                    </LoadScript>


                                </div>                            </div>
                        </Grid>
                        <Grid xs={12}>
                            <div className='crops-heading'><Typography variant='p'>Draft</Typography></div>

                            <Grid container>
                                <Grid xs={6}>
                                    <Item className='irrigation'>
                                        <div style={{ display: 'grid' }}>
                                            <b><Typography variant='p'>Irrigation</Typography></b>
                                            <Typography variant='p'>Last updated on 24/04/2022, 4:30pm</Typography>
                                        </div>
                                        <img src={irrigation}></img>
                                    </Item>
                                </Grid>
                            </Grid>

                            <div className='submitted-events-title'><Typography variant='p'>Submitted Events</Typography></div>

                            <Grid container>
                                {generateGridEvents()}

                            </Grid>
                        </Grid>
                    </Grid>


                </Grid>
            </Box>
        </>
    )
}

const mapStateToProps = (state) => {
    return {

        events: state.events.events
    };
};

const mapDispatchToProps = {
    fetchCrops: () => fetchCrops(),
    fetchAddedEvents: () => fetchAddedEvents(),
}

export default connect(mapStateToProps, mapDispatchToProps)(Crops);