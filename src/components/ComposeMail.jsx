import { Close, DeleteOutlineOutlined } from "@mui/icons-material";
import { Box, Button, Dialog, InputBase, TextField, Typography, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import useApi from "../hooks/useApi";
import { API_URLS } from "../services/api.urls";


const dialogStyle = {
    height: '90%',
    width: '80%',
    maxWidth: '100%',
    maxHeight: '100%',
    borderRadius: '10px 10px 0 0',
    boxshadow: 'none'
}

const Header = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 15px',
    backgroundColor: '#f2f6fc',
    '& >p': {
        fontSize: 14,
        fontWeight: 500
    }
})

const ReaceipientWrapper = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    padding: '0px 15px',
    '& >div': {
        fontSize: 14,
        borderBottom: '1px solid #f5f5f5',
        marginTop: '10px'
    }
})

const Footer = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 15px',
})

const SendButton = styled(Button)({
    backgroundColor: '#0B57D0',
    color: '#f5f5f5',
    fontWeight: '500',
    textTransform: 'none',
    borderRadius: '18px',
    width: '100px'

})

export default function ComposeMail({ openDialog, setOpenDialog }) {
    const [data, setData] = useState({});
    const sentEmailservice = useApi(API_URLS.saveSentEmail);
    const saveDraftService = useApi(API_URLS.saveDraftEmails);

    const baseUrl = "http://localhost:5000";

    const closeComposeMail = async () => {

        const payload = {
            to: data.to,
            from: 'vinitharambe1016@gmail.com',
            subject: data.subject,
            body: data.body,
            date: new Date(),
            image: '',
            name: 'Vinitha ram',
            starred: false,
            type: 'drafts'
        }

        const res = await fetch(`${baseUrl}/email/save-draft`, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        }).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        })

        saveDraftService.call(payload);

        if (!saveDraftService.error) {
            setOpenDialog(false);
            setData({})
        } else {

        }
    }



    const sendingMail = async () => {
        const payload = {
            to: data.to,
            from: 'vinitharambe1016@gmail.com',
            subject: data.subject,
            body: data.body,
            date: new Date(),
            image: '',
            name: 'Vinitha ram',
            starred: false,
            type: 'sent'
        }


        const res = await fetch(`${baseUrl}/email/save`, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        }).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        })

        sentEmailservice.call(payload);

        if (!sentEmailservice.error) {
            setOpenDialog(false);

            setData({});
        } else {
           
        }

        setOpenDialog(false);

    }

    function onValueChange(e) {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
        console.log(data);
    }

    return (
        <Dialog
            open={openDialog}
            PaperProps={{ sx: dialogStyle }}
        >
            <Header>
                <Typography>New Message</Typography>
                <Close fontSize="small" onClick={(e) => closeComposeMail(e)} />

            </Header>
            <ReaceipientWrapper>
                <InputBase placeholder="Receipients" name="to" onChange={(e) => onValueChange(e)} />
                <InputBase placeholder="Subject" name="subject" onChange={(e) => onValueChange(e)} />

            </ReaceipientWrapper>
            <TextField
                multiline
                rows={18}
                sx={{ '& .MuiOutlinedInput-notchedOutline': { border: 'none' } }}
                onChange={(e) => onValueChange(e)}
                name="body"
            />
            <Footer>
                <SendButton onClick={(e) => sendingMail()}>Send</SendButton>
                <DeleteOutlineOutlined onClick={() => setOpenDialog(false)} />

            </Footer>
        </Dialog>

    );
}