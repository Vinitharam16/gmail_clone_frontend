import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { Box, Checkbox, Typography, styled, List } from "@mui/material";
import { DeleteOutline, Star, StarBorder } from '@mui/icons-material';
import { routes } from "../routes/routes";
import Nomails from "./common/Nomails";
import { EMPTY_TABS } from "../constants/constant";


const Wrapper = styled(Box)({
    padding: '0 0 0 10px',
    backgroundColor: '#f2f6fc',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    '& >div': {
        display: 'flex',
        width: '100%',
        '& > p': {
            fontSize: '14px'
        }
    }
});

const Indicator = styled(Typography)({
    fontSize: '12px !important',
    background: '#ddd',
    color: '#222',
    padding: '0 4px',
    borderRadius: 4,
    marginRight: 6
});

const Date = styled(Typography)({
    marginLeft: 'auto',
    marginRight: 20,
    fontSize: 12,
    color: '#5F6368'
});



export default function Emails() {


    const [userEmail, setUserEmail] = useState([]);

    const [selectedEmails, setSelectedEmails] = useState([]);
    const [refreshScreen, setRefreshScreen] = useState(false);
    const [toggleStarredEmail, setToggleStarredEmail] = useState(false);

    const [moveEmailsToBin, SetMoveEmailsToBin] = useState([]);

    const { openDrawer } = useOutletContext();
    const navigate = useNavigate();
    
    const { type } = useParams();





    useEffect(() => {
        function fetchData() {
            fetch('http://localhost:5000/emails/sent')
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    setUserEmail(data);
                })
                .catch(error => console.error(error));
        }
        fetchData();
    }, []);

    const selectedAllEmails = (e) => {
        if (e.target.checked) {
            const emails = userEmail.map(email => email._id);
            setSelectedEmails(emails);

        } else {
            setSelectedEmails([]);

        }
    }

    const toggleStarredMails = (e) => {
        if(e.target.checked){
            const emails = userEmail.map(email => email.starred === true);
            setToggleStarredEmail(emails);
            console.log(emails);

        }else {
            setToggleStarredEmail([]);
        }

    }


    const deleteSelectedEmails = (e) => {
        userEmail.map(email => {
            if (email.type === 'bin') {
                let deletedmails = moveEmailsToBin.push(email);
                SetMoveEmailsToBin(deletedmails);
                console.log(deletedmails);
            } else {

            }
            setRefreshScreen(prevState => !prevState)
        })

    }



    return (
        <Box style={openDrawer ? { marginLeft: 250, width: 'calc(100%-250px)' } : { width: '100%' }}>
            <Box style={{ padding: '20px 10px 0 10px', display: 'flex', alignItems: 'center' }}>
                <Checkbox size="small"
                    onChange={(e) => selectedAllEmails(e)}
                />
                <DeleteOutline
                    onClick={(e) => deleteSelectedEmails(e)}
                />

            </Box>
            <List>
                {
                    userEmail.map((email, index) => (
                        <Wrapper>
                            <Checkbox
                                size="small"

                            />
                            {
                                email.starred ?
                                    <Star fontSize="small" style={{ marginRight: 10, color: '#FFF200' }} onClick={(e) => toggleStarredMails(e)} />
                                    :
                                    <StarBorder fontSize="small" style={{ marginRight: 10 }} onClick={(e) => toggleStarredMails(e)} />
                            }

                            <Box onClick={() => navigate(routes.view.path, { state: { email: email } })} key={index}>
                                <Typography style={{ width: 200, overflow: 'hidden' }}>
                                    {email.name}
                                </Typography>
                                <Indicator>
                                    Inbox
                                </Indicator>
                                <Typography>
                                    {email.subject}
                                </Typography>
                                <Date>
                                    {(new window.Date(email.date)).getDate()}
                                    {(new window.Date(email.date)).toLocaleString('default', { month: 'short' })}
                                </Date>
                            </Box>
                        </Wrapper>
                    ))

                }

            </List>
            {
                userEmail.length === 0 &&
                    <Nomails message={EMPTY_TABS[type]}/>
            }

        </Box>
    );
}
