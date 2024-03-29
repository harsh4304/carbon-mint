import React,{useState,useEffect} from 'react'
import './profile.css'
import Header from '../../Components/Header';
import Sidebar from '../../Components/Sidebar';
import Link from '@mui/material/Link';
import { Avatar, Badge, Button } from '@mui/material'
import { Grid } from '@mui/material'
import { Breadcrumbs, Typography } from '@mui/material'
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import BusinessIcon from '@mui/icons-material/Business';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import BadgeIcon from '@mui/icons-material/Badge';
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import Box from '@mui/material/Box';

import avatar from '../../assets/images/Operators/avatar.png'
import noacrs from '../../assets/images/DashBoard/noacrs.png'
import no_of_crops from '../../assets/images/Operators/no_of_crops.png'
import events from '../../assets/images/Operators/events.png'
import sourgham from '../../assets/images/Operators/sourgham.png'
import finger_millet from '../../assets/images/Operators/finger_millet.png'
import Banner from '../../assets/images/Operators/Banner.png'
import * as action from '../../Services/Operator/actions';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

function Profile({fetchOperator}) {
    const navigate = useNavigate();
    const { id } = useParams();
    const { opid } = useParams();

    const [operators, setOperators] = useState([]);
    const [approved, setApproved] = useState(false)
    useEffect(() => {
        fetchOperator()
            .then((data) => {
                const approved = data.filter((p) => p.status === "Approved" && p.id === parseInt(id, 10));
                const pending = data.filter((p) => p.status === "Pending" && p.id === parseInt(id, 10));
                if (approved.length != 0) {
                    setOperators(approved);
                    setApproved(true)
                }
                else {
                    setOperators(pending);
                }

                console.log(approved);

            })
            .catch(err => console.log(err))

    }, [operators]);
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        color: theme.palette.text.secondary,
    }));

    const handleApprove = (id, status) => {
        // updateLandParcelStatus(id, status);
        navigate('/operator')

    }

    return (
        <>
            <Header />
            <Sidebar />
            {operators.map((owners, index) => (
            <Box sx={{ margin: '100px 20px 50px 300px' }}>
                <Grid container>
                    <Grid xs={8}>
                        <Breadcrumbs sx={{
                            textDecoration: 'none'
                        }}
                            separator={<NavigateNextIcon fontSize="small" />}
                            aria-label="breadcrumb">

                            <Link underline='hover' color='inherit' href="/operator">Operator</Link>
                            <Link underline='hover' color='inherit' href="/operator/profile">Profile</Link>

                        </Breadcrumbs>
                        <div className='title'>
                            <Typography variant='p'>Profile</Typography>
                        </div>
                    </Grid>
                    <Grid xs={2}>
                            {approved ? (<></>) : (<Button variant='contained'
                                sx={{
                                    width: '100%',
                                    fontSize: '12px',
                                    height: '40px',
                                    color: 'black',
                                    background: 'rgba(140, 216, 103, 1)',
                                    border: '1px solid black',
                                    borderRadius: '5px',
                                }} onClick={() => { handleApprove(owners.id, "Approved") }}>Approve</Button>)}

                        </Grid>
                    <Grid xs={2}>
                        <Button variant='contained'
                            sx={{
                                ml: 2,
                                fontSize: '12px',
                                height: '40px',
                                color: 'black',
                                background: 'rgba(140, 216, 103, 1)',
                                border: '1px solid black',
                                borderRadius: '5px',
                            }}>Add Land Parcel</Button>

                    </Grid>

                </Grid>

                <Grid container sx={{ mt: 3 }} className='cards3'>
                    <Grid xs={4.5} sx={{ mb: 5 }}>
                        <Item sx={{ boxShadow: '0px 0px 12px 0px #0000001F', paddingBottom: 2 }}>
                            <div className='profile-grid'>
                                <Badge color='success' badgeContent=" " size="large"
                                    className='badge'
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    }}></Badge><Avatar className='avatar'><img src={avatar}></img></Avatar>
                                <Typography variant='p' className='name'>{owners.name}</Typography>
                                <Typography variant='p' className='id'>{owners.ownerID}</Typography>
                                <Grid container sx={{ mt: 3, textAlign: 'center' }}>
                                    <Grid xs={4} className='n'>
                                        <Typography variant='p' fontWeight='bold'>{owners.acres}</Typography>
                                    </Grid>
                                    <Grid xs={4} className='n'>
                                        <Typography variant='p' fontWeight='bold'>{owners.total_landparcels}</Typography>
                                    </Grid>
                                    <Grid xs={4} className='n'>
                                        <Typography variant='p' fontWeight='bold'>{owners.total_crops}</Typography>
                                    </Grid>
                                </Grid>

                                <Grid container sx={{ textAlign: 'center' }}>
                                    <Grid xs={4} className='t'>
                                        <Typography variant='p'>Acres</Typography>
                                    </Grid>
                                    <Grid xs={4} className='t'>
                                        <Typography variant='p'>Landparcels</Typography>
                                    </Grid>
                                    <Grid xs={4} className='t'>
                                        <Typography variant='p'>Crops</Typography>
                                    </Grid>

                                </Grid>
                            </div>
                            <hr style={{ margin: '20px' }} />

                            <div className='contact'>

                                <Typography className='title' variant='p'>Contact</Typography>
                                <div className='address-details'>
                                    <Button sx={{ color: 'black' }}><BusinessIcon /></Button>
                                    <div>
                                        <Typography variant='p' sx={{ fontWeight: 'bold', fontSize: '15px' }}>Address</Typography><br />
                                        <Typography variant='p'>{owners.house_no}, {owners.village}, {owners.district}, {owners.state}, {owners.country} - {<br/>} {owners.postal_code}</Typography>
                                    </div>
                                </div>
                                <div className='contact-details'>
                                    <Button sx={{ color: 'black' }}><SmartphoneIcon /></Button>
                                    <div>
                                        <Typography variant='p' sx={{ fontWeight: 'bold', fontSize: '15px' }}>Contact</Typography><br />
                                        <Typography variant='p'>{owners.contact_number_1}</Typography>
                                    </div>
                                </div>
                                <div className='email-details'>
                                    <Button sx={{ color: 'black' }}><AlternateEmailIcon /></Button>
                                    <div>
                                        <Typography variant='p' sx={{ fontWeight: 'bold', fontSize: '15px' }}>Mail</Typography><br />
                                        <Typography variant='p'>{owners.email_id}</Typography>
                                    </div>
                                </div>
                            </div>
                            <hr style={{ margin: '20px' }} />

                            <div className='documents'>
                                <Typography variant='p' className='title'>Documents</Typography>
                                <div className='aadhar'>
                                    <Button sx={{ color: 'black' }}><BadgeIcon /></Button>
                                    <div>
                                        <Typography variant='p' sx={{ fontWeight: 'bold', fontSize: '15px' }}>Aadhar</Typography><br />
                                        <Typography variant='p'>{owners.aadhar_no}</Typography>
                                    </div>
                                    <div style={{marginLeft:'30px'}}>
                                        <Typography variant='p' sx={{ fontWeight: 'bold', fontSize: '15px' }}>Passbook Ref No</Typography><br />
                                        <Typography variant='p'>{owners.passbook_refno}</Typography>
                                    </div>
                                </div>
                            </div>
                            <hr style={{ margin: '20px' }} />

                            <div className='details'>
                                <Typography variant='p' className='title'>Details</Typography>
                                <div className='fathername'>
                                    <Typography variant='p'>Father's name</Typography>
                                    <b><Typography variant='p'>{owners.father_name}</Typography></b>

                                </div>
                                <div className='familysize'>
                                    <Typography variant='p'>Family size</Typography>
                                    <b><Typography variant='p'>{owners.family_size}</Typography></b>

                                </div>
                                <div className='farming'>
                                    <Typography variant='p'>Total ex. in farming</Typography>
                                    <b><Typography variant='p'>{owners.total_farming_exp_year} years</Typography></b>

                                </div>
                                <div className='organic-farming'>
                                    <Typography variant='p'>Ex. in organic farming</Typography>
                                    <b><Typography variant='p'>{owners.organic_farming_exp_year} years</Typography></b>

                                </div>
                            </div>
                        </Item>

                    </Grid>

                    <Grid xs={2.3}>
                        <Item sx={{ boxShadow: '0px 0px 12px 0px #0000001F' }}>
                            <div className='no-of-landparcels'>
                                <Avatar><img src={noacrs}></img></Avatar>
                                <div>
                                    <Typography className='content'>No. Landparcels</Typography>
                                    <Typography className='content'><b>{owners.total_landparcels}</b></Typography>
                                </div>
                            </div>

                        </Item>

                    </Grid>
                    <Grid xs={2.3}>
                        <Item sx={{ boxShadow: '0px 0px 12px 0px #0000001F' }}>
                            <div className='no-of-crops'>
                                <Avatar><img src={no_of_crops}></img></Avatar>
                                <div>
                                    <Typography className='content'>No. Crops</Typography>
                                    <Typography className='content'><b>{owners.total_crops}</b></Typography>
                                </div>
                            </div>

                        </Item>

                    </Grid>
                    <Grid xs={2.3}>
                        <Item sx={{ boxShadow: '0px 0px 12px 0px #0000001F' }}>
                            <div className='no-of-events'>
                                <Avatar><img src={events}></img></Avatar>
                                <div>
                                    <Typography className='content'>Events</Typography>
                                    <Typography className='content'><b>1</b></Typography>
                                </div>
                            </div>
                        </Item>
                    </Grid>



                    <div className='landparcels-cards'>
                        <div className='landparcel'><Typography variant='p'>Land parcels</Typography></div>
                        <Grid container sx={{ml:1}}>

                            <Grid xs={6}>
                                <Link href={'/operator/'+`${id}`+'/profile/landparcel'} style={{ textDecoration: 'none' }}>
                                    <div className="grid-upper-profile">
                                        <img src={Banner}></img>
                                    </div >
                                    <Item className='grid-lower-profile' sx={{ boxShadow: '0px 0px 12px 0px #0000001F' }}>
                                        <div>
                                            <div style={{ display: 'grid', justifyContent: 'center' }}>

                                                <b><Typography variant='p'>Chennaiah polam - Sy.no:33/95</Typography></b>
                                                <Typography variant='p'>Megya Thanda, Rangareddy, Hyderabad</Typography>
                                            </div>
                                            <Grid container sx={{ textAlign: 'center', mt: 3 }}>
                                                <Grid xs={4}>
                                                    <Typography variant='p' className='n'><b>14</b></Typography>
                                                </Grid>
                                                <Grid xs={4}>
                                                    <Typography variant='p' className='n'><b>8</b></Typography>
                                                </Grid>
                                                <Grid xs={4}>
                                                    <Typography variant='p' className='n'><b>8</b></Typography>
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
                                                    <Typography variant='p' className='t'>Area Leased</Typography>
                                                </Grid>

                                            </Grid>

                                            <Grid container>
                                                <Grid xs={12}>
                                                    <Item className='crops-operators'>
                                                        <Avatar><img src={sourgham}></img></Avatar>
                                                        <div style={{ display: 'grid' }}>
                                                            <Typography variant='p'><b>Sourgham</b></Typography>
                                                            <Typography variant='p' className='text'>Corner Field</Typography>
                                                        </div>
                                                        <Typography variant='p' className='no-of-events'>12 events</Typography>
                                                    </Item>

                                                </Grid>
                                                <Grid xs={12}>
                                                    <Item className='crops-operators'>
                                                        <Avatar><img src={finger_millet}></img></Avatar>
                                                        <div style={{ display: 'grid' }}>
                                                            <Typography variant='p'><b>Finger Millet</b></Typography>
                                                            <Typography variant='p' className='text'>Lake Edge Field</Typography>
                                                        </div>
                                                        <Typography variant='p' className='no-of-events'>20 events</Typography>
                                                    </Item>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </Item>
                                </Link>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
            </Box >
            ))}
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        landOwners: state.landowners.landowners,
        // onboarding: state.onboarding.onboarding,
    };
};

const mapDispatchToProps = {
    fetchOperator: () => action.fetchOperator(),
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);