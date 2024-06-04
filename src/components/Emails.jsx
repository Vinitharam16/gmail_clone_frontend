import React, { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { Box, Checkbox, List } from "@mui/material";
import { DeleteOutline } from '@mui/icons-material';
import Nomails from "./common/Nomails";
import { EMPTY_TABS } from "../constants/constant";
import useApi from "../hooks/useApi";
import { API_URLS } from "../services/api.urls";
import Email from "./Email";


export default function Emails() {

    const [starredEmail, setStarredEmail] = useState(false);
    const [selectedEmails, setSelectedEmails] = useState([]);

    const { openDrawer } = useOutletContext();
    const { type } = useParams();

    const getEmailsService = useApi(API_URLS.getEmailFromType);
    const deleteEmailService = useApi(API_URLS.deleteEmails);
    const moveEmailsToBin = useApi(API_URLS.moveEmailsToBin);

    useEffect(() => {
        getEmailsService.call({}, type);
    }, [type, starredEmail])

    const selectedAllEmails = (e) => {
        if (e.target.checked) {
            const emails = getEmailsService?.response?.map(email => email._id)
            setSelectedEmails(emails);
        } else {
            setSelectedEmails([]);
        }
    }

    const deleteSelectedEmails = (e) => {
        if (type === 'bin') {
            deleteEmailService.call(selectedEmails);
        } else {
            moveEmailsToBin.call(selectedEmails);
        }
        setStarredEmail(prevState => !prevState);
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
                    getEmailsService?.response?.map(email => (
                        <Email
                            email={email}
                            key={email.id}
                            setStarredEmail={setStarredEmail}
                            selectedEmails={selectedEmails}
                            setSelectedEmails={setSelectedEmails}
                        />
                    ))
                }
            </List>
            {
                getEmailsService?.response?.length === 0 &&
                <Nomails message={EMPTY_TABS[type]} />
            }
        </Box>
    );
}
