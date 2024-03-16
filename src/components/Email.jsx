import { StarBorder } from "@mui/icons-material";
import { Box, Checkbox, Typography, styled } from "@mui/material";
import React, { useEffect, useState } from "react";

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

export default function Email({ email, selectedEmails }) {
    const [userEmail, setUserEmail] = useState([]);

    useEffect(() => {
        function fetchData() {
            fetch('http://localhost:5000/emails/sent')
                .then(response => response.json())    // one extra step
                .then(data => {
                    console.log(data)
                    setUserEmail(data);
                })
                .catch(error => console.error(error));
        }
        fetchData();
    }, []);

    return (
        <Wrapper>
            <Checkbox
                size="small"
            />
            <StarBorder fontSize="small" style={{ marginRight: 10 }} />
            <Box>
                <Typography style={{ width: 200, overflow: 'hidden' }}>
                    name
                </Typography>
                <Indicator>
                    Inbox
                </Indicator>
                <Typography>
                    subject
                </Typography>
                <Date>
                </Date>
            </Box>
        </Wrapper>
    );
}